<script setup lang="ts">
import { ModalProvider } from "vue-modal-provider";

const { t } = useI18n();
</script>

<template>
  <ModalProvider>
    <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
      <RouterView />
      <TheFooter />

      <div class="mt-20 mx-auto opacity-75 dark:opacity-50 text-sm">
        <h1 class="text-3xl">{{ t("first_step") }}</h1>
        <p>{{ t("first_about") }}</p>
        <Usage />
        <div class="border-b border-b-slate-300 w-60% my-10 mx-auto" />

        <BaseUse />
        <div class="border-b border-b-slate-300 w-60% my-10 mx-auto" />
        <RealCase />
      </div>
    </main>
  </ModalProvider>
</template>
