<template>
  <slot></slot>
</template>
<script lang="ts" setup>
import { onUnmounted, provide } from "vue";
import { modalContext, ModalIdToken } from "./Modal";

const { action } = modalContext();


const props = defineProps({
  modalId: {
    type: String,
  },
});

provide(ModalIdToken, props.modalId);
onUnmounted(() => {
  if (props.modalId) {
    action?.remove(props.modalId);
  }
});
</script>
