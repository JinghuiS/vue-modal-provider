<template>
  <Modal v-model="visible">
    <div @click="close()">close father</div>

    <div @click="childModal.show()">open child</div>
    {{ visible ? "show" : "false" }}
  </Modal>
</template>
<script lang="ts" setup>
import Modal from "./Modal.vue";
import { useModal, useModalRef } from "../../src";
import { inject } from "vue";
import ChildTest from "./ChildTest.vue";
const props = defineProps<{ msg: number }>();

const childModal = useModal(ChildTest);
const { args, visible, hide, remove, reject, resolve } = useModalRef();

const close = () => {
  hide();
  resolve();
  remove();
};
</script>
