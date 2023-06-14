<template>
	<el-form ref="form" label-width="80px">

		<el-form-item label="上传图片" label-width="80px" >
	<el-col :span="12">
    	<el-input type="file" v-model="avatar" @input="onChange" id="avatar"></el-input>
	  </el-col> 
	  <!-- <img src="url"  alt=""> -->
  </el-form-item>

  <!-- <el-form-item label="商品图片" style="width:500px">
        <el-upload
		  list-type="picture-card"
		  :on-preview="handlePictureCardPreview"
		  :on-change="handleChange"
		  :auto-upload="false"
		  :multiple="false"
		  limit:1
		  action="http://localhost:8080"
		>
		  <i class="el-icon-plus"></i>
		</el-upload>
		<el-dialog :visible.sync="dialogVisible">
		  <img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
      </el-form-item> -->
  <el-form-item label="书籍名称" label-width="80px">
	<el-col :span="12">
    	<el-input v-model="bookName"></el-input>
	  </el-col>
  </el-form-item>
  <el-form-item label="分类" prop="cate" label-width="80px">
	<el-col :span="6">
    	<el-select v-model="cate" placeholder="请选择">
			<el-option v-for="item in options"
			:key=" item.value" :label="item.label" :value="item.value">

			</el-option>
		</el-select>
	  </el-col>
  </el-form-item>
  <el-form-item label="书籍作者" label-width="80px">
	  <el-col :span="6">
    	<el-input v-model="author"></el-input>
	  </el-col>
  </el-form-item>
  <el-form-item label="出版社" label-width="80px">
	  <el-col :span="12">
    	<el-input v-model="press"></el-input>
	  </el-col>
  </el-form-item>
  <el-form-item label="总库存" label-width="80px">
	    <el-col :span="6">
    		<el-input v-model="amount" min="0" type="number"></el-input>
	  </el-col>
  </el-form-item>
  <el-form-item label="定价" label-width="80px">
	    <el-col :span="6">
    		<el-input v-model="price" min="0" type="number"></el-input>
	  </el-col>
  </el-form-item>
 
	 <el-form-item>
	  <el-col :span="6">
    <el-button type="primary" @click="addBook">立即添加</el-button>
		  
	  </el-col>		 
  </el-form-item>
</el-form>
</template>

<script>
import { mapState } from "vuex";
import {addBooks} from '@/api';
import qs from 'qs';
import blob2Base64 from '@/hook';
export default {
	name: 'AdminAddBooks',

  data() {
      return {
		avatar:'',
		bookName: '',
		cate:1,
		author:'',
		amount:'',
        // position: ''
		price:'',
		press:'',
		// maker:''
		url:'',
		options:[
			{
				value:1,
				label:'小说',
			},
			{
				value:2,
				label:'文学',
			},
			{
				value:3,
				label:'百科',
			},
			{
				value:4,
				label:'教辅',
			},
			{
				value:5,
				label:'厨艺',
			},
			{
				value:6,
				label:'童书',
			},
			{
				value:7,
				label:'经济',
			},
			{
				value:8,
				label:'艺术',
			}
		]
      }
    },
 computed: {
    ...mapState({
      booksList(state) {
        return state.Books.booksList;
      }
     
    })
  },
	 methods: {
		onChange(){
			//file小于50kb
			if(avatar.files.length!==0){
			const file=avatar.files[0]
			const reader=new FileReader();
			const base64 = blob2Base64(file)
			base64.then((result)=>{
				this.url=result;
				// console.log(result,'123321')
			})
		}
		},
		
	  addBook(){	

			this.cate=this.options[this.cate-1].label
		  let {url,bookName,cate,author,amount,price,press} = this
		  let infoObj = {url,bookName,author,amount,price,cate,press}
		  addBooks(qs.stringify(infoObj)).then(res=>{
			  console.log(res);
			  if(res.status == 200){
				    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'success',
					});
					this.url='',
					 this.bookName =  '',
					this.author = '',
					this.amount = '',
					this.press =  '',
					this.cate='',
					this.price=''
                    // this.$store.dispatch('initBooksList')

			  }else{
				   this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error',
                    });
			  }
			   
			  
		  },err=>{
			  console.log(err.message);
			  
		  })
	  }
    }
	
};
</script>

<style lang="less" scoped>
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>