<template>
  <slot></slot>
  <template v-for="item in modalList" :key="item.id">
    <CreateModal :modal-id="item.id">
      <component :is="item.comp" v-bind="item.args" />
    </CreateModal>
  </template>
</template>
<script lang="ts" setup>
import CreateModal from "./CreateModal.vue";
import { useModalProvider } from "./useModal";
const { modalList } = useModalProvider();
</script>
