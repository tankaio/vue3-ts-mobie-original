import type { RouteRecordRaw } from 'vue-router'

// 获取modules中的路由规则
// https://cn.vitejs.dev/guide/features.html#glob-import
const modules = import.meta.glob('../modules/**/*.ts', { eager: true, import: 'default' })
console.log('modules--', modules)

// modules routes
const routes: RouteRecordRaw[] = []
Object.keys(modules).forEach((key) => {
  const modulesRoutes = modules[key] || {}

  const modRoutesList = Array.isArray(modulesRoutes) ? [...modulesRoutes] : [modulesRoutes]

  routes.push(...modRoutesList)
})
console.log('routes--', routes)

// 根目录
const rootRoute: RouteRecordRaw = {
  path: '/',
  name: 'root',
  redirect: '/home'
}

// 404页面
const notFoundPage: RouteRecordRaw = {
  // vue-router@4的变化，舍弃*通配符
  path: '/:pathMatch(.*)*',
  name: '404',
  component: async () => await import('@/views/not-found/index.vue')
}

export default [rootRoute, ...routes, notFoundPage]
