<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2019-12-21 15:07:03
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-03-19 09:11:39
 -->
<template>
  <div class="index">
    <div style="position: absolute; left: 0; top: 0; background-color: #eee; height: 100vh;">
      <LeftMenu></LeftMenu>
    </div>
    <div style="padding-left: 200px; height: 100vh; background-color: #eee;">
      <MainContent></MainContent>
    </div>
  </div>
</template>
<script>
  //组件
  import LeftMenu from '/imports/ui//components/LeftMenu'
  import MainContent from '/imports/ui/components/MainContent'
  // 集合
  import '../../collections/posts'
  import '../../collections/data'
  export default {
    name: "index",
    data() {
      return {
        userInfo: "",
        code: ""
      };
    },
    components: {
      LeftMenu,
      MainContent
    },
    mounted() {


    },
    methods: {
      getUserInfo() {
        // let openid = this.$cookies.get("openid");
        // console.log("---2openid:", openid);
        // this.getUserInfo();
        console.log("API:", API);
        console.log("--wx:", wx);
        // 从重定向的后台回调的网页URL地址中获取code
        console.log("url###:", window.location.search);
        let code = window.location.search.slice(1).split("&")[0];
        code = code.split("=")[1];
        console.log("--code:", code);
        this.code = code;
        console.log("--index--get user", this.axios);
        this.axios
          .get(API.getUserInfo, {
            params: { code: this.code }
          })
          .then(response => {
            let res = response.data;
            console.log("data--:", res);
            this.userInfo = res;
          });
      },
      recharge() {
        this.$router.push("/pay");
      },
      activity() {
        this.$router.push("/activity");
      }
    }
  };
</script>
<style>
  .index {
    /* background-color: #ffc93a; */
    height: 100vh;
  }

  .btn-group {
    padding-top: 0.34rem;
    text-align: center;
  }

  .nickname {
    height: 50px;
    line-height: 50px;
    text-align: center;
    border: 1px solid #666;
    background-color: #eee;
    font-size: 18px;
  }
</style>