
        import Vue from 'vue';
        import App from '../src/views/detail/index.vue';
        
        // 这里若修改了配置变量，则需要注意路径正确
        import '../src/main.js'
        
        Vue.config.productionTip = false;
        
        new Vue({ render: h => h(App) }).$mount('#app');
      