# Vite4+Vue3+TS+Eslint+Prettier+Stylelint项目配置

```js
2023年09月06日周五
```

## Vite框架自带功能

- Vite4
- Vue3
- Typescript5

## 编码规范、提交规范相关

- eslint + stylelint + pritter
- husky + lint-staged
- commitzen + cz-conventional-changelog + commitlint

## 框架基础组件

- Sass or Less
- Vue-router4
- Pinia
- Axios
- Element Plus or Ant-design-vue or Vant4

## 实用功能

- VueUse
- icons
- Windi CSS or Uno CSS or Tailwind CSS
- 自动导入内部组件：unplugin-auto-import, unplugin-icons
- 自动导入外部组件：unplugin-vue-components
- SVG 组件化： vite-svg-loader
- 移动端px转vw: postcss-px-to-viewport

### 0.前置环境（ Node18.x，pnpm7.14.x ）

```shell
kaitan@KAIdeMacBook-Pro ~ % node -v
v18.16.0
kaitan@KAIdeMacBook-Pro ~ % npm -v
9.5.1
kaitan@KAIdeMacBook-Pro ~ % pnpm -v
8.7.1
```

### 1. 安装基本的项目

pnpm 安装 基于Vite的vue-ts模版项目命令如下：

```shell
pnpm create vite <project-name> --template vue-ts
```

我这里创建的项目名为 vue3-ts-mobie-original，如下：

```shell
pnpm create vite vue3-ts-mobie-original --template vue-ts
cd vue3-ts-mobie-original
pnpm install
git init
git add .
git commit -m "feat:init"
git remote add origin git@github.com:tankaio/vue3-ts-mobie-original.git
git push origin master
```

### 2. 编码规范、提交规范相关

前端编码规范主要包括JS和CSS两部分，分别使用 ESLint 和 Stylelint 在落地工程中使用，同时结合 Prettier 来做编码风格统一。

这里先配置 **提交规范**，再配置 **代码规范**。

### 2.1 提交规范

### 2.1.1 commitizen

> 详情请移至 **2.1.1-commitizen.md** 文件查看

### 2.1.2 commitlint

> 详情请移至 **2.1.2-commitlint.md** 文件查看

> NOTE：vite3.x 开始生成的项目，package.json 会自动加上 "type": "module"

什么是 .cjs 和 .mjs ？

1. .cjs 代表使用 CommonJS 模块
2. .mjs 代表使用 ES 模块
3. .js 会去 package.json 文件中寻找你的 type 字段来当规范，如果没有 type 字段，默认为 CommonJs 规范，"type": "module"表示使用的是ES模块。

### 2.2 Eslint+Stylelint+Prettier

### 2.2.1 Eslint

> 详情请移至 **2.2.1-eslint.md** 文件查看

### 2.2.2 Stylelint

> 详情请移至 **2.2.2-stylelint.md** 文件查看

### 2.2.3 Prettier

> 详情请移至 **2.2.3-prettier.md** 文件查看

### 2.2.4 添加 保存代码时自动格式化 相关插件

### 安装vscode插件ESLint

如果写一行代码就要手动执行一遍lint命令，这效率就太低了。所以我们可以配合vscode的ESLint插件，实现每次保存代码时，自动执行lint命令来修复代码的错误。

在项目中新建.vscode/settings.json文件，然后在其中加入以下配置：

```json
{
  // 开启自动修复
  "editor.codeActionsOnSave": {
    "source.fixAll": false,
    "source.fixAll.eslint": true
  }
}
```

这样一来，当你按下ctrl + s保存的时候，eslint便会智能地为你修复一些代码错误了。

### 安装vscode的Stylelint插件

安装该插件可在我们保存代码时自动执行stylelint
在.vscode/settings.json中添加一下规则：

```json
{
  // 开启自动修复
  "editor.codeActionsOnSave": {
    "source.fixAll": false,
    "source.fixAll.stylelint": true
  },
  // stylelint校验的文件格式
  "stylelint.validate": ["css", "scss", "vue", "html"]
}
```

