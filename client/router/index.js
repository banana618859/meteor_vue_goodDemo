/*
 * @Descripttion:
 * @Author: yizheng.yuan
 * @Date: 2019-12-20 13:54:45
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-03-19 10:00:29
 */
import Vue from "vue";
import Router from "vue-router";
import index from "/imports/ui/components/index";

import kind from "/imports/ui/components/kind";
import user from "/imports/ui/components/user";
import order from "/imports/ui/components/order";
import right from "/imports/ui/components/right";



import Product from '/imports/ui/components/product/product.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "/index",
      component: index,
      meta: { title: "首页" },
      redirect: '/product',
      children: [
        {
          path: "/product",
          name: "product",
          component: Product
        },
        {
          path: "/kind",
          name: "kind",
          component: kind
        },
        {
          path: "/user",
          name: "user",
          component: user
        },
        {
          path: "/order",
          name: "order",
          component: order
        },
        {
          path: "/right",
          name: "right",
          component: right
        }
      ]
    }

  ]
});
