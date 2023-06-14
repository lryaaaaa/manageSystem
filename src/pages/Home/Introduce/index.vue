<template>
 <el-descriptions title="管理员信息">
    <el-descriptions-item label="用户名">{{adminName}}</el-descriptions-item>
    <!-- <el-descriptions-item label="用户名">{{adminName}}</el-descriptions-item> -->
    <!-- <el-descriptions-item label="手机号" v-if="!isAdmin">{{readerInfo.readerPhone}}</el-descriptions-item> -->
    <!-- <el-descriptions-item label="邮箱" v-if="!isAdmin">{{readerInfo.email}}</el-descriptions-item> -->
     <el-descriptions-item label="备注" v-if="isAdmin">
      <el-tag size="small">管理员</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="备注" v-else>
      <el-tag size="small">超级管理员</el-tag>
    </el-descriptions-item>
    <!-- <el-descriptions-item label="借书次数" v-if="!isAdmin">{{readerInfo.borrowTimes}}</el-descriptions-item>
    <el-descriptions-item label="逾期次数" v-if="!isAdmin">{{readerInfo.ovdTimes}}</el-descriptions-item> -->
</el-descriptions>

</template>

<script>
import {mapState} from 'vuex'
import qs from 'qs'
import {initReader} from '@/api'
export default {
    name: 'Introduce',
    computed:{
        ...mapState({
            isAdmin(state){
                // console.log(state.User.isAdmin,'1212')
                return state.User.isAdmin
            },
            adminName(state){
                // if(this.isAdmin){
                    return state.User.adminName
                // }else return ''
            },
            readerInfo(state){
                // if(!this.isAdmin)
                return state.User.adminName
                // else 
                // return {}
            }
        })
    },
   mounted(){
    //    if(!this.isAdmin)
    //         initReader(qs.stringify({readerId:this.readerInfo.readerId})).then(res=>{
    //             console.log(res);
    //             this.$store.dispatch('setReaderInfo',res)
    //         },err=>{
    //             console.log(err.message);
                
    //         })
   }
};
</script>

<style lang="less" scoped>

</style>