import { MeteorData } from "vue-meteor-tracker";

/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-03-19 09:04:24
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-04-13 16:59:29
 */
Data = new Mongo.Collection('data');

if(Meteor.isServer){
    Meteor.publish('othermsg', function () {
        return Data.find();
        // return 'dsfasdf'
      });
}else{

}