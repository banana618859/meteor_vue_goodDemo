<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-04-16 10:06:56
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-04-16 10:23:40
 -->
<template>
    <div>
        <!-- <button @click="">
        增加节点
        </button> -->
        <el-tree
            ref="tree"
            :data="treeData"
            node-key="id"
            default-expand-all
            check-strictly
            @node-click="nodeClick"
            :expand-on-click-node="true">
            <span slot-scope="{ data }">
                <span class="pr10">{{ data.name }}</span>
            </span>
        </el-tree>
    </div>
    
</template>

<script>
export default {
    data(){
        return {
            treeData:[{
                "children": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "children": [],
                                        "name": "第四层",
                                        "id": 5
                                    },
                                        {
                                        "children": [],
                                        "name": "添加层级",
                                        "id": 51
                                    },
                                    {
                                        "children": [],
                                        "name": "ss",
                                        "id": 75
                                    }
                                ],
                                "name": "第三层",
                                "id": 3
                            }
                        ],
                        "name": "第二层",
                        "id": 2
                    }
                ],
                "name": "系统",
                "id": 1
            }]
        }
    },
    methods:{
        //加载标签数据
        async nodeClick(data,node){
            console.log('data:',data)
            let result = await this.getData();
            if (result && result.length > 0) {
                this.$nextTick(() => {
                    this.$refs['tree'].updateKeyChildren(data.id,result);
                })
            }
            
        },
        getData(){
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    let node = {
                        'name': 'new one',
                        'id': Date.now()
                    }
                    resolve([node])
                },2000)
            })
        }
    }
}
</script>