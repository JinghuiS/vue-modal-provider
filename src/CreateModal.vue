<template>
  <slot></slot>
</template>
<script lang="ts" setup>
import { getCurrentInstance, onUnmounted, provide } from "vue";
import { modalContext, ModalIdToken } from "./Modal";
import { provideLocal } from "@vueuse/core";
// const instance = getCurrentInstance();
const { action } = modalContext();

const props = defineProps<{ modalId: string }>();
provideLocal(ModalIdToken, props.modalId);
// if (props.provides) {
//   Object.assign(instance?.provides, props.provides);
// }

onUnmounted(() => {
  if (props.modalId) {
    action?.remove(props.modalId);
  }
});
</script>
