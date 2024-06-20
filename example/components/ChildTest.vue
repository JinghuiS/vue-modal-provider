<template>
  <Modal v-model="visible">
    <div @click="close()">close child</div>

    {{ visible ? "show" : "false" }}
  </Modal>
</template>
<script lang="ts" setup>
import Modal from "./Modal.vue";
import { useModalRef } from "../../src";
import { inject } from "vue";
const props = defineProps<{ msg: number }>();
const { args, visible, hide, remove, reject, resolve } = useModalRef();

const close = () => {
  resolve();
  hide();

  remove();
};
</script>
