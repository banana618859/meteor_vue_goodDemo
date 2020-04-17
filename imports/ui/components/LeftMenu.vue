<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2019-12-26 11:12:49
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-04-17 19:31:40
 -->
<template>
    <div class="leftmenu" style="width: 200px; height: 100%;">
        <div class="header">
            目录 <i class="el-icon-folder-opened hand" @click="lookDir"></i>
        </div>
        <treeAdd></treeAdd>

        <!-- 文件目录 -->
        <el-dialog
        title="File Dir"
        :visible.sync="dialogVisible"
        width="55%">
        <p slot="title" style="text-align: left;">
          File Directory
        </p>
        <div id="mainBox" class="mainBox">
        <div id="leftBox" class="leftTree" :style="{width: leftBoxWidth+'px'}">
            <div id="leftLine" class="leftLine"></div>
            <div class="leftTreeInner">
              <el-tree 
                ref="dirTree"
                node-key="filedir"
                :data="treeData" 
                :props="defaultProps" 
                @node-expand="nodeExpand"
                @node-click="handleNodeClick">
                  <div class="custom-tree-node" slot-scope="{ node, data }">
                    <p>
                      <i class="el-icon-folder smIcon"></i>
                      {{ data.label }}</p>
                  </div>
              </el-tree>
            </div>
          </div>
          <div id="rightBox" class="rightContent" :style="{width: rightBoxWidth+'px'}">
            <div class="thepath">
              <!-- <div class="pathL">
                Current path: 
              </div> -->
              <div class="pathR" :style="{width: pathRightWidth+'px'}">
                  <span
                    v-for="(subPath,index) in currentPathArr" :key="subPath+index">
                  <span @click="subClick(subPath,index)" class="subPath">
                    <el-tooltip class="item" effect="dark" :disabled="subPath.length<12" :content="subPath" placement="top">
                      <span>{{subPath}}</span>
                    </el-tooltip>
                    
                  </span>
                    <i class="el-icon-arrow-right subPathIcon"></i>
                  </span>
              </div>
              <div class="pathR1" :style="{width: pathRightWidtha+'px'}">
                <!-- more<i class="el-icon-arrow-down"></i> -->
                <el-dropdown 
                  v-if="morePath.length>0"
                  @command="handleCommand">
                  <span class="el-dropdown-link">
                    more<i class="el-icon-arrow-down"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item 
                      v-for="(item,index) in morePath" 
                      :key="item+index"
                      :command="item">
                      {{item}}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <!-- <span class="fr">
                <i class="el-icon-caret-top font18 hand"></i>
                <i class="el-icon-caret-bottom font18 hand"></i>
              </span> -->
            </div>
            <vue-context-menu 
              :contextMenuData="contextMenuData"
              @savedata="savedata"
              @newdata="newdata"
              @createfile="createFile"
              @createdir="createDir"
              >
            </vue-context-menu>
            <div class="folderWrap" v-loading="dirLoading" 
              @contextmenu="showMenu">
              
              <p v-if="allFiles.length==0">No data!</p>
              <ul v-else>
                <li 
                  v-for="(item,index) in allFiles" 
                  :key="item.name+index"
                  @click="liClick(item)">
                  <i v-if="item.type=='folder'" class="el-icon-folder folder"></i>
                  <i v-else-if="item.name.includes('jpg')||item.name.includes('png')" class="el-icon-picture imgIcon"></i>
                  <i v-else class="el-icon-document file"></i>
                  <p>{{item.name}}</p>
                </li>
                
              </ul>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialogVisible = false">Cancel</el-button>
          <el-button size="mini" type="primary" @click="sureMenu">OK</el-button>
        </span>
      </el-dialog>

      <!-- 新建文件夹 -->
      <el-dialog
      title="New Dir"
      :visible.sync="dialogDir"
      width="30%">
      <p>
        <el-input v-model="fileName"></el-input>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDir = false">Cancel</el-button>
        <el-button type="primary" @click="sureCreateDir">OK</el-button>
      </span>
    </el-dialog>

        <!-- <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree> -->
    </div>
    
