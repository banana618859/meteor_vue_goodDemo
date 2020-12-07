<template>
  <div style="height: 100%;display: flex;flex-direction:column;">
    <div style="display: flex;">
      <div>
        功能测试页面
        <el-button size="mini" type="primary" @click="addSonPageTwo">添加页面</el-button>
      </div>
      <div style="text-align: left; flex: 1;padding-left: 10px;border-left: 5px solid #cccccc;margin-left: 10px;">
        <el-button
          v-for="(item,index) in allPageMin" 
          :key="item.id+index"
          size="mini" type="primary" @click="showOnePage(item,index)">
          {{item.name}}
        </el-button>
      </div>
    </div>
    
    <!-- 所有新增页面 -->
    <div id="pageInner" style="position: relative; width: 100%;height: 100%; border: 1px solid red;">
      
      <div
        v-for="(item,index) in allPage" 
        :key="item.id+index"  
        class="sonPage" 
        :id="item.id"
        style="display: flex; flex-direction: column;"
        :style="{zIndex: item.zIndex,left: item.left+'px',top: item.top+'px',width: item.width, height: item.height}">

          <p class="circle-title" :data-faid="item.id" style="cursor: move; overflow: hidden;">
            <span style="float: right;cursor: pointer;">
              <i class="el-icon-minus" style="margin-right: 5px;" @click="minBox(item)"></i>
              <i class="el-icon-plus" style="margin-right: 5px;" @click="maxBox(item)"></i>
              <i class="el-icon-close" @click="delOneBox(item.id)"></i>
            </span>
            {{item.name}}
          </p>
          <div class="circle-body" style="flex: 1;">
            <el-table :data="allPerson" border size="mini">
              <el-table-column label="序号" type="index" width="50"></el-table-column>
              <el-table-column label="姓名" width="120" prop="name">  
              </el-table-column>             
              <el-table-column label="性别" width="150" prop="sex">
              </el-table-column>
              <el-table-column label="年龄" width="120" prop="age"></el-table-column>
              </el-table-column>                
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button @click="onEditRow(scope.row)" type="text" size="small">编辑</el-button>
                  <el-button @click="onDelRow(scope.row,allPerson)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
          </el-table>
          </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { util } from "/imports/js/util.js";
  export default{
    data(){
      return{
        allPage: [],
        baseLeft: 200,
        offsetLeft: 200,
        offsetTop: 88,
        allPageMin: [],
        allBoxPage: [],
        allPerson: [
        {
            name: 'tom',
            sex: '男',
            age: 10
          },
          {
            name: 'jerry',
            sex: '女',
            age: 12
          }
        ]
      }
    },
    methods:{
      showOnePage(boxObj,index){
        this.allPageMin.splice(index,1);

        let hasOne=false;
        for(let i=0;i<this.allPage.length;i++){
          if(this.allPage[i].name == boxObj.name){
            hasOne = true;
            break;
          }
        }
        if(!hasOne){
          this.allPage.push(boxObj)
        }
      },
      minBox(boxObj){
        console.log('min-boxObj:',boxObj)
        boxObj.width = 600+'px';
        boxObj.height = 300+'px';
        boxObj.left = 10;
        boxObj.top = 10;
        // 从页面删除
        for(let i=0;i<this.allPage.length;i++){
          if(this.allPage[i].name == boxObj.name){
            this.allPage.splice(i,1);
            break;
          }
        }

        // 存起来
        let hasOne=false;
        for(let i=0;i<this.allPageMin.length;i++){
          if(this.allPageMin[i].name == boxObj.name){
            hasOne = true;
            break;
          }
        }
        if(!hasOne){
          this.allPageMin.push(boxObj)
        }
        this.allBoxPage = [...this.allPage, ...this.allPageMin]
      },
      maxBox(boxObj){
        boxObj.width = '98%';
        boxObj.height = '98%';
        boxObj.left = 10;
        boxObj.top = 10;
      },
      onEditRow(row){
        console.log('onEditRow:',row)
      },
      onDelRow(row){
        console.log('onDelRow:',row)
      },
      getBox(id){
        for(let i=0;i<this.allPage.length;i++){
          if(this.allPage[i].id == id){
            return this.allPage[i];
          }
        }
      },
      delOneBox(id){
        console.log('delOneBox:',id)
        for(let i=0;i<this.allPage.length;i++){
          if(this.allPage[i].id == id){
            this.allPage.splice(i,1);
            console.log('this.allPage:',this.allPage)
            break;
          }
        }
        this.allBoxPage = [...this.allPage, ...this.allPageMin]
      },
      addSonPageTwo(){
        console.log('addSonPageTwo')
        let pageId = Date.now();
        let newName = util.getNewName(this.allBoxPage,'name','新页面')
        let pageObj = {
          id: pageId,
          name: newName,
          width: '35%',
          height: '20%',
          left: this.baseLeft+ this.allPage.length*10,
          top:  this.baseLeft+ this.allPage.length*10,
          zIndex: this.allPage.length
        }
        this.allPage.push(pageObj)
        this.allBoxPage = [...this.allPage, ...this.allPageMin]
        // this.$forceUpdate();
      },
      addSonPage(){
        
      },
      
    },
    mounted(){
      console.log('util:',util)
      this.$nextTick(()=>{
        $('body').on('mousedown','.circle-title',(e)=>{
          let boxObj = document.getElementById('pageInner').getBoundingClientRect();
          this.offsetLeft = boxObj.x;
          this.offsetTop = boxObj.y;
          console.log('boxObj:',boxObj,this.offsetLeft,this.offsetTop)

          let boxRecObj = e.target.getBoundingClientRect(); 
          let boxId = e.target.dataset.faid;
          console.log('按下事件:', boxId,boxRecObj,this.offsetLeft,this.offsetTop);
          let startLeft = e.clientX;
          let startTop  = e.clientY;
          let leftGap = startLeft- boxRecObj.x + this.offsetLeft;
          let topGap  = startTop - boxRecObj.y + this.offsetTop;
          
            // 按下-移动
          document.onmousemove = ((e)=>{
            let lastLeft = e.clientX;
            let lastTop  = e.clientY;
            let moveLeft = lastLeft - startLeft - leftGap;
            let moveTop  = lastTop  - startTop  - topGap;
            // 从数组中找到该box数据
            let currentBox;
            for(let i=0;i<this.allPage.length;i++){
              $('#'+this.allPage[i].id).css('zIndex', this.allPage[i].zIndex);
              if(this.allPage[i].id == boxId){
                currentBox = this.allPage[i];
              }
            }
            if(currentBox){
              currentBox.left += moveLeft;
              currentBox.top  += moveTop;
              $('#'+boxId).css('left',currentBox.left+'px');
              $('#'+boxId).css('top', currentBox.top +'px');

              $('#'+boxId).css('zIndex', this.allPage.length+1);

              // 复位
              startLeft = currentBox.left;
              startTop  = currentBox.top;
            }
            
          })
          // 鼠标弹起
          document.onmouseup = (()=>{
            document.onmousemove = document.onmouseup = null;
          })
        })
      })
    }
  }
</script>

<style scoped>
  .sonPage{
    min-width: 600px;
    min-height: 200px;
    position: absolute;
    background: #ccc;
    z-index: 10;
  }
  .circle-title{
    height: 35px;
    line-height: 35px;
    padding: 0 8px;
    font-size: 16px;
    background-color: #394352;
    color: #eee;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .circle-body{
    padding: 10px;
    font-size: 14px;
    border: 1px solid #394352;
    background: #eee;
    overflow: auto;
  }
</style>