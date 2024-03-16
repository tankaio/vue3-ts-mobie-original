import type { RouteRecordRaw } from 'vue-router'

/* eslint-disable @typescript-eslint/promise-function-async */
// 路由规则
const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/ex',
    name: 'Example',
    component: () => import('@/views/example/index.vue')
  },
  {
    path: '/upload',
    name: 'UploadDemo',
    component: () => import('@/views/example/UploadDemo.vue')
  }
]

export default routes
