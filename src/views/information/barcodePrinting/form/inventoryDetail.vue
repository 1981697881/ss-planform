<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'规则名称'">

            <el-input readOnly v-model="form.ruleName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'打印信息'">
           <!-- <el-button @click="confirmData('form')">打印条码</el-button>-->
            <!--<el-button @click="setRow">增加</el-button>
            <el-button @click="delRow">删除</el-button>-->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-table
          :data="list"
          border
          height="550px"
          stripe
          size="mini"
          class="tableBox"
          @selection-change="handleSelectionChange"
          :highlight-current-row="true">
          <el-table-column
            type="index"
            width="50"
            label="序号"
          >
          </el-table-column>
         <!-- <el-table-column
            type="selection"
            width="50">
          </el-table-column>-->
          <el-table-column
            v-for="(t,i) in columns"
            :key="i"
            align="center"
            :prop="t.name"
            :label="t.text"
          >
            <template slot-scope="scope">
              <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
              <el-input size="mini" v-if="t.sfkgg" v-model="scope.row[t.name]" clearable/>
              <span>{{scope.row[t.name]}}</span>
            </template>
          </el-table-column>
         <!-- <el-table-column
            label="操作"
            align="center"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>-->
        </el-table>
      </el-row>
    </el-form>
  </div>
</template>

<script>import {
  printBarcode,
  createBarcode,
  getBarcodeRuleAll,
  queryBillList,
  getItemList,
  getBarcodePrintById
} from '@/api/information/index'
import {
  getToken
} from '@/utils/auth'
import {print1, print2, print3,} from '@/tools/doPrint'

