import {
  computed,
  defineComponent,
  provide,
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
  type VueComponent,
  type ModalArgs,
} from "./Modal";
import CreateModal from "./CreateModal.vue";
const create = (modalId: string, Modal: any) => {
  return defineComponent({
    render() {
      return (
        <CreateModal modalId={modalId}>
          <Modal />
        </CreateModal>
      );
    },
  });
};

export function useModalProvide() {
  let uuid = 0;
  const getUid = () => `__modal_${uuid++}`;
  const symModalId = Symbol("ModalId");
  const MODAL_REGISTRY_DEFAULT: ModalState["store"] = {};
  const store = reactive(MODAL_REGISTRY_DEFAULT);
  const modalPromise: ModalState["modalPromise"] = {};
  const action = {
    show: (modalId: string, args?: ModalArgs) => {
      if (args) {
        store[modalId].args = args;
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
        store[id] = { comp, visible: false };
      } else {
        store[id].args = args;
      }
    },
  };

  provide(ModalStateToken, { store, action, modalPromise });

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

export function useModal(modal: VueComponent, args?: ModalArgs) {
  const { store, action, modalPromise } = modalContext();
  const modalId = action?.getModalId(modal);

  // first
  const firstShow = ref(true);

  const modalInfo = store?.[modalId];

  const show = (showArgs?: ModalArgs) => {
    if (firstShow.value || !modalInfo) {
      const newModal = create(modalId, modal);
      action?.register(modalId, newModal, args);
      firstShow.value = false;
    }
    if (!modalPromise![modalId]) {
      let modalResolve!: (args?: unknown) => void;
      let modalReject!: (args?: unknown) => void;
      const promise = new Promise((resolve, reject) => {
        modalResolve = resolve;
        modalReject = reject;
      });
      modalPromise![modalId] = {
        promise,
        reject: modalReject,
        resolve: modalResolve,
      };
    }

    action?.show(modalId, showArgs);
    return modalPromise![modalId].promise;
  };
  const hide = () => action?.hide(modalId);

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
