<script lang="ts" setup>
import { useModal } from 'vue-modal-provider'
import BaseModal from './BaseModal.vue'
import UseModalView from './UseModalView.md'
import PromiseModal from './PromiseModal.vue'
import BaseModalMd from './BaseModal.md'
import PromiseViewMd from './PromiseModalView.md'
import PromiseModalMd from './PromiseModal.md'
const { t } = useI18n()

const modal = useModal(BaseModal)
const promiseModal = useModal(PromiseModal)
const modalValue = ref('')
const promiseValue = ref('')

const openModal = () => {
  modal.show({ modalValue: modalValue.value })
}
const openPromiseModal = () => {
  promiseModal.show({ promiseValue }).then((res: any) => {
    promiseValue.value = res.value
    alert(res.value)
  })
}
</script>

<template>
  <h1 class="text-3xl mt-10 mb-6">
    {{ t("base_use.title") }}
  </h1>

  <p>
    {{ t("base_use.how_can_use") }}
    <code class="text-sm">{{ t("base_use.hook_name") }}</code>
    {{ t("base_use.manage_the_state") }}
  </p>

  <p>
    {{ t("base_use.how_can_use_useModal") }}
    <code class="text-sm">{{ t("base_use.use_modal") }}</code>
    {{ t("base_use.on_page") }}
  </p>

  <p class="help sm:w-600px">
    {{ t("base_use.help") }}
  </p>

  <input v-model="modalValue" w="300px" ipt :placeholder="t('base_use.modal_value')">

  <button btn m-10 text-sm @click="openModal">
    {{ t("base_use.open_modal") }}
  </button>

  <TagList
    :tab-item="[
      {
        value: 'UseModalView',
        label: 'UseModalView.vue',
      },
      { value: 'Modal', label: 'BaseModal.vue' },
    ]"
  >
    <TagOption value="UseModalView">
      <UseModalView />
    </TagOption>
    <TagOption value="Modal">
      <BaseModalMd />
    </TagOption>
  </TagList>
  <h2 class="text-2xl mt-10 mb-6">
    {{ t("base_use.modal_result") }}
  </h2>
  <p>{{ t("base_use.promise_modal_about") }}</p>

  <input v-model="promiseValue" w="300px" ipt :placeholder="t('base_use.modal_value')">

  <button btn m-10 text-sm @click="openPromiseModal">
    {{ t("base_use.open_modal") }}
  </button>

  <TagList
    :tab-item="[
      {
        value: 'UseModalView',
        label: 'ModalView.vue',
      },
      { value: 'Modal', label: 'PromiseModal.vue' },
    ]"
  >
    <TagOption value="UseModalView">
      <PromiseViewMd />
    </TagOption>
    <TagOption value="Modal">
      <PromiseModalMd />
    </TagOption>
  </TagList>
</template>
