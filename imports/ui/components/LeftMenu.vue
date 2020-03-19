<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2019-12-25 08:32:39
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-03-19 08:50:29
 -->
<template>
    <div class="leftmenu" style="width: 200px; height: 100%;">
        <sidebar-menu :menu="menu" width="200px">
            <span slot="toggle-icon"><i class="iconfont icon-shezhi"></i></span>
            <span slot="dropdown-icon"><i class="iconfont icon-jiantouyou"></i></span>
        </sidebar-menu>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                menu: [
                    {
                        header: true,
                        title: 'Drawing System',
                        hiddenOnCollapse: true
                    },
                    {
                        href: '/',
                        title: '商品管理',
                        icon: 'iconfont icon-goods-copy',
                        child: [
                            {
                                href: '/kind',
                                title: '商品分类'
                            }
                        ]
                    },
                    {
                        href: '/order',
                        title: '订单管理',
                        icon: 'iconfont icon-weibiaoti-',

                    },
                    {
                        href: '/user',
                        title: '用户管理',
                        icon: 'iconfont icon-yonghu',

                    },
                    {
                        href: '/right',
                        title: '权限管理',
                        icon: 'iconfont icon-quanxianpeizhi',

                    }
                ]
            }
        }
    }
</script>
<style>
    .v-sidebar-menu .vsm--header {
        height: 50px;
        line-height: 50px;
        padding: 0 10px;
    }
</style>