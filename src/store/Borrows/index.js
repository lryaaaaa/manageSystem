import {initBorrowslist,initBorrows,getOrderList} from '@/api'
// import {initBorrowslist} from '@/api'


const state = {
    // 管理员接收所有记录
  borrowsList:[],
    //读者只接收自己的借阅记录   
  borrows:[],
  orders:[]
}



const actions = {
    initBorrowsList({commit}){
        initBorrowslist().then(res=>{
            console.log(res);
            
        commit('INITBORROWSLIST',res.data)
        },err=>console.log(err.message))
    },
    initBorrows({commit},data){
        console.log('borrow',data);
        initBorrows(data).then(res=>{
            console.log(res);
        commit('INITBORROWS',res.data)
        },err=>{
            console.log(err.message);
        })
    },
    getOrders({commit}){
        getOrderList().then(res=>{
            console.log(res,'123')
            let len1=res.data.rs1.length
            let len2=res.data.rs2.length
            for(let i=0;i<len1;i++){
                Reflect.set(res.data.rs1[i],'goods',[])
                for(let j=0;j<len2;j++){
                    if(res.data.rs1[i].uid===res.data.rs2[j].uid){   
                        res.data.rs1[i].goods.push(res.data.rs2[j])
                    
                    }
                }
            }
            console.log(res.data.rs1)
            commit('INITORDERS',res.data.rs1)
        },err=>{
            console.log(err.message);
        })
    }
}

const mutations = {
    INITBORROWSLIST(state,data){
        // 管理员保存借书记录的数组
        state.borrowsList = data
    },
    INITBORROWS(state,data){
        // 读者保存自己的记录
        state.borrows = data
    },
    INITORDERS(state,data){
        state.orders=data
    }
}

const getters = {

}

export default {
    state,
    actions,
    mutations,
    getters
}