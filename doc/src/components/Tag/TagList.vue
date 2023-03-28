<script lang="ts" setup>
import { type CSSProperties, computed, ref } from 'vue'
import { useTemplateRefsList, watchArray } from '@vueuse/core'
import { TagToken } from './tag'

interface TabItem {
  value: string
  label: string
}

const props = defineProps<{
  tabItem: TabItem[]
}>()

const refs = useTemplateRefsList<HTMLDivElement>()

const selectValue = ref('')

selectValue.value = props.tabItem[0].value

provide(TagToken, selectValue)

const activeTab = ref({
  translateX: 5,
  width: 100,
})

const activeTabOffsetStyle = computed<CSSProperties>(() => ({
  transform: `translateX(${activeTab.value.translateX}px)`,
  width: `${activeTab.value.width}px`,
}))

function getActiveTab(index: number) {
  activeTab.value.translateX = refs.value[index].offsetLeft
  activeTab.value.width = refs.value[index].clientWidth
}

function onChangTab(tab: TabItem, index: number) {
  getActiveTab(index)
  selectValue.value = tab.value
}

watchArray(refs.value, () => {
  if (refs.value.length === 1)
    getActiveTab(0)
})

onMounted(() => {
  getActiveTab(0)
})
</script>

<template>
  <div>
    <div
      class="inline-flex relative items-center justify-center rounded-md bg-slate-100 p-5px dark:bg-slate-800"
      role="tablist"
    >
      <div
        v-for="(item, index) in tabItem"
        :ref="refs.set"
        :key="item.value"
        class="inline-flex cursor-pointer min-w-[100px] z-10 items-center justify-center rounded-[0.185rem] px-15px py-5px text-sm font-medium text-slate-700 transition-all disabled:pointer-events-none disabled:opacity-50 dark:text-slate-200"
        @click="onChangTab(item, index)"
      >
        {{ item.label }}
      </div>

      <div
        class="absolute transition-transform bg-white rounded-[0.185rem] text-slate-900 left-0 h-28px shadow-sm dark:bg-slate-900 dark:text-slate-100"
        :style="activeTabOffsetStyle"
      />
    </div>
    <slot />
  </div>
</template>
