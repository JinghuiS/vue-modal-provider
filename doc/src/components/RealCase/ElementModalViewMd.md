
```vue
<script lang="ts" setup>
import { useModal } from 'vue-modal-provider'
import ElementModal from './ElementModal.vue'

const elModal = useModal(ElementModal)
const openModal = () => {
  elModal.show().then((res) => {
    alert(JSON.stringify(res))
  })
}
</script>

<template>
  <el-button @click="openModal">
    open modal
  </el-button>
</template>
```
