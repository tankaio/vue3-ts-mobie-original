import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import type { App } from 'vue'
import routes from './routes/index'

// 获取路由模式(history和hash)和项目baseUrl
const { VITE_HASH_ROUTE = 'false', VITE_ROUTE_BASE_URL } = import.meta.env
// console.log('VITE_HASH_ROUTE--', VITE_HASH_ROUTE)
// console.log('VITE_ROUTE_BASE_URL--', VITE_ROUTE_BASE_URL)

const router = createRouter({
  // vueRouter@3版本的mode改成了history，hash模式配置createWebHashHistory，history模式配置createWebHistory
  history:
    VITE_HASH_ROUTE === 'true'
      ? createWebHashHistory(VITE_ROUTE_BASE_URL)
      : createWebHistory(VITE_ROUTE_BASE_URL),
  routes
})

/**
 * 路由初始化函数
 * @param app
 */
export const setupRouter = (app: App<Element>): void => {
  app.use(router)
}

export default router
