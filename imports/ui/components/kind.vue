<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-03-19 08:44:05
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-03-19 09:22:04
 -->
<template>
    <div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column fixed prop="title" label="Title" width="250">
            </el-table-column>
            <el-table-column prop="url" label="Url" width="300">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: []
            }
        },
        created(){
            this.tableData = Posts.find().fetch()
        },
        methods:{}
    }
</script>
<style>
</style>