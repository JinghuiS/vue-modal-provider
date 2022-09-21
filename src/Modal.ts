import {
  inject,
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
      args?: Record<string, unknown>;
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

export type VueComponent = Component<
  any,
  any,
  any,
  ComputedOptions,
  MethodOptions
>;

export type ModalArgs = Record<string, unknown>;

export const ModalStateToken = Symbol("ModalStateToken");

export const ModalIdToken = Symbol("ModalIdToken");

export const modalContext = () =>
  inject<Partial<ModalState>>(ModalStateToken, {});

export const modalIdContext = () => inject<string>(ModalIdToken, "");
