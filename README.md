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

前端编码规范主要包括JS和CSS两部分，分别使用 ESLint 和 Stylelint 在落地工程中使用，同时结合 Prettier 来做编码风格统一。

这里先配置 **提交规范**，再配置 **代码规范**。

### 2.1 提交规范

### 2.1.1 commitizen

> 详情请移至 **2.1.1-commitizen.md** 文件查看

### 2.1.2 commitlint

> 详情请移至 **2.1.2-commitlint.md** 文件查看

> NOTE：vite3.x 开始生成的项目，package.json 会自动加上 "type": "module"，这时根目录的配置文件不能以 .js 结尾，要改为 .cjs，如 .commitlintrc.cjs, .prettierrc.cjs, .eslintrc.cjs。

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
