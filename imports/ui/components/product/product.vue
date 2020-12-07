<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2019-12-26 00:20:01
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-12-07 14:25:09
 -->
<template>
    <div>
        <p>
            <Loading></Loading>
        </p>
        <p>
            <el-button @click="callServer" type="primary">12触发服务器方法-10s后，服务器再调用前端方法</el-button>
        </p>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="age" label="内容">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>

    export default {
        created() {
            Meteor.ClientCall.methods({
                'testClient': function (username, message) {
                    console.log('testClient:', username, message)
                    return 'good server123';
                }
            });
        },
        methods: {
            callServer() {
                Meteor.call('test', 10000, (err, rel) => {
                    console.log("err,rel:", err, rel)
                })
            }
        },
        data() {
            return {
                tableData: []
            }
        },
        meteor: {
            // Subscriptions - Errors not reported spelling and capitalization.
            $subscribe: {
                'message': []
                // 'post': [],
                // 'othermsg': ''
            },
            // A helper function to get the current time
            // currentTime () {
            //   console.log('Calculating currentTime',posts);
            //   // var t = Time.findOne('currentTime') || {};
            //   return 'asdfas'+posts;
            // },
            message() {
                // {sort: { _id: -1 }, limit: 1 }
                let msg = message.find({}).fetch()
                console.log('message--change', msg);
                this.tableData = msg
            }
        }
    }
</script>
<style>
</style>