### 安装vscode的 Prettier-Code formatter 插件

安装该插件的目的是，让该插件在我们保存的时候自动完成格式化
在.vscode/settings.json中添加一下规则

```json
{
  // 保存的时候自动格式化
  "editor.formatOnSave": true,
  // 默认格式化工具选择prettier
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

.vscode/settings.json总览：

```json
{
  // 配置该项，新建文件时默认就是space：2
  "editor.tabSize": 2,
  // 保存的时候自动格式化
  "editor.formatOnSave": true,
  // 默认格式化工具选择prettier
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  // 开启自动修复
  "editor.codeActionsOnSave": {
    "source.fixAll": false,
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  }
}
```

### 2.2.5 配置 husky + lint-staged

虽然上面已经配置好了eslint、preitter与stylelint，但是还是存在以下问题。

对于不使用vscode的，或者没有安装eslint、preitter与stylelint插件的同学来说，就不能实现在保存的时候自动的去修复与和格式化代码。

这样提交到git仓库的代码还是不符合要求的。因此需要引入强制的手段来保证提交到git仓库的代码时符合我们的要求的。

基于上述的顾虑，社区提供了 `husky + lint-staged`的渐进式方案。 `lint-staged` 是一个只检测git暂存区的lint工具，husky是一个用来给我们的项目添加git hook的工具，git hook是进行git操作会触发的脚本，例如：提交的时候会触发pre-commit钩子,输入提交信息会触发commit-msg钩子。 我们用husky安装pre-commit钩子，我们就可以在进行git commit操作的时候，运行我们的脚本来检测待提交的代码是否规范，便可以只对暂存区的文件进行检查。

#### 安装依赖

```shell
pnpm add husky lint-staged -D
```

添加一个在`package.json`中添加一条`preinstall`脚本

```shell
{
  "script":{
    "prepare": "husky install"
  }
}
```

prepare脚本(npm的钩子)会在 `pnpm install` 之后自动运行，这样你的小伙伴clone了你的项目后安装依赖时会自动安装husky，这里由于我们已经运行过 `pnpm install` 了，所以我们需要手动运行一次 `pnpm prepare`,然后我们就会得到一个目录.husky。

接下来我们为我们git仓库添加一个pre-commit钩子,运行

```shell
npx husky add .husky/pre-commit "npx --no-install lint-staged"

# 如果没使用 lint-staged 则可添加下面的语句（使用npx或者pnpm都行哈）
pnpm husky add .husky/pre-commit "pnpm format"
```

这会在我们的.husky目录下生成一个pre-commit的脚本

```shell
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no-install lint-staged
```

接下来我们配置lint-staged，在package.json中添加下面的配置信息：

```shell
{
  "lint-staged": {
    "*.{vue,js,ts,jsx,tsx}": [
      "eslint --fix"
    ],
    "*.{css,scss,vue,html}": [
      "stylelint --fix"
    ],
    "*.{html,vue,ts,js,cjs,tsx,jsx,json,md}": [
      "prettier --write"
    ]
  }
}
```

### 配置alias别名

> NOTE：别忘了先安装 @types/node 哦～

"@types/node"是一个TypeScript的第三方声明文件库，它提供了Node.js的完整类型定义。TypeScript是JavaScript的超集，它增加了静态类型系统，使得代码更加可靠。 "@types/node"声明文件库是为了帮助TypeScript开发者在开发Node.js应用时获得更好的编码体验。

在vite.config.ts中增加一下配置：

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
+ import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
+ resolve: {
+   alias: {
+     '@': resolve(__dirname, './src')
+   }
+ },
  plugins: [vue()]
})
```

如果用了ts那么还需要在tsconfig.js中进行额外配置，注意path对象是在compilerOptions对象里面

