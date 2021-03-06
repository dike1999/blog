#!/usr/bin/env sh

# 发生错误时终止
set -e

# 构建
rm -rf build
npm run build

# 进入构建文件夹
cd build

# 如果你要部署到自定义域名
# echo 'www.example.com' > CNAME
git init
git add -A
git commit -m 'deploy'

# 如果你要部署在 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# 如果你要部署在 https://<USERNAME>.github.io/<REPO>
# 真没啥用 才想起来GitHub Page是部署静态网站的
git push -f git@github.com:dike1999/blog-vite.git master:gh-pages

cd -
