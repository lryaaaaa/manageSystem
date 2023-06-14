<template>
    
    <div>
        <el-input
      placeholder="请输入您要搜索评论的相关的书名"
      prefix-icon="el-icon-search"
      @keyup.enter.native="searchComment"
      @blur="clear"
      v-model.lazy="name"
    >
    </el-input>
    <div style="height: 30px;"></div>
    <el-input
      placeholder="请输入您要搜索订单的账号"
      prefix-icon="el-icon-search"
      @keyup.enter.native="searchOrder"
      @blur="clear"
      v-model.lazy="order"
    >
    </el-input>
    <div style="height: 30px;"></div>
    <el-input
      placeholder="请输入您要搜索用户帐号"
      prefix-icon="el-icon-search"
      @keyup.enter.native="searchUser"
      @blur="clear"
      v-model.lazy="user"
    >
    </el-input>
    <!-- <el-table
    :data="searchComments"
      height="450"
      style="width: 100%"
      v-loading.fullscreen.lock="loading"
      element-loading-text="正在处理..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
    <div class="comment" v-for="(comment,index) of searchComments" :key="index">
      {{ comment.bookName}}

    </div>
    </el-table> -->
    <div class="comment" v-if="name.length>0" v-for="(list,index) of searchList" :key="index">
      <span class="bookname">#{{ list.bookName }}#</span>
      <!-- <span class="bookname" v-else>{{ list.bookName }}</span> -->
      <el-badge :value="list.praise" class="praise" v-if="name.length>0">
        <el-button
          size="mini"
          @click="addpraise(list.commentId)"
          >点赞+1</el-button>
      </el-badge>
      <el-popconfirm
        title="确认删除吗？"
        @confirm="delComment( list.commentId)"
      >
        <el-button size="mini" type="danger" class="report" slot="reference" 
          >删除</el-button
        >
      </el-popconfirm>
      <div class="reader">{{ list.readerName }}</div>
      <div class="time">{{ list.date }}</div>
      <div class="content">{{ list.content }}</div>
    </div>
    <el-table
    :data="searchList" v-if="order.length>0"
    style="width: 100%"
    :default-sort = "{prop: 'readerName', order: 'descending'}"
    >
    <el-table-column
      prop="uid"
      label="订单编号"
      sortable
      width="100">
    </el-table-column>
    <el-table-column
      prop="content"
      label="内容"
      sortable
      width="100">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      sortable
      width="100">
    </el-table-column>
    <el-table-column
      prop="account"
      label="账号"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="count"
      label="件数"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="phone"
      sortable
      label="电话"
      >
    </el-table-column>
    <el-table-column
      prop="total"
      sortable
      label="价格"
      >
    </el-table-column>
    <el-table-column
      prop="status"
      sortable
      label="订单状态"
      >
      <!-- <el-button>修改</el-button> -->
    </el-table-column>
    <el-table-column
      label="操作"
      ><template slot-scope="scope">

       <el-popconfirm
          title="确认提交该订单吗？"
          @confirm="delPerson(scope.$index, scope.row)"
        >
          <el-button
            size="mini"
            type="danger"
            slot="reference"
            >提交订单</el-button
          >
          
        </el-popconfirm>
        <el-popconfirm
          title="确认修改该订单吗？"
          @confirm="Modify(scope.$index, scope.row)"
        >
          <el-button
            size="mini"
            type="primary"
            slot="reference"
            >修改订单</el-button
          >
          
        </el-popconfirm>
      </template>

    </el-table-column>
        
  </el-table>
  <p v-if="order.length>0">注：订单状态 0为用户已付款，1为用户已确认，2为订单已提交，请不要重复操作</p>
    </div>
    
</template>

<script>
import { mapState } from "vuex";
import { addPraise,auditComment, searchBookComment,searchOrders } from "@/api";
import qs from "qs";
export default {
  name: "SearchComment",
  data() {
    return {
      loading: false,
      name: "",
      order:'',
      searchList: [],
      user:''
    };
  },
  methods: {
    searchComment(e) {
      this.loading = true;
      // console.log(this.name,'321')
      searchBookComment(qs.stringify({ name: this.name })).then(
        (res) => {
          this.loading = false;
          // console.log(res.data,'111')
          e.target.blur();
        //   this.flag = 1;
          this.searchList = res.data;
          // this.name=''
          // console.log(res);
          if (res.status == 0) {
            this.$message({
              showClose: true,
              message: "未找到相关书籍的评论！",
              type: "error",
            });
          }
        },
        (err) => {
          this.loading = false;
          console.log(err.message);
        }
      );
    },
    clear() {
    //   this.flag = 0;
      this.searchList = [];
    },
    searchOrder(e){
      this.loading = true;
      let dataObj={
        account:this.order
      }
      searchOrders(qs.stringify(dataObj)).then(res=>{
        this.loading = false;
        console.log(res,'123')
        e.target.blur();
        if(res.status===0){
          this.$message({
              showClose: true,
              message: "该号码未有订单！",
              type: "error",
            });
        }
        else{
          this.searchList = res.data;
        }
      })
    },
    addpraise(commentId) {
      addPraise(qs.stringify({ commentId })).then(
        (res) => {
          // console.log(res);
          // this.$store.dispatch("initCommentsList");
          searchBookComment(qs.stringify({ name: this.name })).then(
            (res)=>{
              // e.target.blur();
              this.searchList = res.data;
            }
          )
        },
        (err) => {
          console.log(err.message);
        }
      );
    },
    delComment(commentId){
       this.loading = true
            let infoObj = {commentId:commentId}
            auditComment(qs.stringify(infoObj)).then(res=>{
              // console.log(res,'//////')
            this.loading = false
                this.$message({
                       showClose: true,
                       message: '删评成功！',
                       type: 'success',
                   });
                console.log(res);
          this.$store.dispatch('initCommentsList')
            },err=>{
            this.loading = false
                console.log(err.message);
            })

    }
    
  },
  computed: {
    ...mapState({
      // booksList(state) {
      //   // console.log(state.Books.booksList,'121')
      //   return state.Books.booksList;
      // },
      // readerId(state) {
      //   return state.User.readerInfo.readerId;
      // },
      // isAdmin(state) {
      //   return state.User.isAdmin;
      // },
    }),
  },
  mounted() {
    // this.$store.dispatch('initBooksList')
    // console.log(this.searchBooks);
  },
};
</script>

<style lang="less" scoped>
.comment {
    margin-top: 30px;
    position: relative;
  }
  .report,.praise{
    float: right;
    margin-right: 30px;
  }
  // .praise{
  //   float: right;
  // }
  .bookname {
      // float: left;
      color: #615a5a;
    }
    .time {
      font-family: inherit;
      font-style: italic;
      font-size: small;
      color: #79cde2;
      margin: 10px;
    }
    .reader {
      font-style: italic;
      font-family: Arial;
      color: rgb(48, 138, 138);
      position: absolute;
      bottom: 5px;
      right: 50px;
    }
    
</style>