```json
"compilerOptions": {
  "baseUrl": "./",
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

> NOTE：不配置baseUrl和paths的话，类似`import SvgIcon from '@/components/SvgIcon/index.vue'`这种使用了 别名 的引入会显示红波浪线（提示：Cannot find module ... or its corresponding type declarations.）

```json
// 如果baseUrl设置为'src',那paths就应该配置为{"@/*": "./*"},如下：
"compilerOptions": {
  "baseUrl": "src",
  "paths": {
    "@/*": ["./*"]
  }
}
```

### 3.框架基础组件

### 3.1 vite配置

配置 vite.config.ts：
值得注意的是：我们只有配置了 host 之后，我们本地才可以通过 ip 进行访问项目：

```js
server: {
  host: true, // host设置为true才可以使用network的形式，以ip访问项目
  port: 8080, // 端口号
  open: true, // 自动打开浏览器
  cors: true, // 跨域设置允许
  strictPort: true, // 如果端口已占用直接退出
  // 接口代理
  proxy: {
    '/api': {
      // 本地 8000 前端代码的接口 代理到 8888 的服务端口
      target: 'http://localhost:8888/',
      changeOrigin: true, // 允许跨域
      rewrite: (path) => path.replace('/api/', '/'),
    },
  },
},
```

build 配置  
我们可以设置打包时移除代码中的 console ，以及配置打包后的静态资源到 dist 下不同的目录

```js
build: {
  brotliSize: false,
  // 消除打包大小超过500kb警告
  chunkSizeWarningLimit: 2000,
  // 在生产环境移除console.log
  terserOptions: {
    compress: {
      drop_console: false,
      pure_funcs: ['console.log', 'console.info'],
      drop_debugger: true,
    },
  },
  assetsDir: 'static/assets',
  // 静态资源打包到dist下的不同目录
  rollupOptions: {
    output: {
      chunkFileNames: 'static/js/[name]-[hash].js',
      entryFileNames: 'static/js/[name]-[hash].js',
      assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
    },
  },
},
```

配置 vite 环境变量

- env.test
- env.development
- env.production

其中 .env.development 配置如下（其他的类似）：

```js
# 变量必须以VITE_为前缀才能暴露给外部读取

NODE_ENV = 'development'
# 项目的网页标题
VITE_APP_TITLE = 'vue-title'
# 项目的api基础前缀
VITE_APP_BASE_URL = '/api'
# 代理跨域的服务器地址
VITE_SERVE = 'http://xxx.xxx.xxx'
```

### 3.2 自动按需加载 api & 组件 & 样式

详情请见[3.2-autoimport.md](./3.2-autoimport.md)

`3.2-autoimport.md`例子中用pc端的Element Plus和Ant Design Vue 框架

由于此项目是移动端项目，因此我们使用 Vant 这个UI框架

Vant引入详情请参见[Vant官网快速上手章节](https://vant-ui.github.io/vant/#/zh-CN/quickstart#fang-fa-yi.-chang-gui-yong-fa)

### 3.3 vite-plugin-svg-icons

> NOTE：具体用法可见其[官网教程](https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md)

用途：用于生成 svg 雪碧图.  
vite-plugin-svg-icons是一款用于生成svg 雪碧图的插件，能够将本地指定文件目录下的所有svg生成一张雪碧图，在项目运行时就生成所有图标,只需操作一次dom,内置缓存,仅当文件被修改时才会重新生成。通过svg名称便可以加载对应的svg图标。
特征：

- **预加载** 在项目运行时就生成所有图标,只需操作一次 dom
- **高性能** 内置缓存,仅当文件被修改时才会重新生成

### 安装

```shell
pnpm add vite-plugin-svg-icons -D
```

### 使用

vite.config.ts 中的配置：

```js
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export default () => {
  return {
    plugins: [
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹（在src下创建icons文件夹，用于存放svg）
        iconDirs: [path.resolve(process.cwd(), 'src/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',

        /**
         * 自定义插入位置
         * @default: body-last
         */
        inject?: 'body-last' | 'body-first'

        /**
         * custom dom id
         * @default: __svg__icons__dom__
         */
        customDomId: '__svg__icons__dom__',
      }),
    ],
  }
}
```

在 src/main.ts 内引入注册脚本

```js
import 'virtual:svg-icons-register'
```

到这里 svg 雪碧图已经生成

### 如何在组件使用

`/src/components/SvgIcon.vue`

```
<template>
  <svg :style="{ width, height }">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#333'
  },
  width: {
    type: String,
    default: '1em'
  },
  height: {
    type: String,
    default: '1em'
  }
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>
<style scoped lang="scss"></style>

