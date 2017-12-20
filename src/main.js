import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css';
import './less/index.less'


//启动vue插件

Vue.use(VueRouter);
Vue.use(ElementUI);

import AppComponent from './component/App.vue';

//导入路由配置

import routerConfig from './router';


//导入配置后的axios 与 api 注入到vue的原型当中，这样 所有的组件就可以通过this吊桶

import axios from './js/axios_config.js';
import api, { domain } from './js/api_config.js';
Vue.prototype.$http = axios;
Vue.prototype.$api = api;
Vue.prototype.$apiDomain = domain;

//导入路由守卫函数，创建路由实例， 配置守卫做登陆校验
import routerGuard from './router/guard.js';

const vueRouter = new VueRouter(routerConfig);

vueRouter.beforeEach(routerGuard)

new Vue({
    el: '#app',

    render: c => c(AppComponent),
    router: vueRouter

})