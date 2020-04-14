<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2019-12-26 11:12:49
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-04-14 12:06:26
 -->
<template>
    <div class="leftmenu" style="width: 200px; height: 100%;">
        <div class="header">
            目录 <i class="el-icon-folder-opened hand" @click="dialogVisible=true"></i>
        </div>
        <!-- 浏览器打开文件查看器 -->
        <form id="videoFormLog" style="height: 0;">
            <input
            type="file"
            ref="exportLogRef"
            :nwworkingdir="workspace"
            @change="sureFun"
            @blur="blurDir"
            style="filter:alpha(opacity=0);opacity:0;width: 0px;height: 0px;"
            />
        </form>

        <!-- 文件目录 -->
        <el-dialog
        title="File Dir"
        :visible.sync="dialogVisible"
        width="30%">
        <p slot="title" style="text-align: left;">
          File Directory
        </p>
        <p class="thepath">
          Current path: {{currentPath}}
          <span class="fr">
            <i class="el-icon-caret-top font18 hand"></i>
            <i class="el-icon-caret-bottom font18 hand"></i>
          </span>
        </p>
        <!-- <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree> -->
        <div style="padding: 10px; background: #eee;">
          <i class="el-icon-folder font18"></i>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialogVisible = false">Cancel</el-button>
          <el-button size="mini" type="primary" @click="sureMenu">OK</el-button>
        </span>
      </el-dialog>

        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
    
</template>
<script>
  export default {
    data() {
      return {
        currentPath: '/home/code',
        dialogVisible: false,
        workspace: 'C://',
        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
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
          console.log('handleNodeClick',data);
      }
    }
  };
</script>

<style scoped>
  /deep/ .el-dialog__body{
    padding: 0 20px;
  }
  .font18{
    font-size: 18px;
  }
  .thepath{
    text-align: left;
    padding: 5px 10px;
    background-color: #eee;
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
</style>