<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2019-12-21 15:07:03
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-12-07 14:57:28
 -->
<template>
  
  <div class="index">
    <!-- <div v-if="!$subReady.message">Loading...</div> -->
    <div>
      <div style="position: absolute; left: 0; top: 0; background-color: #eee; height: 100vh;">
        <LeftMenu></LeftMenu>
      </div>
      <div style="padding-left: 200px; height: 100vh; background-color: #eee;">
        <div style="position: absolute;right:10px; top:10px; z-index: 5;color: white;">
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


  import { DDPConnect } from '/imports/js/DDPConnect';

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

      // this.testFun('127.0.0.1:7802')

    },
    methods: {
      async testFun(remote_url){
        console.log('remote_url:',remote_url)
        // 等待ddp连接结果
        let connObj;
        try
        {
          connObj = await this.DDPconnect(remote_url, false);
        } catch (error)
        {
          this.$alert('Connect user server has error!', 'error')
        }
        console.log('-logout-connObj',connObj);
        // 处理断网时退出登录的情况
        if (connObj.stop)
        {
          console.error('连接中断');
          return;
        }else{
          console.log('连接成功')
        }
        let rel = await this.call(connObj,'serverboard_ui2tcp','ka21');
        console.log('rel:',rel)
      },
      async call(ddp, name)
      {
        console.log('#####--call:', name)
        var args = Array.prototype.slice.call(arguments, 2)
        return new Promise((resolve, reject) =>
        {
          console.log('--...args:', ...args)
          ddp.call(name, ...args, function (error, data)
          {
            console.log('call:', name, error, data)
            // resolve(data)
            if (error) {
              reject(error)
            } else {
              resolve(data)
            }
          })
        })
      },
      /**
       * @Descripttion: 连接设备DDP方法
       * @Param: 1.deviceUrl,{type: String},em:'http://localhost:7600' 2.method,{type: String}
       * @Return: 
       */
      deviceDDP(deviceUrl, method)
      {
        return new Promise((resolve, reject) =>
        {
          // 前端直接调用实现
          (async () =>
          {
            console.log('--deviceDDP:', deviceUrl)
            let data = {
              'deviceUrl': deviceUrl,
              'method': method
            }
            var client = new nysaDDPClient()
            var b = await client.connect(data.deviceUrl, 3000);
            console.log('--doLoop-p--前端调用ddp', b)
            if (b) {
              if (data.hasOwnProperty('method') && data.method) {
                var result1 = await this.call(client, data.method);
                resolve(result1)
              } else {
                resolve(b)
              }

            } else {
              console.log('client.connect false');
              resolve(false)
            }
          })()

          // 调用后台 - 实现ddp访问
          // Meteor.call('getDDP', data, (err, result) =>
          // {
          // 	if (!err) {
          // 		console.log('-######################-success ddp', result);
          // 		resolve(result)
          // 	} else {
          // 		cosnole.log('err:', err);
          // 		reject(err)
          // 	}
          // })
        })
      },
      GetDDPConnect(remote_url)
      {
        return this.allMeteor.find(item =>
        {
          return item.getUrl() === remote_url
        })
      },
      // 创建连接
      DDPconnect(remote_url, callback)
      {
        // 返回一个promise对象
        return new Promise(async (resolve, reject) =>
        {
          console.log('---DDPConnect-url-124-：', remote_url,)
          if (!remote_url) {
            this.$alert('Please set userServer!');
            resolve(null)
          }

            console.log('-----need creat new connect!----');
            // 调用连接方法
            let conn = new DDPConnect(remote_url, callback)
            await conn.connect()
            resolve(conn)
          
        }) // Promise end
      },
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
        'message': []
        // 'post': [],
        // 'othermsg': ''
      },
      // A helper function to get the current time
      // currentTime () {
      //   console.log('Calculating currentTime',posts);
      //   // var t = Time.findOne('currentTime') || {};
      //   return 'asdfas'+posts;
      // },
      message(){
        let msg = message.find({},{
          sort: {_id:-1},
          limit:1
        }).fetch()
        console.log('message--change',msg);

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