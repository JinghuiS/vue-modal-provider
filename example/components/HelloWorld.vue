<script setup lang="ts">
import { ref } from "vue";
import { useModal, useModalRef } from "../../src";
import ModalTest from "./ModalTest.vue";

const { show } = useModal(ModalTest, { msg: "111" });
const onChange = () => {
  show({ abc: 1 });
};

const count = ref(0);
</script>

<template>
  <div class="card">
    <button type="button" @click="onChange">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
