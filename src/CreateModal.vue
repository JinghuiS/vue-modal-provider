<template>
  <slot></slot>
</template>
<script lang="ts" setup>
import { getCurrentInstance, onUnmounted, provide } from "vue";
import { modalContext, ModalIdToken } from "./Modal";
const instance = getCurrentInstance();
const { action } = modalContext();

const props = defineProps<{ modalId: string; provides: any }>();
provide(ModalIdToken, props.modalId);
if (props.provides) {
  //@ts-ignore
  Object.assign(instance?.provides, props.provides);
}

onUnmounted(() => {
  if (props.modalId) {
    action?.remove(props.modalId);
  }
});
</script>
