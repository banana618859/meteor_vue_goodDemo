/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-04-01 16:11:10
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-04-01 16:27:12
 */
if(Meteor.isServer){
    console.log('server:',Meteor.isServer)
}else{
    console.log('client:',Meteor.isClient)
}