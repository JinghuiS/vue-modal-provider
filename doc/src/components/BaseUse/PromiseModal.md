```vue
<script setup lang="ts">
import { useModalRef } from "vue-modal-provider";

const { visible, hide, args, resolve } = useModalRef();

const value = ref(args.value.modalValue);
const close = () => {
  hide();
  resolve({ value: value.value });
};
</script>

<template>
  <Modal v-model="visible">
    <template #header>
      <h3 style="margin: 0">Header</h3>
    </template>
    <template #body>
      <input v-model="value" />
    </template>
    <template #actions>
      <button @click="close">close</button>
    </template>
  </Modal>
</template>
```
