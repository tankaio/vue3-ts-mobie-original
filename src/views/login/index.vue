<template>
  <div>login</div>
  <div>
    <button @click="onLogin">login</button>
  </div>
</template>

<script setup lang="ts">
import { reqUserLogin } from '@/api/user'

const onLogin = async (): Promise<any> => {
  const data = await reqUserLogin({
    username: 'admin',
    password: '123456'
  })
  await reqUserLogin({
    username: 'admin',
    password: '123456'
  })
  await reqUserLogin({
    username: 'admin',
    password: '123456'
  })

  console.log('data--', data)
}
</script>

<style scoped lang="scss"></style>
