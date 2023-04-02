
```vue
<script lang="ts" setup>
import { useModal } from 'vue-modal-provider'
import BaseModal from './BaseModal.vue'
const modal = useModal(BaseModal)
const modalValue = ref('')
const openModal = () => {
  // The passed props will be type-checked according to the modal’s props
  modal.show({ modalValue: modalValue.value })
}
</script>

<template>
  <input v-model="modalValue">
  <button
    @click="openModal"
  >
    open modal
  </button>
</template>
```
