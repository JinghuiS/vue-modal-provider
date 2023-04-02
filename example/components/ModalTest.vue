<template>
  <div @click="hide">{{ msg }}

    {{ visible ? 'show' : 'false' }}
  </div>
</template>
<script lang="ts" setup>

import { useModalRef } from "../../src";
const props = defineProps<{ msg: number }>();

const { args, visible, hide } = useModalRef();


console.log(args.value);
</script>