export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      value: [],
      fileData: {},
      headers: {
        'authorization': getToken('hlrx'),
      },
      fullscreenLoading: false,
      loading: false,
      isUpload: null,
      fileList: [],
      dateParam: [],
      multipleSelection: [],
      fileUrl: this.$store.state.user.url + '/web/expenseDetails/input',
      activeName: 'first',
      form: {
        ruleId: null,
        ruleName: null,
      },
      list: [],
      userList: [],
      columns: [],
      tranType: [{
        id: '85',
        value: '生产任务单',
      }, {
        id: '1',
        value: '外购入库单',
      }, {
        id: '2',
        value: '产品入库单',
      }, {
        id: '41',
        value: '调拨单',
      }, {
        id: '71',
        value: '采购订单',
      }, {
        id: '72',
        value: '收料通知单',
      }, {
        id: '81',
        value: '销售订单',
      }, {
        id: '83',
        value: '发货通知单',
      }, {
        id: '88',
        value: '投料单',
      }],
      postform: {
        name: null,
        start_time: null,
        end_time: null,
      },
      visible: null,
      isOrder: true,
      aliasName: null,
      aliasNumber: null,
      rules: {
        fannual: [
          {required: true, message: '请选择', trigger: 'change'}
        ], femp: [
          {required: true, message: '请选择', trigger: 'change'}
        ]
      }
    }
  },
  async mounted() {
    /*this.fetchData({ftype: 1})*/
    this.getUsersArray();
    if (this.listInfo) {
      this.form = {...this.listInfo}
      this.getBarcodePrint(this.listInfo.id)
    }
  },
  methods: {
    async getUsersArray(val = {}, data = {
      pageNum: 1,
      pageSize: 10
    }) {
      await getBarcodeRuleAll(data, val).then(res => {
        if (res.success) {
          this.loading = false;
          this.userList = res.data
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    async changeUser(val) {
      console.log(val)
      if (val == 1 || val == 5) {
        this.columns = [
          {text: '打印数量', name: 'printNum', sfkgg: true},
          {text: '物料名称', name: 'name'},
          {text: '物料编码', name: 'number'},
          {text: '全名称', name: 'fullName'},
          {text: '规格型号', name: 'model'},
          {text: '计量单位', name: 'unitName'},
          {text: '单位编码', name: 'unitNumber'},
          {text: '默认仓库编码', name: 'defaultStockNumber'},
          {text: '默认仓库名称', name: 'defaultStockName'},
          {text: '库位', name: 'stockPlace'},
          {text: '制作时间', name: 'makeTime'},
          {text: '制作厂家', name: 'maker'},
          {text: '模具类别', name: 'modelType'},
          {text: '批次号', name: 'batchNo'}]
      } else if (val == 11) {
        this.columns = [
          {text: '打印数量', name: 'printNum', sfkgg: true},
          {text: '单据编号', name: 'billNo'},
          {text: '单据行号', name: 'entryID'},
          {text: '日期', name: 'date'},
          {text: '物料编码', name: 'itemNumber'},
          {text: '物料名称', name: 'itemName'},
          {text: '型号', name: 'model'},
          {text: '计量单位', name: 'unitName'},
          {text: '仓库编码', name: 'defaultStockNumber'},
          {text: '仓库名称', name: 'defaultStockName'},
          {text: '批号', name: 'batchNo'},
          {text: '数量', name: 'auxQty'},
          {text: '供应商批号', name: 'supBatchNo'},
          {text: '净重', name: 'netWeight'},
          {text: '供应商生产日期', name: 'supDate'},
          {text: '部门', name: 'deptName'},
          {text: '计划开工日期', name: 'planCommitDate'},
          {text: '标签编码', name: 'label'}]
      } else if (val == 12 || val == 13 || val == 14) {
        this.columns = [
          {text: '打印数量', name: 'printNum', sfkgg: true},
          {text: '单据编号', name: 'billNo'},
          {text: '单据行号', name: 'entryID'},
          {text: '日期', name: 'date'},
          {text: '客户产品编码', name: 'custNumber'},
          {text: '客户产品名称', name: 'custName'},
          {text: '物料编码', name: 'itemNumber'},
          {text: '物料名称', name: 'itemName'},
          {text: '型号', name: 'model'},
          {text: '计量单位', name: 'unitName'},
          {text: '仓库编码', name: 'defaultStockNumber'},
          {text: '仓库名称', name: 'defaultStockName'},
          {text: '批号', name: 'batchNo'},
          {text: '数量', name: 'auxQty'},
          {text: '供应商批号', name: 'supBatchNo'},
          {text: '净重', name: 'netWeight'},
          {text: '供应商生产日期', name: 'supDate'},
          {text: '部门', name: 'deptName'},
          {text: '计划开工日期', name: 'planCommitDate'},
          {text: '标签编码', name: 'label'}]
      }
    },
    importData() {
      this.visible = true
    },
    getBarcodePrint(val) {
      getBarcodePrintById(val).then(res => {
        if (res.success) {
          this.form.ruleId = res.data.ruleId
          var ruleType
          this.userList.forEach((item) => {
            if(this.form.ruleId == item.id){
              ruleType = item.ruleType
            }
          })
          this.changeUser(ruleType)
          this.$nextTick(()=>{
            this.form.ruleName = res.data.ruleName
            this.list = res.data.details
          })
        }
      })
    },
    handleClick(row) {
      this.list.splice(row, 1)
    },
    fetchData(val = {}, data = {
      pageNum: 1,
      pageSize: 50
    }) {
      this.loading = true
      getItemList({
        FNumber: this.form.FNumber,
        FName: this.form.FName,
        FModel: this.form.FModel,
        pageSize: '1',
        pageIndex: '100'
      }).then(res => {
        this.loading = false
        if (res.success) {
          res.data.forEach((item) => {
            item.printNum = 1;
            item.printNum = 1;
          })
          this.list = res.data
        }

      })
    },
    fetchData2(val = {}, data = {
      pageNum: 1,
      pageSize: 50
    }) {
      this.loading = true
      queryBillList({
        Ftrantype: this.form.Ftrantype,
        FBillNo: this.form.FName,
        Type: 2,
        FStartDate: this.value[0],
        FEndDate: this.value[1]
      }).then(res => {
        this.loading = false
        if (res.success) {
          res.data.forEach((item) => {
            item.printNum = 1;
          })
          this.list = res.data
        }
      })
    },
    confirmData(form) {
      var that = this
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          if(this.multipleSelection.length == 0) {
            return that.$message({
              message: '选择打印数据',
              type: 'error'
            });
          }
          var paramsData = {}
          paramsData.ruleId = that.form.ruleId;
          paramsData.details = this.list;
          printBarcode(paramsData).then(reso => {
            if (reso.success) {
              if(reso.data instanceof Object){
                that.$message({
                  message: reso.data.msg,
                  type: 'error'
                });
              }else{
                if (that.form.ruleId == 14) {
                  print3(reso.data)
                  LODOP.PREVIEW()
                } else if (that.form.ruleId == 11) {
                  print1(reso.data)
                  LODOP.PREVIEW()
                } else if (that.form.ruleId == 13) {
                  print2(reso.data)
                  LODOP.PREVIEW()
                }
                this.$emit('hideDialog', false)
                this.$emit('uploadList')
              }
            }
          })
        } else {
          return false
        }
      })
    },
    saveData(form) {
      var that = this
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          var params = []
          if(this.list.length == 0){
            return that.$message({
              message: '无数据',
              type: 'error'
            });
          }
          this.list.forEach((item) => {
            params.push({
              ruleId: this.form.ruleId,
              FNumber: item.FNumber
            })
          })
          createBarcode(params).then(res => {
            if (res.success) {
              res.data.forEach((item, index) => {
                if (that.form.ruleId == 1 || that.form.ruleId == 5) {
                  that.list[index]['location'] = res.data;
                } else if (this.form.ruleId == 11 ||that.form.ruleId == 12 ||that.form.ruleId == 13 ||that.form.ruleId == 14) {
                  that.list[index]['barcode'] = res.data;
                }
              })
            }
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
