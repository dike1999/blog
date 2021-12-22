# 开始使用

- 该博客基于 Vite2 + React [Vite 官方中文文档](https://cn.vitejs.dev/).
- 构建过程可以通过 build.rollupOptions 直接调整底层的 [Rollup 选项](https://rollupjs.org/guide/zh/)

## 项目使用说明

- 源码: [https://github.com/dike1999/blog](https://github.com/dike1999/blog)
- 博客前台(访客): [http://101.201.140.172/](http://101.201.140.172/) React+Antd vite2+rollup.js自定义打包构建
- 管理后台: [http://101.201.140.172/admin](http://101.201.140.172/admin) 需权限认证
- 服务端: [http://101.201.140.172:6060/](http://101.201.140.172:6060/) Nginx反向代理+Pm2-Node
- 静态资源服务器:[http://101.201.140.172:7878/](http://101.201.140.172:7878/) 结合&图片上传云服务器-以前的项目

- PC 端界面
  ![PC界面](./src/assets/images/Snipaste_PC.png)

- 移动端界面
  ![移动端界面](./src/assets/images/Snipaste_Mobile.png)

### 性能优化

- SEO (博客暂时不能域名备案)
- gzip压缩，强缓存，协商缓存
- 自定义配置打包优化 4.3MB→2.4MB，
- 代码分割，按需加载，CI/CD自动构建
- 设备适配 响应式布局 前端代码埋点
- 前端性能优化方案 遵循雅虎军规35条

### TODO

- 定制暗黑主题+开屏动画
- 点赞功能(根据IP、访客点赞)
- 服务器端渲染SSR

## 执行脚本

在项目目录中，您可以运行：

### 初始化项目 `yarn`

- 安装项目运行所需依赖

### 启动React项目 `yarn start`

- 在开发模式下运行应用程序
- 在浏览器中打开 [http://localhost:3000](http://localhost:3000)

### 构建生产版本 `yarn build`

- 当需要将应用部署到生产环境时，只需运行 vite build 命令。
- 默认情况下，它使用 <root>/index.html 作为其构建入口点，并生成能够静态部署的应用程序包。
- 请查阅 [部署静态站点](https://cn.vitejs.dev/guide/static-deploy.html) 获取常见服务的部署指引。

### 关于prettier

- 因为prettier的一些设置规则可能和eslint冲突
- 所以去掉了在提交阶段使用prettier格式化代码
- 都使用eslint来自动格式化代码

### 规范git commit message

- 安装`commitlint`

```
yarn add @commitlint/cli @commitlint/config-conventional --dev
```

- 在`package.json`文件中添加commitlint配置

```json
"commitlint": {
  "extends": [
    "@commitlint/config-conventional"
  ]
}
```

- 添加Git Hooks。Git Commit 消息规则请参考: [CommitLint](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional)

```
npx husky add configs/husky/commit-msg "npx --no-install commitlint --edit $1"
```

- 提交一个commit示例

```
git commit -m "fix: 处理了某个BUG"
```