```

icons 目录结构：

```
# src/icons
- icon1.svg # icon-icon1
- icon2.svg # icon-icon2
- icon3.svg # icon-icon3
- dir/icon1.svg # icon-dir-icon1
- dir/dir2/icon1.svg # icon-dir-dir2-icon1
```

/src/App.vue

```html
<template>
  <div>
    <SvgIcon name="icon1" />
    <SvgIcon name="dir-icon1" />
  </div>
</template>
```

### Typescript 支持

如果使用 Typescript,你可以在tsconfig.json内添加

```js
{
  "compilerOptions": {
    "types": ["vite-plugin-svg-icons/client"]
  }
}
```

### 3.3.2 @iconify/vue

> NOTE：官网：https://iconify.design/docs/icon-components/vue/

iconify是一款功能丰富的图标框架，拥有所有流行的图标集，超过 150,000 个开源矢量图标。除了 SVG 框架之外，Iconify 还为多种流行的框架提供了本机组件，Iconify for Vue 就是这样的组件之一。官方为了便于Vue使用iconify网站上的图标，提供了@iconify/vue组件，供大家使用SVG framework，支持在线和离线2种方式使用。离线方式需要下载对应图标集合json数据，然后先从本地资源中加载，如果没有找到，通过API从线上下载资源，并进行浏览器缓存。

@iconify/vue是一个功能非常强大的组件，支持图标名称动态渲染和静态渲染，正好弥补vite-plugin-svg-icons功能缺陷。

### 安装

```shell
pnpm add @iconify/vue -D
```

### 使用

```
import { Icon } from '@iconify/vue'
<Icon icon="mdi-light:home" />
```

### 自定义组件

虽然@iconify/vue也支持本地svg,但逐个配置比较麻烦，所以结合vite-plugin-svg-icons和@iconify/vue,我们创建一个自定义组件，使其不仅支持本地静态动态Svg渲染，还支持显示静态动态Svg渲染。下面是自定义组件代码：

```html
<template>
  <template v-if="icon">
    <svg>
      <use :xlink:href="symbolId" :fill="color" v-bind="bindAttrs" />
    </svg>
  </template>
  <template v-else>
    <Icon v-if="onlineIcon" :icon="onlineIcon" :color="color" v-bind="bindAttrs" />
  </template>
</template>

<script setup lang="ts">
  import { Icon } from '@iconify/vue'

  interface Props {
    prefix?: string
    icon?: string // 本地svg图片的名字
    onlineIcon?: string // 线上svg图片的名字
    color?: string // svg图片颜色
  }

  // // 获取组件传递的属性
  const attrs = useAttrs()
  console.log(attrs)

  const bindAttrs = computed<{ class: string; style: string }>(() => ({
    class: (attrs.class as string) ?? 'w-20 h-20',
    style: attrs.style as string
  }))

  const { prefix, icon, onlineIcon } = withDefaults(defineProps<Props>(), {
    prefix: 'icon'
  })

  const symbolId = computed(() => `#${prefix}-${icon}`)
</script>
<style scoped lang="scss"></style>
```

### 3.3.3 unplugin-icons & icones

或者你也可以使用 unplugin-icons 加 icones图标库 的方式

- [unplugin-icons](https://github.com/unplugin/unplugin-icons)：可以自动按需引入我们所要使用的图标，而不用手动 import。
- [icones](https://github.com/antfu/icones)：是一个非常优秀的图标库，由 Iconify 提供图片支持。

### 安装

```shell
pnpm add -D unplugin-icons @iconify/json
```

配置 `vite.config.ts` 加入以下内容：

```js
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'

