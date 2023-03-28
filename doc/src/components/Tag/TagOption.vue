<script lang="ts" setup>
import { TagToken } from './tag'

defineProps<{
  value: string
}>()

const selectValue = inject(TagToken)
</script>

<template>
  <div v-if="value === selectValue ">
    <slot />
  </div>
</template>
