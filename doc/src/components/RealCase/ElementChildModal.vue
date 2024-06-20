<script setup lang="ts">

import { useModalRef } from 'vue-modal-provider'

const { visible, hide, resolve, remove } = useModalRef()




const closeForm = () => {
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

        <el-button type="primary" @click="closeForm">
          close
        </el-button>
      </span>
    </template>
  </ElDialog>
</template>

<style scoped>
.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
