<template>
  <div
    v-loading.fullscreen.lock="loading"
    element-loading-text="正在处理..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    class="clearfix wrap"
  >
  <div>
      <el-select v-model="bookname" placeholder="请选择书籍">
        <el-option
          v-for="item in booksList"
          :key="item.bookId"
          :label="item.bookName"
          :value="item.bookName"
        >
        </el-option>
      </el-select>

      <el-input
        class="textarea"
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="textarea"
      >
      </el-input>
      <el-button type="primary" plain class="sendcomment" @click="sendcomment"
        >发表评论</el-button
      >
    </div>
  
    <div
      class="comment"
      v-for="(comment, index) of commentsList"
      :key="index"
      v-show="comment.status != 0"
    >
      <span class="bookname">#{{ comment.bookName }}#</span>
      <el-popconfirm
        title="确认举报吗？"
        v-if="!isAdmin"
        @confirm="report(comment.commentId,comment.readerId)"
      >
        <el-button  size="mini" type="danger" class="report" slot="reference" 
          >举报</el-button
        >
      </el-popconfirm>
       <el-popconfirm
        v-else
        title="确认删除吗？"
        @confirm="delComment( comment.commentId)"
      >
        <el-button size="mini" type="danger" class="report" slot="reference" 
          >删除</el-button
        >
      </el-popconfirm>
       
      <el-badge :value="comment.praise" class="praise">
        <el-button
          size="mini"
          @click="addpraise(comment.commentId)"
          >点赞+1</el-button>
      </el-badge>
      <div class="reader">{{ comment.readerName }}</div>
      <div class="time">{{ comment.date }}</div>
      <div class="content">{{ comment.content }}</div>
      <div>{{ comment.prise }}</div>
      <el-divider></el-divider>
    </div>
  
  </div>
</template>

<script>
import { mapState } from "vuex";
import { addComment, addPraise, reportComment,auditComment } from "@/api";
import qs from "qs";
import axios from 'axios';
export default {
  name: "Comment",

  data() {
    return {
      loading: false,
      textarea: "",
      bookname: "",
      amount:0,
      person:'',
      maxamount:0,
      maxperson:''
    };
  },
  computed: {
    ...mapState({
      commentsList(state) {
        return state.Comments.commentsList;
      },
      booksList(state) {
        return state.Books.booksList;
      },
      readerId(state) {
        return state.User.readerInfo.readerId;
      },
      adminName(state) {
        return state.User.adminName;
      },
      isAdmin(state) {
        return state.User.isAdmin;
      },
    }),
  },
  methods: {
    sendcomment() {
      this.loading = true;
      // if(this.isAdmin){
      //   var dataObj = {
      //     readerId: this.adminName,
      //     bookId: this.bookId,
      //     content: this.textarea,
      //   };
      // }else{
      //    var dataObj = {
      //   readerId: this.readerId,
      //   bookId: this.bookId,
      //   content: this.textarea,
      // };
      // }
      // console.log(this.bookId,this.textarea,'321')
      if(!this.bookname ){
        this.loading = false;
       alert('请输入书名和评论！')
        return
      }else if(!this.textarea){
        this.loading = false;
       alert('请输入书名和评论！')
        return
      }else{
        // let {this.bookname,this.textarea}=dataObj
        let dataObj={
          readName:this.adminName,
          bookName:this.bookname,
          content: this.textarea,
        }
        addComment(qs.stringify(dataObj)).then(
                (res) => {
                  this.loading = false;
                  this.$message({
                    showClose: true,
                    message: res.msg,
                    type: "success",
                  });
                  console.log(res);
                  this.$store.dispatch("initCommentsList");
                  this.textarea = "";
                  this.bookId = "";
                },
                (err) => {
                  this.loading = false;
                  console.log(err.message);
                }
            );
      }

     
      
    },
    addpraise(commentId) {
      addPraise(qs.stringify({ commentId })).then(
        (res) => {
          // console.log(res);
          this.$store.dispatch("initCommentsList");
        },
        (err) => {
          console.log(err.message);
        }
      );
    },
    report(commentId) {
      this.loading = true;
      console.log(commentId,readerId);
      reportComment(qs.stringify({ commentId,reporterId:this.readerId })).then(
        (res) => {
          this.loading = false;
          this.$message({
            showClose: true,
            message: res.msg,
            type: "success",
          });
          console.log(res);
    this.$store.dispatch('initStuReport',{readerId:this.readerId})

        },
        (err) => {
          this.loading = false;
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
    mounted(){
    this.$store.dispatch('initCommentsList')
    // axios({//获取评论数量
    //   url:'/api/amount',
    //   method:'post'
    // }).then(res=>{
    //   console.log(res.data.data[0].mytotal);
    //   this.amount = res.data.data[0].mytotal
    // })
    // -----
    // axios({//获取评论最多的人员
    //   url:'/api/amountmax',
    //   method:'post'
    // }).then(res=>{
    //   // console.log(res.data.data[0].mytotal);
    //   // this.maxamount = res.data.data[0].amount
    //   // this.maxperson = res.data.data[0].readerName
    // })
    }
  }
</script>

<style lang="less" scoped>
.wrap {
  position: relative;
  .comment {
    margin-top: 30px;
    position: relative;
    .bookname {
      // float: left;
      color: rgb(97, 90, 90);
    }
    .report {
      float: right;
      margin-left: 20px;
      //   margin-right: 30%;
    }
    .praise {
      float: right;
      //   margin-left: 60%;
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
    .content {
      text-indent: 2em;
      color: #f56c6c;
    }
  }
  .textarea {
    // position: absolute;
    margin-top: 20px;
  }

  .sendcomment {
    margin-top: 20px;
    // position: absolute;
    // right: 0;
    margin-left: 88%;
  }
}
</style>