export default {
  plugins: [
    Components({
      resolvers: IconsResolver()
    }),
    Icons({
      compiler: 'vue3',
      autoInstall: true
    })
  ]
}
```

### 使用

打开网址：[icones.netlify.app](icones.netlify.app) 随便选择一个图标，然后点击复制你想要的格式，然后粘贴到代码中即可。

```html
<template>
  <i-mdi-account-reactivate style="font-size: 2em; color: red" />
</template>
```

[unplugin-icons](https://github.com/unplugin/unplugin-icons) 也可以直接使用 [iconify](https://iconify.design) 中的图标，更多用法请参见其官方文档，里面有详细的介绍。

### 3.3.4 Vue Router4

### 安装

```shell
pnpm add vue-router@4
```

### 路由配置

新建src/router/routes/index.ts

路由规则统一在src/router/routes/index.ts暴露出去。

```js
import type { RouteRecordRaw } from 'vue-router'

// 获取modules中的路由规则
// https://cn.vitejs.dev/guide/features.html#glob-import
const modules = import.meta.globEager('./modules/**/*.ts')

// modules routes
const routes: RouteRecordRaw[] = []

Object.keys(modules).forEach((key) => {
  const modulesRoutes = modules[key].default || {}

  let modRoutesList = []
  if (Array.isArray(modulesRoutes)) {
    modRoutesList = [...modulesRoutes]
  } else {
    modRoutesList = [modulesRoutes]
  }

  routes.push(...modRoutesList)
})

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
  component: () => import('@/views/common/404Page.vue')
}

export default [rootRoute, ...routes, notFoundPage]
```

新建src/router/routes/modules  
该目录下放各个业务模块的路由规则，例如common.ts就放登录、首页这些页面路由。

```js
import type { RouteRecordRaw } from 'vue-router'

// 路由规则
const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  }
]

export default routes
```

新建src/router/index.ts

```js
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import type { App } from 'vue'
import routes from './routes/index'

// 获取路由模式(history和hash)和项目baseUrl
const { VITE_HASH_ROUTE = 'false', VITE_ROUTE_BASE_URL } = import.meta.env

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
export const setupRouter = (app: App<Element>) => {
  app.use(router)
}
// 这个初始化函数也可以这样写（返回一个Promise<void>）：
// export async function setupRouter(app: App): Promise<void> {
//   app.use(router)
//   await router.isReady()
// }
// 这样的话，在 mian.ts 中就可以使用 async await 同步执行。
// mian.ts：
// import { createApp } from 'vue'
// import { setupRouter } from './router'
// import App from './App.vue'
// const bootstrap = async (): Promise<void> => {
//     // 创建vue实例
//     const app = createApp(App)
//     // 创建vueRouter
//     await setupRouter(app)
//     // 挂载app
//     app.mount('#app')
// }
// await bootstrap()

export default router
```

对于 `createWebHashHistory(base)` 和 `createWebHistory(base)` 参数的解释请参见[vue-router官网](https://router.vuejs.org/zh/api/#Functions-createWebHashHistory)

改造main.ts，引入router

```js
import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'

/**
 * 定义启动初始化函数
 */
const bootstrap = () => {
  const app = createApp(App)

  // 安装初始化路由
  setupRouter(app)

  app.mount('#app')
}

// 启动
bootstrap()
```

最后，在 App.vue 中 配置 router-view

```html
<template>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</template>
```

到此，路由安装配置完毕。

### 3.3.5 Pinia

### 安装

```shell
pnpm add pinia
```

### 新建src/store/index.ts

```js
import { createPinia } from 'pinia'
import type { App } from 'vue'

const store = createPinia()

export const setupStore = (app: App<Element>) => {
  app.use(store)
}

export default store
```

### 在src/main.ts中安装pinia

```js
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 引入 vite-plugin-svg-icons 注册脚本
import 'virtual:svg-icons-register'
import { setupRouter } from './router'
import { setupStore } from './store'

