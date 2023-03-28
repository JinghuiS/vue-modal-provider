```vue
<script setup lang="ts">
import Modal from 'The modal component you use'
import { useModalRef } from 'vue-modal-provider'

const {
  // show variables
  visible,
  // close modal
  hide,
  // args
  args
} = useModalRef()
</script>

<template>
  <Modal v-model="visible">
    <p> modal value: {{ args.modalValue }}</p>
    <button
      @click="hide"
    >
      close modal
    </button>
  </Modal>
</template>
```
