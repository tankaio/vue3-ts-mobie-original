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
1. Commitizen
> Commitizen 是一个撰写符合 Git Commit Message 规范的一款工具。

### 安装Commitizen
#### 方式一 全局安装
```shell
# 全局安装 推荐
npm install -g commitizen
```
下一步是初始化Commitizen配套的适配器cz-conventional-changelog

> NOTE：cz-conventional-changelog是与commitzen配套的adapter（适配器），这种适配器还有很多，比如：cz-customizable、cz-git等等，可自行选择自己喜欢的adapter，详情可见 [commitzen官方文档](https://www.npmjs.com/package/commitizen)。

```shell
# npm
commitizen init cz-conventional-changelog --save-dev --save-exact

# yarn
commitizen init cz-conventional-changelog --yarn --dev --exact

# pnpm
commitizen init cz-conventional-changelog --pnpm --save-dev --save-exact
```
#### 方式二 单个项目安装
```shell
# 单个项目安装
npm install --save-dev commitizen
```
通过下面命令初始化cz-conventional-changelog
```shell
# On npm 5.2+ you can use npx
npx commitizen init cz-conventional-changelog --save-dev --save-exact
# For previous versions of npm (< 5.2)
./node_modules/.bin/commitizen init cz-conventional-changelog --save-dev --save-exact
# or
./node_modules/.bin/cz init cz-conventional-changelog --save-dev --save-exact
```
完成这两步后，在项目下运行git cz看到效果了。  
然后也可以在package.json添加npm script：
```json
{
  "script": {
   // If you are using precommit hooks thanks to something like husky, you will need to name your script something other than "commit" (e.g. "cm": "cz"). 
   //  "commit: "cz" 
    "cm: "cz"
  }
}
```
这样，对于项目的其他开发者来说，如果他们想通过Commitizen完成一次提交，只需要运行npm run cm就可以了。

运行命令后面板会出现下面六步提示，自行选择每一步即可：
> 第一步： 选择这次提交的内容类型：提交类型是以后生成CHANGELOG分类题目  
> 第二步： 这次提交影响范围  
> 第三步：简短描述：如果你使用gitlab 或者github 进行远程分支Merge requset 的时候，这个就是默认的title  
> 第四步：详细描述  
> 第五步：是否重大更新（改变）：一般具有重要的大版本或者破坏原来代码的时候需要标记一下  
> 第六步：这次提交对哪些打开的 issue 有影响：类似于 github 开源模式，代码的维护不论需求还是fix都有对应的issue讨论进行code的支撑。git message 这一步就是为了关联issue。如果选择是，可写上相关issue 对应号码。

### 在git commit上运行Commitizen
这里，我们将展示如何使用git hooks和--hook命令行参数将Commitizen合并到现有的git commit工作流中。

> NOTE：这里我们假设你的项目是通过**方式二 单个项目安装**安装的Commitizen。

对于husky用户，在package.json中添加下列配置：
```json
"husky": {
  "hooks": {
    "prepare-commit-msg": "exec < /dev/tty && npx cz --hook || true"
  }
}
```
> Why exec < /dev/tty? By default, git hooks are not interactive. This command allows the user to use their terminal to interact with Commitizen during the hook.

### 自动产生CHANGELOG
正规的写提交记录最后就是为了让团队其他人看懂，还有一个目的是为了更规范的产生CHANGELOG，下面看看自动产生CHANGELOG的步骤。
1. 安装产生changelog插件conventional-changelog-cli
```shell
pnpm install conventional-changelog-cli --save-dev
```
2. 在 package.json 添加脚本
```
# -p 用于指定 Conventional Commits 的规范，例如 angular 或 atom。
# -i 参数用于指定输入文件，即更改日志文件，通常为 CHANGELOG.md。
# -s 参数用于生成简化版的更改日志，而不是完整版本。
"changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0"
```
3. 执行脚本：pnpm changeLog，查看结果

这里测试了下：用**pnpm changeLog**和**git commit -m "type: xxx"**提交的都可以生成日志文件，所以如果团队每个人都能按规范提交的话，第一步Commitizen约束是可以不需要的。