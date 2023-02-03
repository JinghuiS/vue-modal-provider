<template>
  <div>1212</div>
</template>
<script lang="ts" setup>
import { useModalRef } from "../../src";

const { args } = useModalRef();
console.log(args.value);
</script>
