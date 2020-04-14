/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2019-12-26 10:58:05
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-04-13 16:30:15
 */
import { Meteor } from 'meteor/meteor';
  // 集合
  import '../imports/collections/posts'
  import '../imports/collections/data'
  import '../imports/collections/otherData'
var usb = require('usb')
Meteor.startup(() => {
  // code to run on server at startup 
});

var oneBound = Meteor.bindEnvironment((callback) => {
  console.log('run here!')
  callback()})

// 在服务器端
// 发布数据
Meteor.publish('Data', function () {
  console.log('data:',Data.find())
  return Data.find();
});

Meteor.methods({
  getusb(){
    console.log('---usb2---')
    var list = usb.getDeviceList();
    console.log('usb-list:',list.length);
    return list;
  },
  updateName(){
    console.log('---updateName---')
    let one = Data.findOne();
    console.log('one:',one)
    if(one){
      console.log('Data.findOne():',typeof one, one)
      let _id =one._id;
        Meteor.setTimeout(() => {
          let thename = Date.now();
          console.log('thename:',thename)
          Data.update(
            {_id},
            {
              name: thename
            }
          )
        }, 2000);
    }
    return 'updateName';
  }
})


