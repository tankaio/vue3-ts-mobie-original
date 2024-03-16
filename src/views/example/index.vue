<template>
  <div class="app-c">
    <div>{{ str }}</div>
    <div>{{ $t('主要按钮') }}</div>
    <van-button type="primary">{{ $t('主要按钮') }}</van-button>
    <SvgIcon icon="icon1" class="w-30 h-30" />
    <SvgIcon icon="dir-icon1" style="width: 20px; height: 20px" />
    <SvgIcon onlineIcon="mdi-light:home" color="skyblue" class="w-30" />
  </div>
</template>

<script setup lang="ts">
import { useSysStore } from '@/store/modules/sys.ts'
// import XUpload from '@/components/x-upload/index.vue'

// !. TypeScript的语法，叫非空断言操作符（non-null assertion operator），和 ?. 相反，这个符号表示对象后面的属性一定不是null或undefined。
const instance = getCurrentInstance()
console.log('instance--', instance)
const globalProps = instance?.appContext.config.globalProperties
console.log('globalProps--', globalProps)

const sysStore = useSysStore()

const str = ref<string>('我是 ref')
onMounted(() => {
  console.log('233')
  console.log('sysStore.count--', sysStore.count)
})
</script>
<style scoped lang="scss">
// @import '@/styles/index';

:deep(.w-30) {
  width: 30px;
}

.h-30 {
  height: 30px;
}

.app-c {
  background-color: antiquewhite;

  .title {
    font-size: 20px;
    font-family: Times, serif;

    // color: $main-colr;
  }

  .text {
    word-break: break-all;
  }
}
</style>
