import type { RouteRecordRaw } from 'vue-router'

// 路由规则
const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'Home',
    component: async () => await import('@/views/home/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: async () => await import('@/views/login/index.vue')
  },
  {
    path: '/ex',
    name: 'Example',
    component: async () => await import('@/views/example/index.vue')
  }
]

export default routes
