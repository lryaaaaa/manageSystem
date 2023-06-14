<template>
    
    <div>
    <h1 class="title">添加管理员账号</h1>
    <form class="form">
            <input type="text" placeholder="User" class="input" v-model="name"/>
            <br>
            <input type="password" placeholder="Password" class="input" v-model="password" />
            <br>
            <p v-if="isAdmin">你没有权限添加</p>
            <el-button class="btn" v-else @click="Enroll()">注册</el-button>
        </form>
    </div>
    
</template>

<script >
import {mapState} from 'vuex'
import qs from 'qs';
import {register} from '@/api'
export default({
    name:'Addadmin',
    data(){
        return{
            name:'',
            password:''
        }
    },
    computed:{
        ...mapState({
            isAdmin(state){
                // console.log(state.User.isAdmin,'1212')
                return state.User.isAdmin
            }
        })
    },
    methods:{
        Enroll(e){
          
                let dataObj={
                name:this.name,
                password:this.password
            }
            register(qs.stringify(dataObj)).then(res=>{
                if(res.status===200){
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'success',
					});
                }
            })
            
            
        }
    },

})
</script>

<style lang="less" scoped>
input{
    width:200px;
    margin: 10px 0 ;
    height: 30px;
}
.form{
    text-align: center;
}
.btn{
    border-color: red;
    border-radius: 5px;
}
</style>