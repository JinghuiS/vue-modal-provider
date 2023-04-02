<script setup lang="ts">
import { useModalRef } from 'vue-modal-provider'
defineProps<{ modalValue: string }>()
const { visible, hide, args } = useModalRef()

const { t } = useI18n()
</script>

<template>
  <Modal v-model="visible">
    <template #header>
      <h3 style="margin: 0">
        Header
      </h3>
    </template>
    <template #body>
      <p> modal value: {{ args.modalValue }}</p>
    </template>
    <template #actions>
      <button btn m-3 text-sm @click="hide">
        {{ t('base_use.close_modal') }}
      </button>
    </template>
  </Modal>
</template>