/**
 * 定义启动初始化函数
 */
const bootstrap = (): void => {
  const app = createApp(App)

  // 安装初始化store
  setupStore(app)
  // 安装初始化路由
  setupRouter(app)

  app.mount('#app')
}

// 启动
bootstrap()
```

### 以user模块为例 新建src/store/modules/user.ts

```js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('user', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  return { count, increment }
})
```

Pinia具体用法请参见其[官方文档](https://pinia.vuejs.org/zh/introduction.html)
到此，pinia安装配置完毕。

### 3.3.6 Axios

详情见项目跟目录下的文件`3.3.6-axios.md`

### 3.3.7 vite-plugin-mock

提供本地和生产模拟服务。

vite 的数据模拟插件，是基于 vite.js 开发的。 并同时支持本地环境和生产环境。 Connect 服务中间件在本地使用，mockjs 在生产环境中使用。

详情请参见[vite-plugin-mock官方文档](https://github.com/vbenjs/vite-plugin-mock/blob/main/README.zh_CN.md)

### 安装

```shell
pnpm add mockjs
pnpm add vite-plugin-mock -D
```

### 使用

vite.config.ts 配置：

```js
import { UserConfigExport, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'

export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      vue(),
      viteMockServe({
        mockPath: 'mock',
        enable: true,
      }),
    ],
  }
}
```

### 项目根目录下创建一个 `mock` 文件夹

文件夹里可以创建例如 `user.ts` `sys.ts`等模块文件
eg:

```js
// user.ts
function createUserList() {
  return [
    {
      userId: 1,
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'admin',
      password: '123456',
      desc: '平台管理员',
      roles: ['平台管理员'],
      buttons: ['cuser.detail'],
      routes: ['home'],
      token: 'Admin Token'
    },
    {
      userId: 2,
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'system',
      password: '123456',
      desc: '系统管理员',
      roles: ['系统管理员'],
      buttons: ['cuser.detail', 'cuser.user'],
      routes: ['home'],
      token: 'System Token'
    }
  ]
}

export default [
  // 用户登录接口
  {
    url: '/api/user/login', // 请求地址
    method: 'post', // 请求方式
    response: ({ body }) => {
      // 获取请求体携带过来的用户名与密码
      const { username, password } = body
      // 调用获取用户信息函数,用于判断是否有此用户
      const checkUser = createUserList().find(
        (item) => item.username === username && item.password === password
      )
      // 没有用户返回失败信息
      if (!checkUser) {
        return { code: 201, data: null, msg: '账号或者密码不正确' }
      }
      // 如果有返回成功信息
      return { code: 200, data: checkUser, msg: 'success' }
    }
  },
  // 用户退出登录接口
  {
    url: '/api/user/logout', // 请求地址
    method: 'post', // 请求方式
    response: (request) => {
      // 获取请求头携带token
      const token = request.headers.token
      // 查看用户信息是否包含有次token用户
      const checkUser = createUserList().find((item) => item.token === token)
      // 没有返回失败的信息
      if (!checkUser) {
        return { code: 500, data: null, msg: '退出登录失败' }
      }
      // 如果有返回成功信息
      return { code: 200, data: null, msg: '退出登录成功' }
    }
  },
  // 获取用户信息
  {
    url: '/api/user/info',
    method: 'get',
    response: (request) => {
      // 获取请求头携带token
      const token = request.headers.token
      // 查看用户信息是否包含有次token用户
      const checkUser = createUserList().find((item) => item.token === token)
      // 没有返回失败的信息
      if (!checkUser) {
        return { code: 201, data: null, msg: '获取用户信息失败' }
      }
      // 如果有返回成功信息
      return { code: 200, data: checkUser, msg: 'success' }
    }
  }
]
```

然后在项目里用ajax/axios/fetch请求相应接口即可，开发者面板中的network栏里也会输出相关请求信息。

### 3.3.8 【国际化】自动提取语言配置文件及使用

详情见 `3.3.8-i18n.md`

### 3.3.9 多套主题/换肤
