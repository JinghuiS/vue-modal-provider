<script setup lang="ts">
import UsageMd from './Usage.md'
const { t } = useI18n()
</script>

<template>
  <h1 class=" text-3xl mt-10 mb-6">
    {{ t('Usage.title') }}
  </h1>
  <p>
    {{ t('Usage.about') }}
  </p>
  <UsageMd />
</template>
