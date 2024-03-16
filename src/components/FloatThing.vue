<template>
  <div
    ref="floatRef"
    class="float-thing"
    :style="{
      width: itemWidth + 'px',
      height: itemHeight + 'px',
      left: left + 'px',
      top: top + 'px'
    }"
    @touchstart="
      () => {
        dragStart()
      }
    "
    @touchend="
      () => {
        dragEnd()
      }
    "
    @touchmove="
      (e) => {
        dragProgress(e)
      }
    "
  >
    <div class="float-close" @click.stop="$emit('close')">X</div>
    <slot>
      <div @click.stop="goPlace">
        <!-- <img src="./images/service.png" /> -->
        GO
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { getheight } from '@/utils/tools'

const safeHeader: number = getheight('sat') || 0
const clientWidth: number = document.documentElement.clientWidth
const clientHeight: number = document.documentElement.clientHeight

const itemWidth = ref<number>(55) // 图标的宽度
const itemHeight = ref<number>(55) // 图标的高度
const left = ref<number>(0)
const top = ref<number>(0)
const gapWidth = ref<number>(5)

const floatRef = ref()

onMounted(() => {
  left.value = clientWidth - itemWidth.value - gapWidth.value
  top.value = clientHeight * 0.75
})

const goPlace = (): void => {}
const dragStart = (): void => {
  floatRef.value.style.transition = 'none'
}
const dragEnd = (): void => {
  floatRef.value.style.transition = 'all 0.3s'
  if (left.value > clientWidth / 2) {
    left.value = clientWidth - itemWidth.value - gapWidth.value
  } else {
    left.value = gapWidth.value
  }
  if (top.value < 0 + safeHeader) {
    top.value = 0 + gapWidth.value + safeHeader
  } else if (top.value > clientHeight - itemHeight.value) {
    top.value = clientHeight - itemHeight.value
  }
}
const dragProgress = (e: TouchEvent): void => {
  if (e.targetTouches.length === 1) {
    const touch = e.targetTouches[0]
    left.value = touch.clientX - itemWidth.value / 2
    top.value = touch.clientY - itemHeight.value / 2
  }
}
</script>

<style lang="scss">
.float-thing {
  position: fixed;
  z-index: 9999;
  width: 120px;
  color: #666;
  transition: all 0.3s;

  img {
    width: 100%;
    height: 100%;
  }

  .float-close {
    position: absolute;
    top: -12px;
    right: 0;
    width: 16px;
    height: 16px;

    // background: url('./images/close.png') no-repeat center;
    // background-size: 100% 100%;
  }
}
</style>
