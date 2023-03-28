<script lang="ts" setup>
const { modelValue } = defineModel<{ modelValue: boolean }>()
const modalRef = ref<HTMLElement | null>()
const modalBody = ref<HTMLElement | null>()

function close() {
  emit('update:modelValue', false)
}
function maskClick() {
  if (props.closableMask)
    close()
}
function pressEsc(e: KeyboardEvent) {
  e.code === 'Escape' && close()
}
</script>

<template>
  <Teleport to="body">
    <div
      v-show="modelValue" v-bind="$attrs" ref="modalRef"
      class="fixed inset-0 z-50 bg-gray-900/70 dark:bg-zinc-900/70 backdrop-blur-sm transform-gpu"
    >
      <Transition
        enter-active-class="duration-75"
        enter-to-class="opacity-100"
        enter-from-class="opacity-0"
        leave-active-class="duration-75"
        leave-to-class="opacity-0"
        leave-from-class="opacity-100"
      >
        <div
          v-show="modelValue"
          class="flex h-full w-full items-center justify-center"
        >
          <div
            ref="modalBody"
            tabindex="0"
            class="relative rounded overflow-hidden w-full cursor-default outline-none !w-500px
            bg-white dark:shadow-xl dark:shadow-zinc-900/80 dark:text-slate-200 dark:bg-zinc-800 dark:before:content-[''] dark:before:absolute dark:before:rounded dark:before:inset-0 dark:before:shadow-[inset_0px_0px_0px_1px_rgb(214_214_255/10%),inset_0px_1px_0px_rgb(214_214_255/10%)]
            "
          >
            <slot />
            <div v-if="$slots.header" class="py-4 px-6 text-md font-medium">
              <slot name="header" />
            </div>
            <div v-if="$slots.body" class="first:pt-4 pb-4 px-6 text-sm overflow-auto">
              <slot name="body" />
            </div>
            <div v-if="$slots.actions" class="flex flex-row justify-end py-4 px-6 space-x-3">
              <slot name="actions" />
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>
