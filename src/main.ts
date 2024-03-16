import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
// 引入 vite-plugin-svg-icons 注册脚本
import 'virtual:svg-icons-register'
import { setupRouter } from './router'
import { setupStore } from './store'
import { setupI18n, lang, _lang } from './i18n'

import './styles/index.scss'
const { SITE_TEMPLATE, SITE_THEME } = process.env
console.log('main.js-SITE_TEMPLATE--', SITE_TEMPLATE)
console.log('main.js-SITE_THEME--', SITE_THEME)

// const f = async (): Promise<void> =>
//   await import(`./styles/${SITE_TEMPLATE}/${SITE_THEME}/index.scss`)
// await f()

import(`./styles/${SITE_TEMPLATE}/${SITE_THEME}/index.scss`)
  .then((res) => {
    console.log('res--', res)
  })
  .catch((error) => {
    console.log(error)
  })

// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties {
//     $t_c: (key: string) => string;
//     $t_t: (key: string) => string;
//     $_dialog: {
//       show: (data: DialogData.params) => void,
//     };
//     $_tip: {
//       show: (data: DialogData.TipParams) => void;
//     }
//     $filters: FilterType
//   }
// }

console.log('main.ts-import.meta.env--', import.meta.env)
console.log('main.ts-import.meta.env.hah--', import.meta.env.hah)

console.log('main.ts-process.env--', process.env)
console.log('main.ts-process.env.more--', process.env.more)

console.log('main.ts-self.env--', self.env)

console.log('main.ts-__APP_VERSION__--', __APP_VERSION__)

/**
 * 定义启动初始化函数
 */
const bootstrap = (): void => {
  const app = createApp(App)

  // 安装初始化store
  setupStore(app)
  // 安装初始化路由
  setupRouter(app)
  // 安装初始化i18n
  setupI18n(app)

  app.config.globalProperties.$t = lang
  app.config.globalProperties.$tt = _lang

  app.config.errorHandler = (err, vm, info) => {
    console.log('全局错误---:', err, vm, info)
  }

  app.mount('#app')
}

// 启动
bootstrap()
