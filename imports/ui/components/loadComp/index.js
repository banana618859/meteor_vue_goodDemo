/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-12-03 09:45:04
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-12-03 09:56:20
 */
import LoadingComponent from './load.vue'
const Loading= {
    install:function(Vue){
        Vue.component('Loading',LoadingComponent)
    }  //'component-name'这就是后面可以使用的组件的名字，install是默认的一个方法
     
}
export default Loading