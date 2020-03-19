/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-03-19 09:04:24
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-03-19 09:18:54
 */
Posts = new Mongo.Collection('posts')
console.log('Posts.find().count()--',Posts.find().count())
if (Posts.find().count() === 0) {
  Posts.insert({
    title: 'Introducing Telescope',
    url: 'http://sachagreif.com/introducing-telescope/'
  });

  Posts.insert({
    title: 'Meteor',
    url: 'http://meteor.com'
  });

  Posts.insert({
    title: 'The Meteor Book',
    url: 'http://themeteorbook.com'
  });
}