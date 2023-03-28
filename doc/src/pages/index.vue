<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})

const { t } = useI18n()
</script>

<template>
  <div>
    <div text-4xl>
      <div i-carbon-layers inline-block />
    </div>
    <p>
      <a class="text-4xl" rel="noreferrer" href="https://github.com/JinghuiS/vue-modal-provider" target="_blank">
        vue-modal-provider
      </a>
    </p>
    <p>
      <em text-sm opacity-75>{{ t('intro.desc') }}</em>
    </p>

    <div class="pt-6">
      <code class="shiki-light rounded-[0.185rem] p-4  ">
        npm i vue-modal-provider
      </code>
      <code class="shiki-dark rounded-[0.185rem] p-4  ">
        npm i vue-modal-provider
      </code>
    </div>

    <div py-4 />
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
