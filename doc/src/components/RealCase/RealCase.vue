<script lang="ts" setup>
import { useModal } from 'vue-modal-provider'
import ElementModal from './ElementModal.vue'
import ElementModalMd from './ElementModalMd.md'
import ElementModalViewMd from './ElementModalViewMd.md'
const { t } = useI18n()
const elModal = useModal(ElementModal)
const openModal = () => {
  elModal.show().then((res) => {
    alert(JSON.stringify(res))
  })
}
</script>

<template>
  <h1 class="text-3xl">
    {{ t("real_case.title") }}
  </h1>
  <p>
    {{ t("real_case.use_element") }}
  </p>
  <el-button class="mb-2" @click="openModal">
    {{ t("base_use.open_modal") }}
  </el-button>

  <TagList
    :tab-item="[
      {
        value: 'UseModalView',
        label: 'ModalView.vue',
      },
      { value: 'Modal', label: 'ElementModal.vue' },
    ]"
  >
    <TagOption value="UseModalView">
      <ElementModalViewMd />
    </TagOption>
    <TagOption value="Modal">
      <ElementModalMd />
    </TagOption>
  </TagList>
</template>
