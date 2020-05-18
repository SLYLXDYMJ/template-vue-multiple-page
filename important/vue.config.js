module.exports = {
  pages: (function () {
    const path = require('path')
    const fs = require('fs')
    const glob = require('glob')
    
    /** 需要更改的变量 **/
    const VIEW_DIR_PATH = './src/views' // 页面级组件根目录
    const ENTRY_DIR_PATH = './entry' // 自动生成的 entry js 的存放目录路径
    const MAIN_PATH = './src/main.js' // 全局配置文件路径
    
    let pages = {}
    
    // 自动化配置
    glob.sync(VIEW_DIR_PATH + '/**/*.vue').forEach(function (pageUrl) {
      // 统一不同系统的横杠
      const formatPageUrl = pageUrl.replace(/\\/g, '/')
      /** 找到最后一级目录名，作为 entry key **/
      const entryKey = formatPageUrl.split('/').slice(-2, -1)[ 0 ]
      // 根据 entry key 自动生成 entry 文件
      const entryPath = `${ ENTRY_DIR_PATH }/${ entryKey }.js`
      // 相对于 entry 的 pageUrl 路径
      const appTpl = '.' + pageUrl
      // 需要写入 entry.js 的 js 代码
      // 只是简单的初始化 Vue
      const entryData = `
        import Vue from 'vue';
        import App from '${ appTpl }';
        
        // 这里若修改了配置变量，则需要注意路径正确
        import '.${ MAIN_PATH }'
        
        Vue.config.productionTip = false;
        
        new Vue({ render: h => h(App) }).$mount('#app');
      `
      
      // 检查 entry 目录，没有则创建
      fs.existsSync(ENTRY_DIR_PATH) || fs.mkdirSync(ENTRY_DIR_PATH)
      
      // 创建 entry 文件
      fs.writeFileSync(entryPath, entryData, function (err) {
        err && console.error(err)
      })
      
      // 返回 html-webpack-plugin 参数
      pages[ entryKey ] = {
        // 生成的 entry.js 路径
        entry: entryPath,
        // html 模板文件
        template: './public/index.html',
        // 生成后的 html 名
        filename: entryKey + '.html',
        // 是否压缩
        minify: false,
        // 引入资源文件
        chunks: [ 'chunk-vendors', 'chunk-common', entryKey ],
        // 控制 chunk 的排序。none | auto（默认）| dependency（依赖）| manual（手动）| {function}
        chunksSortMode: 'dependency'
      }
    })
    
    return pages
  })()
}