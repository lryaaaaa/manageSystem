<template>
  <div>
    <el-table
    :data="orderList"
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
      label="账户"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="addressee"
      label="收件人"
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
          @confirm="SubmitOrder(scope.$index, scope.row)"
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
  <el-dialog
        :visible.sync="showDialog"
            title="修改订单信息"
            width="400px"
        >
        <el-form
        :model="modifys" 
            label-width="100px"
            class="goods-form">
          <el-form-item label="更改项" prop="cate">
		  <el-select v-model="modifys.cate" placeholder="请选择">
			<el-option
			 v-for="item in options"
			:key="item.value"
			:label="item.label"
			:value="item.value">
			</el-option>
		  </el-select>
		</el-form-item>
    <el-form-item label="值" prop="val" style="width:250px">
		  <el-input v-model="modifys.val" type="text"></el-input>
		</el-form-item>
        </el-form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="showDialog1">取消</el-button>
                    <el-button type="primary" @click="submit">确定</el-button>
                </span>
            </template>
        </el-dialog>
  </div>
    
</template>

<script>
import {mapState} from 'vuex'
import {submitOrder,ModifyOrder} from '@/api'
import qs from 'qs'
export default {
    name: 'AdminOrders',
    data(){
      return{
        showDialog:false,
        cate:1,
        modifys:{
          cate:'',
          val:''
        },
        options: [{
			value: 1,
			label: '收件人'
		  }, {
			value: 2,
			label: '电话'
		  },{
			value: 3,
			label: '地址'
		  }],
      uid:''
      }
    },
    computed:{
        ...mapState({
            orderList(state){
                return state.Borrows.orders
            }
        })
    },
    methods:{
      SubmitOrder(index,row){
        console.log(index,row);
        let infoObj = {uid:row.uid,bookname:row.bookname}
        submitOrder(qs.stringify(infoObj)).then(res=>{
          console.log(res);
          if(res.status == 200){
              this.$message({
              showClose: true,
              message: "删除人员成功！",
              type: "success",
            });
          }
          this.$store.dispatch('getOrders')

        },err=>{
          console.log(err.message);
        })
      },
      Modify(index,row){
        this.showDialog=true
        // console.log(index,row,'123')
        this.uid=row.uid
      },
      showDialog1(){
        this.showDialog=false
      },
      submit(formName){
        
        this.showDialog=true
        let dataObj={
          cate:this.modifys.cate,
          val:this.modifys.val,
          uid:this.uid
        }
        console.log(dataObj,'3333')
        ModifyOrder(qs.stringify(dataObj)).then(res=>{
          this.showDialog=false
          console.log(res,'123')
          if(res.status == 200){
              this.$message({
              // showClose: true,
              message: "修改成功！",
              type: "success",
            });
          }
          this.$store.dispatch('getOrders')
        })
      }
    },
    mounted(){
    this.$store.dispatch('getOrders')
    }
};
</script>

<style lang="less" scoped>

</style>