<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2019-12-21 15:07:03
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-05-08 16:35:50
 -->
<template>
  
  <div class="index">
    <div v-if="!$subReady.post">Loading...</div>
    <div v-else>
      <div style="position: absolute; left: 0; top: 0; background-color: #eee; height: 100vh;">
        <LeftMenu></LeftMenu>
      </div>
      <div style="padding-left: 200px; height: 100vh; background-color: #eee;">
        <div style="position: absolute;right:10px; top:10px; z-index: 5;color: white;">
          <p>
            post:{{theTime}}
          </p>
          <p>
            123:{{themsg}}
          </p>
        </div>
        <MainContent></MainContent>
      </div>
    </div>
    
  </div>
</template>
<script>
  //组件
  // import LeftMenu from '/imports/ui/components/LeftMenu'
  import LeftMenu from '/imports/ui/components/LeftMenuOld'
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
      // 调用后台方法
      Meteor.call('getusb',(e,r)=>{
        console.log('rel11:',e,r.length)
      })

      Meteor.call('updateName',(e,r)=>{
        console.log('updateName:',e,r.length)
      })

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
    },
    // Meteor reactivity
    meteor: {
      // Subscriptions - Errors not reported spelling and capitalization.
      $subscribe: {
        'post': [],
        'othermsg': ''
      },
      // A helper function to get the current time
      // currentTime () {
      //   console.log('Calculating currentTime',posts);
      //   // var t = Time.findOne('currentTime') || {};
      //   return 'asdfas'+posts;
      // },
      themsg(){
        let msg = Data.find().fetch()
        console.log('othermsg',msg);
        return msg.length ? msg[0].name : '';
      },
      theTime () {
        var t = Posts.find().fetch();
        console.log('theTime',t);
        return 'asdfas'+t.length;
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