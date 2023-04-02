```vue
<script setup lang="ts">
import Modal from 'The modal component you use'
import { useModalRef } from 'vue-modal-provider'

// You can pass data through props
defineProps<{ modalValue: string }>()

const {
  // show variables
  visible,
  // close modal
  hide,
  // If you don’t like using props，You can use this
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
