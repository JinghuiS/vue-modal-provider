<template>
  <Modal v-model="visible">
    {{ msg }}

    {{ visible ? "show" : "false" }}
  </Modal>
</template>
<script lang="ts" setup>
import Modal from "./Modal.vue";
import { useModalRef } from "../../src";
import { inject } from "vue";
const props = defineProps<{ msg: number }>();
const { args, visible, hide } = useModalRef();
let one = inject("test");
</script>
