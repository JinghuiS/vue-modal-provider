import {
  Component,
  computed,
  DefineComponent,
  defineComponent,
  getCurrentInstance,
  h,
  reactive,
  ref,
  toRaw,
  toRef,
} from "vue";
import {
  modalContext,
  modalIdContext,
  ModalStateToken,
  type ModalState,
  type ModalArgs,
  type ComponentProps,
} from "./Modal";
import CreateModal from "./CreateModal.vue";
import { provideLocal } from "@vueuse/core";

export function useModalProvider() {
  let uuid = 0;
  const getUid = () => `__modal_${uuid++}`;
  const symModalId = Symbol("ModalId");
  const MODAL_REGISTRY_DEFAULT: ModalState["store"] = {};
  const store = reactive(MODAL_REGISTRY_DEFAULT);
  const modalPromise: ModalState["modalPromise"] = {};
  const action = {
    show: (modalId: string, args?: ModalArgs) => {
      if (args) {
        store[modalId].args = { ...store[modalId].args, ...args };
      }
      store[modalId].visible = true;
    },
    hide: (modalId: string) => {
      store[modalId].visible = false;
    },
    remove: (modalId: string) => {
      delete store[modalId];
      delete modalPromise[modalId];
    },
    getModalId: (modal: any) => {
      if (!modal[symModalId]) {
        modal[symModalId] = getUid();
      }
      return modal[symModalId];
    },
    register: (id: string, comp: any, args: ModalArgs) => {
      if (!store[id]) {
        store[id] = { comp, visible: false, args };
      } else {
        store[id].args = args;
      }
    },
  };

  provideLocal(ModalStateToken, { store, action, modalPromise });

  const modalList = computed(() => {
    const visibleModalIds = Object.keys(store).filter((id) => !!store[id]);
    return visibleModalIds
      .filter((id) => store[id])
      .map((id) => {
        return {
          id,
          ...store[id],
          comp: toRaw(store[id].comp),
        };
      });
  });
  return { modalList };
}

export function createdModalContext() {
  const { modalList } = useModalProvider();

  const ModalContent = defineComponent({
    name: "ModalContent",
    render() {
      return modalList.value.map((item) =>
        h(CreateModal, { modalId: item.id }, () => h(item.comp, item.args))
      );
    },
  });

  return { ModalContent };
}

export function useModal<T extends Component>(
  modal: T,
  args?: ComponentProps<T>
) {
  type ModalPropsType = ComponentProps<T>;
  // const instance = getCurrentInstance();

  // //@ts-ignore
  // const instanceInjector = instance!.provides[ModalStateToken];
  let modalInstance = modalContext();
  // if (instanceInjector) {
  //   modalInstance = instanceInjector;
  // }

  const modalId = modalInstance.action?.getModalId(modal);

  // first
  const firstShow = ref(true);

  const modalInfo = modalInstance.store?.[modalId];

  const show = (showArgs?: ModalPropsType) => {
    if (firstShow.value || !modalInfo) {
      modalInstance.action?.register(modalId, modal, args);
      firstShow.value = false;
    }
    if (!modalInstance.modalPromise![modalId]) {
      let modalResolve!: (args?: unknown) => void;
      let modalReject!: (args?: unknown) => void;
      const promise = new Promise((resolve, reject) => {
        modalResolve = resolve;
        modalReject = reject;
      });
      modalInstance.modalPromise![modalId] = {
        promise,
        reject: modalReject,
        resolve: modalResolve,
      };
    }

    modalInstance.action?.show(modalId, showArgs);
    return modalInstance.modalPromise![modalId].promise;
  };
  const hide = () => modalInstance.action?.hide(modalId);

  return { show, hide };
}

export function useModalRef() {
  const { store, action, modalPromise } = modalContext();
  const modalId = modalIdContext();
  const modalInfo = store![modalId];

  const show = (args?: unknown) => action?.show(modalId, args);
  const hide = () => action?.hide(modalId);
  const remove = () => action?.remove(modalId);
  const resolve = (args?: unknown) => modalPromise![modalId].resolve(args);
  const reject = (args?: unknown) => modalPromise![modalId].reject(args);
  return {
    show,
    hide,
    visible: toRef(modalInfo, "visible"),
    args: toRef(modalInfo, "args"),
    remove,
    resolve,
    reject,
  };
}
