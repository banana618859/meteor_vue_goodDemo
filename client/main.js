/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2019-12-26 10:58:05
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-04-14 10:53:08
 */
import Vue from 'vue';
import App from '/imports/ui/App.vue';
import './main.html';


import router from "./router";
import "/public/common.css";
import "/public/fonts/iconfont.css"

import VueMeteorTracker from 'vue-meteor-tracker'
Vue.use(VueMeteorTracker)

import Axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, Axios);

// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


// vuex
import store from "./store/index";

// cookie
import VueCookies from "vue-cookies";
Vue.use(VueCookies);

Vue.config.productionTip = false;

// sider-menu
//main.js
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
Vue.use(VueSidebarMenu)


Meteor.startup(() =>
{
  new Vue({
    el: '#app',
    ...App,
    router,
    store
  });
});