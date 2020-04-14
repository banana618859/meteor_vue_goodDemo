/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-03-19 09:04:24
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-04-13 14:49:48
 */
Posts = new Mongo.Collection('posts')
if(Meteor.isServer){
  Meteor.publish('post', function () {
    return Posts.find();
  });

  console.log('Posts.find().count()-first--',Posts.find().count())
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
    console.log('Posts.find().count()ttt--',Posts.find().count())
  }
}
else{
  // Meteor.subscribe('post');
}