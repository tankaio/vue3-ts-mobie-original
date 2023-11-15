import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
// 引入 vite-plugin-svg-icons 注册脚本
import 'virtual:svg-icons-register'
import { setupRouter } from './router'
import { setupStore } from './store'
import { setupI18n, lang, _lang } from './i18n'

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
