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
- Pinia2
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
这里先配置 **提交规范**，再配置 **代码规范**。

### 2.1 提交规范
1. commitizen
> 详情请移至 **commitizen.md** 文件查看
2. commitlint
> 详情请移至 **commitlint.md** 文件查看

> NOTE：vite3.x 开始生成的项目，package.json 会自动加上 "type": "module"，这时根目录的配置文件不能以 .js 结尾，要改为 .cjs，如 .commitlintrc.cjs, .prettierrc.cjs, .eslintrc.cjs。