<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2019-12-25 08:32:39
 * @LastEditors  : yizheng.yuan
 * @LastEditTime : 2019-12-26 00:39:38
 -->
<template>
    <div class="mainContent" style="height: 100%;">
        <div class="mainHeader">
            商品管理系统
        </div>
        <div style="padding:10px; height:calc(100% - 55px); overflow: auto; border:1px solid #ccc">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        components: {
        }
    }
</script>

<style>
    .mainHeader {
        height: 50px;
        line-height: 50px;
        background-color: #393e4a;
        font-size: 26px;
        color: #eee;
    }
</style>