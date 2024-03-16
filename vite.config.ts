import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'

const { normalizeConfigs, siteEnvConfigs } = require('./configs/index.js')
console.log('vite-config.ts-siteEnvConfigs--', siteEnvConfigs)
console.log('vite-config.ts-normalizeConfigs(siteEnvConfigs)--', normalizeConfigs(siteEnvConfigs))

console.log('vite.config-ts-__dirname--', __dirname)
console.log('vite.config-ts-__filename--', __filename)
// console.log('vite-config.ts-process.env--', process.env)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: 'mock'
      // enable: true
    }),
    AutoImport({
      // 声明文件生成位置和文件名称
      dts: 'src/types/auto-imports.d.ts',
      // 这里除了引入 vue 以外还可以引入pinia、vue-router、vueuse等，
      // 甚至你还可以使用自定义的配置规则，见 https://github.com/antfu/unplugin-auto-import#configuration
      imports: ['vue']
      // 第三方组件库的解析器
      // resolvers: []
    }),
    Components({
      dts: 'src/types/components.d.ts',
      // dirs 指定组件所在位置，默认为 src/components
      // 可以让我们使用自己定义组件的时候免去 import 的麻烦
      dirs: ['src/components/'],
      // 配置需要将哪些后缀类型的文件进行自动按需引入
      extensions: ['vue', 'md'],
      // 解析的 UI 组件库
      resolvers: [VantResolver()]
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
      /**
       * 自定义插入位置
       * @default: body-last
       */
      // inject?: 'body-last' | 'body-first'
      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      customDomId: '__svg__icons__dom__'
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  define: {
    // 'process.env': normalizeConfigs(siteEnvConfigs),
    'process.env': siteEnvConfigs,
    'self.env': { self_name: 'self_name_text' },
    'process.env.more': JSON.stringify('more and more'), // 浏览器环境中使用：process.env.API_URL
    'import.meta.env': siteEnvConfigs, // 这样写无法将自定义的环境变量注入到 import.meta.env 中
    'import.meta.env.hah': JSON.stringify('hahstr'), // 这样写可以将自定义的环境变量注入到 import.meta.env 中
    __APP_VERSION__: JSON.stringify('v1.0.0') // 浏览器环境中使用：直接写 __APP_VERSION__ 即可
  }
  // css: {
  //   postcss: {
  //     plugins: [
  //       require('postcss-scss')
  //     ]
  //   }
  // },
  // 代理跨域
  // server: {
  //   proxy: {
  //     [env.VITE_APP_BASE_API]: {
  //       target: env.VITE_SERVE,
  //       // 需要代理跨域
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
})
