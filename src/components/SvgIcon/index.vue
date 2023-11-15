<template>
  <template v-if="icon">
    <svg>
      <use :xlink:href="symbolId" :fill="color" v-bind="bindAttrs" />
    </svg>
  </template>
  <template v-else>
    <Icon v-if="onlineIcon" :icon="onlineIcon" :color="color" v-bind="bindAttrs" />
  </template>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Props {
  prefix?: string
  icon?: string // 本地svg图片的名字
  onlineIcon?: string // 线上svg图片的名字
  color?: string // svg图片颜色
}

// // 获取组件传递的属性
const attrs = useAttrs()

const bindAttrs = computed<{ class: string; style: string }>(() => ({
  class: (attrs.class as string) ?? 'w-20 h-20',
  style: attrs.style as string
}))

const { prefix, icon, onlineIcon } = withDefaults(defineProps<Props>(), {
  prefix: 'icon'
})

const symbolId = computed(() => `#${prefix}-${icon}`)
</script>
<style scoped lang="scss"></style>
