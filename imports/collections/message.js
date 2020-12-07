/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-12-03 10:10:19
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-12-07 14:25:41
 */
message = new Mongo.Collection('message')
if(Meteor.isServer){
  Meteor.publish('message', function () {
    return message.find({});
  });
}else{
  Meteor.subscribe('message')
}
