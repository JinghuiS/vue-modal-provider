<script setup lang="ts">
import { type FormInstance, type FormRules } from 'element-plus'
import { useModal, useModalRef } from 'vue-modal-provider'
import ElementChildModal from './ElementChildModal.vue'

const { visible, hide, resolve, remove } = useModalRef()

const modal = useModal(ElementChildModal)

const elFormRef = ref<FormInstance>()
const form = reactive({
  name: '',
  region: '',
})
const formLabelWidth = '140px'

const rules = reactive<FormRules>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  region: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
})

const cancelForm = () => {
  hide()

  setTimeout(() => {
    remove()
  }, 200)
}

const closeForm = () => {
  elFormRef.value?.validate().then((pass) => {
    hide()
    resolve(form)
    setTimeout(() => {
      remove()
    }, 200)
  })
}

const openChildModal = () => {
  modal.show().then(res=>{})
}

</script>

<template>
  <ElDialog v-model="visible" width="30%" align-center center title="Shipping address">
    <el-form ref="elFormRef" :rules="rules" :model="form">
      <el-form-item label="Promotion name" prop="name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Zones" prop="region" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>

    <el-button @click="openChildModal">open child modal</el-button>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelForm">Cancel</el-button>
        <el-button type="primary" @click="closeForm">
          Confirm
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