</template>
<script>
  import Util from '/imports/js/util'
  import treeAdd from '/imports/ui/components/treeAdd'
  export default {
    data() {
      return {
        thefolderArr: [],
        fileArr: [],
        dialogDir: false,
        fileName: '',
        // contextmenu data (菜单数据)
        contextMenuData: {
          // the contextmenu name(@1.4.1 updated)
          menuName: 'fileDir',
          // The coordinates of the display(菜单显示的位置)
          axis: {
            x: null,
            y: null
          },
          // Menu options (菜单选项)
          menulists: [{
              fnHandler: 'savedata', // Binding events(绑定事件)
              icoName: 'fa fa-home fa-fw', // icon (icon图标 )
              btnName: 'Save' // The name of the menu option (菜单名称)
            }, 
            {
                fnHandler: 'newdata',
                icoName: 'fa fa-home fa-fw',
                btnName: 'New'
            }, 
            {
                fnHandler: 'createfile',
                icoName: 'fa fa-home fa-fw',
                btnName: 'New file'
            }, 
            {
                fnHandler: 'createdir',
                icoName: 'fa fa-home fa-fw',
                btnName: 'New Dir'
            }
          ]
        },
        realFa:[],
        realSonIndex: 0,
        dirLoading: false,
        mainWidth: 0,
        leftBoxWidth: 150,
        rightBoxWidth: 0,
        pathLeftWidth: 0,
        pathRightWidth: 0,
        pathRightWidtha: 50,
        allFiles:[
        {
            name: 'file1file1asdfad',
            type: 'folder'
          }
        ],
        theSep: '\\',
        path: '',
        rootPath: '',
        currentNode: null,
        currentPath: '/home/code',
        currentPathArr: [],
        morePath: [],
        dialogVisible: false,
        workspace: 'C://',
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    components:{
      treeAdd
    },
    created(){
      
      console.log('Util:',Util)
      // 获取系统分隔符
      Meteor.call('getSep',(err,rel)=>{
        console.log('err,rel',rel);
        if(!err){
          this.theSep = rel;
          this.path = 'D:'+this.theSep+'pratdemo';
          // 页面加载，获取整体目录大纲
          let firstTree = [
            {
              name: this.path,
              label: this.path,
              filedir: this.path,
              fatherPath:'\\'
            }
          ]
          this.treeData= firstTree;
          console.log('this.treeData:',this.treeData)
        }
      })
    },
    mounted(){
      console.log('left-mounted');
      // this.treeData
      console.log('通过后台获取系统的盘符');
      Meteor.call('getPan',(err,rel)=>{
        console.log('盘符有：',err,rel);
        // 组成根节点
        let rootTree = [];
        
        for(let i=0;i<rel.length;i++){
          let oneNode={
            'name': rel[i],
            'label': rel[i],
            filedir: rel[i],
            fatherPath: rel[i]
          }
          rootTree.push(oneNode);
        }
        console.log('rootTree:',rootTree);
        this.treeData = rootTree
      })
    },
    watch:{
      'currentPathArr'(newV,oldV){
        if(newV.length>3){
          this.morePath = newV.slice(3);
        }else{
          this.morePath =[]
        }
      }
    },
    methods: {
      createFile(){
        console.log('--createFile')
      },
      createDir(){
        console.log('--createDir');
        this.dialogDir = true;
      },
      myMsg(text,theType){
        this.$message({
          message: text,
          type: theType
        })
      },
      sureCreateDir(){
        console.log('--sureCreateDir',this.path,this.fileName);
        Meteor.call('createDir',this.path,this.fileName,(err,rel)=>{
          console.log('err,rel:',err,rel);
          this.dialogDir = false;
          if(!err){
            this.updateTreeArr(rel.data);
            this.updateFileArr(rel.data);
            this.myMsg(rel.msg,'success');
          }else{
            this.myMsg(rel.msg,'error');
          }
        })
      },
      updateTreeArr(newNode){
        console.log('newNode:',newNode,this.currentNode);
        if(!this.currentNode.children){
          this.currentNode.children=[]
        }
        this.currentNode.children.push(newNode)
        let path = this.currentNode.filedir;
        this.$nextTick(() => {
          this.$refs['dirTree'].updateKeyChildren(path,this.currentNode.children);
        })
      },
      updateFileArr(newNode){
        // delete newNode.label;
        // newNode.type = "folder";
        console.log('newNode-file:',newNode);
        // 先将文件夹的数组改变
        this.thefolderArr.push(newNode);
        let newArr = this.thefolderArr.concat(this.fileArr);
        this.allFiles=newArr
      },
      showMenu () {
        event.preventDefault();
        console.log('触发了显示函数')
        var x = event.clientX
        var y = event.clientY
        // Get the current location
        this.contextMenuData.axis = {
          x, y
        }
      },
      savedata () {
        alert(1)
      },
      newdata () {
        console.log('newdata!')
      },
      handleCommand(command) {
        console.log('handleCommand:',command);
        // this.$message('click on item ' + command);
        let indx = this.path.indexOf(command);
        console.log('this.path:',this.path)
        console.log('indx:',indx)
        let path = this.path.slice(0,indx)+command
        console.log('this.path2:',path);
        this.showDir(path)
      },
      async nodeExpand(data,node,vueCompt){
        console.log('nodeExpand:',data,node,vueCompt);
        let sonPath = data.filedir;
        console.log('nodeExpand',data,sonPath);
        // 如果本地点击的节点的路径和上一次的相同，则不触发
        if(sonPath == this.path){
          console.log('nodeExpand和上一次相同');
        }else{
          await this.showDir(sonPath);
          this.$nextTick(()=>{
            return true;
          })
        }
      },
      subClick(subClick,index){
        console.log('subClick:',subClick,index);
        if(this.currentPathArr.length==1){
          this.theMsg('Can not back again!','warning')
          return;
        }
        let newArr = this.currentPathArr.slice(0,index+1);
        let doubleSep = this.theSep+this.theSep
        console.log('this.currentPathArr:',newArr,doubleSep);
        let newPath = newArr.join(this.theSep);
        
        console.log('newPath:',newPath);
        this.showDir(newPath)
      },
      theMsg(text,theType){
        this.$message({
            message: text,
            type: theType
          })
      },
      liClick(item){
        console.log('item:',item);
        if(item.type=='file'){
          return;
        }
        this.showDir(item.filedir)
      },
      async lookDir(){
        this.dialogVisible = true;
        // 逐个请求数据
        let firstArr = JSON.parse(JSON.stringify(this.treeData))
        let firstOne = firstArr.shift();
        if(firstArr.length>0){
          for(let i=0;i<firstArr.length;i++){
            await this.showDir(firstArr[i].filedir)
          }
        }
        // 最后请求第一个
        console.log('firstOne:',firstOne)
        this.showDir(firstOne.filedir)
        this.currentPath = firstOne.filedir;
        this.currentPathArr = this.currentPath.split(this.theSep);
        console.log('currentPathArr333:',this.currentPathArr)
        // this.showDir()
        this.$nextTick(()=>{
          // 绑定拖动事件
          var mainBox = document.getElementById('mainBox');
          var leftBox = document.getElementById('leftBox');
          var rightBox = document.getElementById('rightBox');
          var leftLine = document.getElementById('leftLine');
          console.log('mainBox:',mainBox.clientWidth);
          this.mainWidth = mainBox.clientWidth - 2;
          this.rightBoxWidth = this.mainWidth - this.leftBoxWidth;
          this.pathRightWidth = this.rightBoxWidth -this.pathRightWidtha - this.pathLeftWidth -20; 
          let minWidth = 120;
          // console.log('leftBox,rightBox,leftLine：',leftBox,rightBox,leftLine)
          leftLine.onmousedown=()=>{
            // that = this;
            console.log('-leftLine-down',event);
            // 记录初始横坐标
            var startX = event.clientX;
            // 监听鼠标移动事件
            document.onmousemove = ()=>{
              let moveX = event.clientX - startX;
              // 将当前的移动坐标赋值给初始坐标
              startX = event.clientX;
              console.log('moveX:',moveX);
              this.leftBoxWidth += moveX;
              this.rightBoxWidth -= moveX;
              if(this.leftBoxWidth<minWidth){
                this.leftBoxWidth = minWidth
                this.rightBoxWidth = this.mainWidth-minWidth;
              }
              if(this.rightBoxWidth<minWidth){
                this.rightBoxWidth = minWidth;
                this.leftBoxWidth = this.mainWidth-minWidth;
              }
              this.pathRightWidth = this.rightBoxWidth -this.pathRightWidtha - this.pathLeftWidth -20; 
            }
            // 鼠标弹起事件监听
            document.onmouseup=()=>{
              document.onmouseup = null;
              document.onmousemove = null;
            }

          };
        })
      },
      compNewData(folderArr){
        this.thefolderArr = [];
        this.fileArr = [];
        for(let i=0;i<folderArr.length;i++){
          if(folderArr[i].type=='folder'){
            this.thefolderArr.push(folderArr[i])
          }else{
            this.fileArr.push(folderArr[i])
          }
        }
        let newArr = this.thefolderArr.concat(this.fileArr);
        this.allFiles=newArr
      },
      showDir(thePath){
        return new Promise((resolve,reject)=>{
          if(thePath==this.path){
            console.log('路径和上次一样')
            return;
            resolve()
          }
          let path = typeof thePath == 'string'? thePath : this.path;
          // this.dialogVisible=true;
          this.dirLoading=true;
          this.path = path;
          console.log('path:',path);
          
          // 请求后台，获取当前目录的文件数据
          Meteor.call('getCurrentFile',path,(err,rel)=>{
            if(err){
              resolve(false)
            }
            this.dirLoading=false;
            console.log('err22,rel:',err,rel);
            let {treeArr,folderArr} = rel;
            console.log('treeArr,folderArr:',treeArr,folderArr)
            // this.allFiles = rel;
            this.compNewData(folderArr)
            resolve(true)
            // 更新树的children节点
            // 方法1：官方方法，根据node-key 属性，更新节点的子元素children
            let newChildArr = treeArr[0].children
            this.$nextTick(() => {
                this.$refs['dirTree'].updateKeyChildren(path,newChildArr);
                this.currentPathArr = this.path.split(this.theSep);
            })
            
            // 方法2：自己实现
            // let myAddNode =()=>{
            //   let newTreeArr = treeArr[0]; 
            //   // 保持原有的树结构不变，然后将最新的数据插入到原来的数据中
            //   // 循环找到该节点，插进去
            //   for(let i=0;i<this.treeData.length;i++){
            //     let nodeName = this.treeData[i].filedir;
            //     let backName = newTreeArr.filedir;
            //     // 是否相等
            //     if( backName== nodeName){
            //       console.log('第一次找到了：',nodeName);
            //       this.realFa = this.treeData;
            //       this.realSonIndex = i;
            //     }
            //     else if(backName.includes(nodeName)){
            //       console.log('还没找到，循环儿子');
            //       let newFa = this.treeData[i].children;
            //       this.loopFindInSon(newFa,backName)
            //     }
            //   }
            //   //最后找到了
            //   console.log('rel-Fa:',this.realFa,this.realSonIndex);
            //   // 将最新的数据插入
            //   this.realFa.splice(this.realSonIndex,1,newTreeArr);
            //   resolve(true)
            // }
            // myAddNode()
          })
        })
      },
      loopFindInSon(newArr,backName){
        console.log('loopFindInSon-1:',newArr,backName)
        for(let i=0;i<newArr.length;i++){
            let nodeName = newArr[i].filedir;
            // 是否相等
            if( backName== nodeName){
              console.log('第nn次找到了：',i);
              this.realFa = newArr;
              this.realSonIndex = i;
              break;
            }
            else if(backName.includes(nodeName)){
              console.log('还nn没找到，循环儿子');
              let newFa = newArr[i].children;
              this.loopFindInSon(newFa,backName)
            }
          }
      },
      sureMenu(){
        console.log('sureMenu-11')
      },
      sureFun(){
          let filePath = event.target.value;
          console.log('sureFun11',filePath)
      },
      blurDir(){
          console.log('blurDir22')
      },
      exportLog() {
          console.log("imp-log:");
          // 清空上次选中
          document.getElementById("videoFormLog") &&
              document.getElementById("videoFormLog").reset();
          this.$refs.exportLogRef.click();
      },
      handleNodeClick(data) {
        // 保存当前节点
        this.currentNode = JSON.parse(JSON.stringify(data));
        let sonPath = data.filedir;
        console.log('handleNodeClick',data,sonPath);
        // 如果本地点击的节点的路径和上一次的相同，则不触发
        if(sonPath == this.path){
          console.log('和上一次相同')
          return;
        }
        this.showDir(sonPath)
      }
    }
  };
</script>

<style scoped>
  .mainBox{
    /* margin-bottom: 10px; */
    overflow: hidden;
  }
  .subPathIcon{    
    position: relative;
    top: -5px;}
  .subPath{
    cursor: pointer;
    max-width: 80px;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .epsText{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .leftTree{
    position: relative;
    height: 350px;
    background-color: #ccc;
    float: left; 
    /* width: 150px; */
    padding: 5px 8px 5px 5px;
  }
  .leftLine{
    position: absolute;
    right: 0;
    top: 0;
    width: 3px;
    background-color: #fff;
    border: 1px solid #ccc;
    cursor: ew-resize;
    height: 100%;
  }
  .leftTreeInner{
    background-color: #fff;
    overflow: auto;
    height: 340px;
  }
  .rightContent{
    /* width: calc(100% - 160px); */
    float: left;
    height: 350px;
    padding: 10px; background: #eee;
  }
  .folderWrap{
    margin-top: 10px;
    height: 290px;
    overflow-y: auto;
  }
  .folderWrap ul{
     display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .folderWrap li{
    cursor: pointer;
    padding: 0 5px;
    width: 80px;
    /* height: 60px; */
    margin: 10px 0;
    text-align: center;
  }
  /deep/ .el-dialog__body{
    padding: 0 20px;
  }
  .font18{
    font-size: 18px;
  }
  .folder{
    font-size: 36px;
    color: burlywood;
  }
  .smIcon{
    color: burlywood;
  }
  .imgIcon{
    font-size: 36px;
    color: #b087de;
  }
  .file{
    font-size: 36px;
  }
  .thepath{
    text-align: left;
    /* display: flex; */
    height: 30px;
    padding: 5px 0;
    background-color: #eee;
    border-bottom: 1px solid #ccc;
  }
  .pathL{
    width: 90px;
    float: left;
  }
  .pathR{
    overflow: hidden;
    float: left;
    /* border: 1px solid; */
    height: 20px;
    line-height: 20px;
  }
  .pathR1{
    float: left;
    text-align: center;
    cursor: pointer;
  }
    .header {
        height: 50px;
        line-height: 50px;
        padding: 0 10px;
        font-size: 24px;
        background-color: #383a61;
        color: #fff;
    }
    .textL{
      text-align: left;
    }
    .textR{
      text-align: right;
    }
    /deep/.btn-wrapper-simple{
      height: 25px;
      line-height: 25px;
    }
</style>