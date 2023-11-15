import { defineStore } from 'pinia'

export const useSysStore = defineStore('sys', () => {
  const count = ref(0)
  function increment(): void {
    count.value++
  }

  return { count, increment }
})
