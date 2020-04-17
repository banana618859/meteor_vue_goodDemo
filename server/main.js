/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2019-12-26 10:58:05
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-04-17 19:29:41
 */
import { Meteor } from 'meteor/meteor';
  // 集合
  import '../imports/collections/posts'
  import '../imports/collections/data'
  import '../imports/collections/otherData'
var usb = require('usb')
var fs = require('fs');
var fs = require('fs');
var os = require('os');
var path = require('path');
var exec = require('child_process').exec;
var sep='\\';

// 全局-文件点
let node = {
  'name': '',
  'label': '',
  filedir:'',
  type: 'file',
  fatherPath: ''
}

// 全局-树节点
let tree_node = {
  'name': '',
  'label': '',
  type: 'folder',
  filedir: '',
  fatherPath: ''
}

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
  getPan(){
    // show  Windows letter
    function showLetter() {
      return new Promise((resolve,reject)=>{
        exec('wmic logicaldisk get caption', function(err, stdout, stderr) {
            if(err || stderr) {
                console.log("root path open failed" + err + stderr);
                resolve(false)
            }else{
              var allArr = stdout.split('\r\r\n');
              let newArr=[]
              for(let i=0;i<allArr.length;i++){
                let one = allArr[i].replace(/^\s+|\s+$/g,"");
                if(one){
                  newArr.push(one)
                }
              }
              newArr.shift()
              console.log('result:',typeof stdout,newArr);
              resolve(newArr)
            }
        })
      })
    }
    return new Promise(async (resolve,reject)=>{
      console.log('后台获取盘符');

      // 判断软件运行所在的系统是什么
      // 返回标识操作系统平台的字符串。 该值在编译时设置。 
      // 可能的值有 'aix','darwin','freebsd','linux','openbsd','sunos','win32'。
      // 返回的值等价于 process.platform。
      var platform = os.platform();
      console.log('platform:',platform);
      let finalRel=''
      switch(platform){
        case 'win32':
          console.log('windows:');
            let rel = await showLetter();
            console.log('final-rel:',rel)
            finalRel= rel;
          break;
        case 'linux':
          console.log('linux:');
          finalRel= '/';
        case 'darwin':
          console.log('darwin:');
          finalRel= '/';
          break; 
        default:
          console.log('default:',platform);  
          finalRel= 'no find os';    
      }
      console.log('最后-finalRel:',finalRel)
      resolve(finalRel);
    })
  },
  getSep(){
    sep = path.sep;
    console.log('sep:',sep);
    return sep;
  },
  delDir(dirPath){
    try {
      fs.rmdirSync(dirPath);
      return {
        error: 0,
        msg: 'Create success!',
        data: tree_node
      }
    }
    catch(err){
      return {
        error: 1,
        msg: error
      };
    }
  },
  createDir(fapath,filename){
    try {
      console.log('fapath,filename:',fapath,filename)
      let thepath = path.join(fapath,filename)
      console.log('thepath:',thepath)
      fs.mkdirSync(thepath);
      tree_node = {
        'name': filename,
        'label': filename,
        type: 'folder',
        filedir: thepath,
        fatherPath: fapath
      }
      // 将新节点返回
      return {
        error: 0,
        msg: 'Create success!',
        data: tree_node
      }
    } catch (error) {
      console.log('err:',error);
      return {
        error: 1,
        msg: error
      };
    }
  },
  getCurrentFile(filePath){
    let folderArr=[];
    let treeArr=[]
    let treeSonArr=[];
    let allData={
      folderArr,
      treeArr
    }
    try {
      console.log('getCurrentFile--path:',filePath);
      // 列出当前文件夹下面的所有文件
      let allPath;
      var topName;
      if(!filePath.includes(sep)){
        filePath= path.join(filePath,sep)
      }
      allPath = filePath.split(sep)
      topName= allPath[allPath.length-1];
      
      var allDir = fs.readdirSync(filePath);
      
      console.log('allDir:',allDir);
      
      if(allDir.length>0){
        for(let i=0;i<allDir.length;i++){
          if(allDir[i].includes('.sys') || allDir[i].includes('System') 
          || allDir[i].includes('Documents and Settings')|| allDir[i].includes('Recovery')
          ){
            console.log('不处理该文件-first：',allDir[i]);
            continue;
          }
          var filedir = path.join(filePath, allDir[i]);
          var stat = fs.statSync(filedir);
          var is_direc = stat.isDirectory();// true || false 判断是不是文件夹
          // console.log('filedir:',filedir,i,'是文件夹:',is_direc);
           node = {
            name: allDir[i],
            type: is_direc? 'folder' : 'file',
            filedir,
            fatherPath: filePath
          }
          if(is_direc){
             tree_node = {
              'name': allDir[i],
              'label': allDir[i],
              type: 'folder',
              filedir,
              fatherPath: filePath
            }
            treeSonArr.push(tree_node);
          }
          folderArr.push(node);
        }
      }
      // 再次循环目录树，将第二级也找出来
      // 如果第二级存在文件夹，将其所有文件夹加到相应的父目录里
      for(let i=0;i<treeSonArr.length;i++){
        let filePath = treeSonArr[i].filedir;
        let sunArr = [];
        let allDir = fs.readdirSync(filePath);
        console.log('se-allDir:',allDir);
        for(let i=0;i<allDir.length;i++){
          if(allDir[i].includes('.sys') || allDir[i].includes('System')){
            console.log('不处理该文件-second：',allDir[i]);
            continue;
          }
          var filedir = path.join(filePath, allDir[i]);
          var stat = fs.statSync(filedir);
          var is_direc = stat.isDirectory();// true || false 判断是不是文件夹
          // console.log('sun--filedir:',filedir,i,'是文件夹:',is_direc);
          if(is_direc){
            let tree_node = {
              'name': allDir[i],
              'label': allDir[i],
              type: 'folder',
              filedir,
              fatherPath: filePath
            }
            sunArr.push(tree_node);
          }
        }
        if(sunArr.length>0){
          treeSonArr[i].children = sunArr;
        }
      }
      // 组织树结构
      let treeRoot={};
      treeRoot['label'] = topName;
      treeRoot['name'] = topName;
      treeRoot['filedir'] = filePath;
      treeRoot['fatherPath'] = '\\';
      treeRoot['children'] = treeSonArr;
      treeArr.push(treeRoot);
      // console.log('treeArr:',treeArr)
      // console.log('folderArr:',folderArr);
    
      return allData;
    } catch (error) {
        console.log('error:',error)
        return allData;
    }
  },
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


