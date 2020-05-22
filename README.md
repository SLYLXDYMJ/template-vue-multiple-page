# template-vue-multiple-page
> vue-cli 多页面自动化配置

## 使用
1. 下载此项目
2. 将 important 中的 vue.config.js 合并到项目中（主要为 pages 部分）
3. 删除自己项目中的 src/App.vue 文件
4. 删除自己项目中的 src/main.js 中的所有内容
5. 已目录的方式新建页面存放于 src/views 目录中，目录名即为 html 文件名
6. npm run serve

## 注意
1. 各个页面需要已目录的方式存放于 src/views 目录中。
2. 各个页面的访问地址为 http://127.0.0.1:8080/${ 页面目录名 }.html。
