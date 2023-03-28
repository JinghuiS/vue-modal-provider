<script setup lang="ts">
import { useModalRef } from "vue-modal-provider";

const { visible, hide, args, resolve, remove } = useModalRef();

const { t } = useI18n();
const value = ref(args.value.promiseValue);
const close = () => {
  hide();
  resolve({ value: value.value });
  setTimeout(() => {
    remove();
  }, 100);
};
</script>

<template>
  <Modal v-model="visible">
    <template #header>
      <h3 style="margin: 0">Header</h3>
    </template>
    <template #body>
      <input v-model="value" w="300px" ipt />
    </template>
    <template #actions>
      <button btn m-3 text-sm @click="close">
        {{ t("base_use.promise_modal_close_button") }}
      </button>
    </template>
  </Modal>
</template>
