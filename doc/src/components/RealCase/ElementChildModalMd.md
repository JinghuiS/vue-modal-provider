```vue

<script setup lang="ts">

import { useModalRef } from 'vue-modal-provider'

const { visible, hide, resolve, remove } = useModalRef()




const close = () => {
  hide()
  resolve(true)
  setTimeout(() => {
      remove()
    }, 200)
}
</script>

<template>
  <ElDialog v-model="visible" width="30%" align-center center title="child">
   this is child
    <template #footer>
      <span class="dialog-footer">

        <el-button type="primary" @click="close">
          close
        </el-button>
      </span>
    </template>
  </ElDialog>
</template>




```
