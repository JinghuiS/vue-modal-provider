import {
  AllowedComponentProps,
  inject,
  VNodeProps,
  type Component,
  type ComputedOptions,
  type MethodOptions,
  type Ref,
} from "vue";

export interface ModalState {
  action: {
    show: (modalId: string, args?: any) => void;
    hide: (modalId: string) => void;
    remove: (modalId: string) => void;
    getModalId: (modal: any) => any;
    register: (id: string, comp: any, args: any) => void;
  };
  store: {
    [id: string]: {
      comp: Component<any, any, any, ComputedOptions, MethodOptions>;
      args?: ModalArgs;
      visible: boolean;
    };
  };
  modalPromise: {
    [id: string]: {
      promise: Promise<unknown>;
      resolve: (args?: unknown) => void;
      reject: (args?: unknown) => void;
    };
  };
}

export type ModalArgs = any;

export type ComponentConstructor<T> = {
  new (): T;
};
export type ComponentProps<C extends Component> = C extends new (
  ...args: any
) => any
  ? Omit<
      InstanceType<C>["$props"],
      keyof VNodeProps | keyof AllowedComponentProps
    >
  : never;
export const ModalStateToken = Symbol("ModalStateToken");

export const ModalIdToken = Symbol("ModalIdToken");

export const modalContext = () =>
  inject<Partial<ModalState>>(ModalStateToken, {});

export const modalIdContext = () => inject<string>(ModalIdToken, "");
