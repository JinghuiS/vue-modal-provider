import type { InjectionKey, Ref } from 'vue'

export const TagToken: InjectionKey<Ref<string>> = Symbol('tagToken')
