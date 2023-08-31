<template>
  <div>
    <el-form :model="form" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="''">
            <el-button @click="setRow">增加</el-button>
            <el-button @click="delRow">删除</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-table class="tableBox" ref="multipleTable"  @selection-change="handleSelectionChange" border height="250px" stripe size="mini" :highlight-current-row="true" :data="list" align="center" :cell-style="myclass" highlight-current-row>
          <el-table-column align="center" type="selection"></el-table-column>
          <el-table-column prop="date" label="序号" type="index" align="center" sortable></el-table-column>
          <template
            v-for="(t,i) in columns"
          >
            <el-table-column
              :key="i"
              align="center"
              :prop="t.name"
              :width="t.width?t.width:'120px'"
              v-if="t.name === 'fpaydate'"
              :label="t.text"
            >
              <template slot-scope="scope">
                <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                <el-date-picker
                  size="mini"
                  style="width: 100%"
                  v-if="!t.sfkgg"
                  value-format="yyyy-MM-dd"
                  v-model="scope.row[t.name]"
                  placeholder="请选择">
                </el-date-picker>
                <span>{{scope.row[t.name]}}</span>
              </template>
            </el-table-column>
            <el-table-column
              :key="i"
              align="center"
              :prop="t.name"
              :width="t.width?t.width:'120px'"
              v-else-if="t.name == 'fannual'"
              :label="t.text"
            >
              <template slot-scope="scope">
                <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                <el-date-picker
                  size="mini"
                  style="width: 100%"
                  v-if="!t.sfkgg"
                  type="year"
                  value-format="yyyy"
                  v-model="scope.row[t.name]"
                  placeholder="请选择">
                </el-date-picker>
                <span>{{scope.row[t.name]}}</span>
              </template>
            </el-table-column>
            <el-table-column
              :key="i"
              align="center"
              :prop="t.name"
              :width="t.width?t.width:'120px'"
              v-else-if="t.name == 'fmonth'"
              :label="t.text"
            >
              <template slot-scope="scope">
                <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                <el-date-picker
                  size="mini"
                  style="width: 100%"
                  v-if="!t.sfkgg"
                  type="month"
                  value-format="yyyy-MM"
                  v-model="scope.row[t.name]"
                  placeholder="请选择">
                </el-date-picker>
                <span>{{scope.row[t.name]}}</span>
              </template>
            </el-table-column>
            <el-table-column
              :key="i"
              align="center"
              :prop="t.name"
              :width="t.width?t.width:'120px'"
              v-else-if="t.name == 'fpayer'"
              :label="t.text"
            >
              <template slot-scope="scope">
                <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                <el-select size="mini" filterable
                           remote
                           :remote-method="remoteMethod"
                           :loading="loading" style="width: 100%" v-if="!t.sfkgg" v-model="scope.row[t.name]"
                           placeholder="请选择">
                  <el-option
                    v-for="(item, index) in userList"
                    :key="index"
                    :label="item.fenglishname"
                    :value="item.fenglishname">
                  </el-option>
                </el-select>
                <span>{{scope.row[t.name]}}</span>
              </template>
            </el-table-column>
            <el-table-column
              :key="i"
              align="center"
              :prop="t.name"
              v-else
              :width="t.width?t.width:'120px'"
              :label="t.text"
            >
              <template slot-scope="scope">
                <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 frecamt fpayamt//-->
                <el-input size="mini" v-if="!t.sfkgg" v-model="scope.row[t.name]" clearable/>
                <span>{{scope.row[t.name]}}</span>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {getPaymentList,addPaymentList,deletePaymentList} from '@/api/information/index'
import {getTuserList} from '@/api/basic/index'
import List from '@/components/List'
export default {
  components: {
    List
  },
  props: {
    listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      list: [],
      form: {},
      userList: [],
      multipleSelection: [],
      loading: false,
      columns: [
        { text: '支付日期', name: 'fpaydate' },
        { text: '所属月份', name: 'fmonth'},
        { text: '支付金额', name: 'fpaymentamount' },
        { text: '支付人', name: 'fpayer' },
        { text: '年度', name: 'fannual' },
      ],
    }
  },
  mounted() {
    this.getUsersArray()
    if (this.listInfo) {
      this.form = this.listInfo
      this.fetchData({ fannual: this.form.fannual, femp: this.form.fposition, fmonth: this.form.fmonth, fbonustype: 0 })
    }
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        this.getUsersArray({ fname: query })
      } else {
        this.userList = [];
      }
    },
    getUsersArray(val = {}, data = {
      pageNum: 1,
      pageSize: 10
    }) {
      getTuserList(data, val).then(res => {
        if (res.flag) {
          this.loading = false;
          this.userList = res.data.records
        }
      });
    },
    myclass({ row, columnIndex }) {
      if (row[columnIndex] && !row[columnIndex].sfcb && row[columnIndex].sfcb != null ) {
        return "color: red";
      }
    },
    setRow() {
      var itemObj = {
        sfkgg: true,
        sfcb: null,
        fpaydate: "",
        fmonth: "",
        fpaymentamount: "",
        fannual: "",
        fpayer: "",
        fbonustype: 0,
      }
      console.log(itemObj)
      if(this.list == null){
        this.list = []
      }
      this.list.push(itemObj)

    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    delRow() {
      let array = []
      if(this.multipleSelection.length>0){
        this.multipleSelection.forEach((item)=>{
          if(item.fid){
            array.push(item.fid)
          }else{
            this.list.splice(item)
          }
        })
        deletePaymentList(array).then(res => {
          if(res.flag){
            this.fetchData()
          }
        })
      }else{
        this.$message({
          message: "请选择删除项",
          type: 'error'
        });
      }
    },
    // 监听每页显示几条
    handleSize(val) {
      this.list.size = val
      this.fetchData()
    },
    // 监听当前页
    handleCurrent(val) {
      this.list.current = val
      this.fetchData()
    },
    fetchData(val={fbonustype: 0}, data = {
      pageNum: 1,
      pageSize: 1000
    }) {
      this.loading = true
      getPaymentList(data, val).then(res => {
        this.loading = false
        this.list = res.data.records
      })
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          addPaymentList(this.list).then(res => {
            this.$emit('hideDialog', false)
            this.$emit('uploadList')
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
  .tableBox {
    margin-bottom: 20px;
  }

  /* 通过显隐控制input框的状态 */
  .tableBox .el-input {
    display: none;
  }

  .tableBox .current-row .el-input {
    display: block;
  }

  .tableBox .current-row .el-input + span {
    display: none;
  }

  /* 通过显隐控制input框的状态 */
  .tableBox .el-select {
    display: none;
  }

  .tableBox .current-row .el-select {
    display: block;
  }

  .tableBox .current-row .el-select + span {
    display: none;
  }
</style>
