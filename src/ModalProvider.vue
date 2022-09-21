<template>
  <slot></slot>
  <template v-for="item in modalList" :key="item.id">
    <component :is="item.comp" />
  </template>
</template>
<script lang="ts" setup>
import { useModalProvide } from "./useModal";
const { modalList } = useModalProvide();
</script>
