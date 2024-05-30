<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'规则名称'" prop="ruleId">
            <el-select
              size="mini"
              @change="changeUser"
              style="width: 100%"
              v-model="form.ruleId"
              placeholder="请选择">
              <el-option
                v-for="item in userList"
                :key="item.id"
                :label="item.ruleName"
                :value="item.ruleType">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-if="isOrder">
        <el-col :span="8">
          <el-form-item :label="'日期'" style="display: inline-block">
            <el-date-picker
              style="width: auto"
              v-model="value"
              type="daterange"
              :picker-options="pickerOptions"
              range-separator="至"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'单据类型'" prop="Ftrantype">
            <el-select
              size="mini"
              style="width: 100%"
              v-model="form.Ftrantype"
              placeholder="请选择">
              <el-option
                v-for="item in tranType"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="aliasNumber">
            <el-input v-model="form.FName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-else>
        <el-col :span="12">
          <el-form-item :label="aliasNumber">
            <el-input v-model="form.FNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="aliasName">
            <el-input v-model="form.FName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'打印信息'">
            <el-button @click="calculate('form')">搜索</el-button>
            <el-button @click="saveData('form')">生成条码</el-button>
            <el-button @click="confirmData('form')">打印条码</el-button>
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
          <el-table-column
            type="selection"
            width="50">
          </el-table-column>
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
          <el-table-column
            label="操作"
            align="center"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
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
import {print1, print2, print3, print4} from '@/tools/doPrint'

export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
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
        ruleId: 11,
        FName: null,
        FNumber: null,
        FModel: null,
        Ftrantype: null,
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
      },],
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
    this.aliasNumber = '项目名称'
    this.getUsersArray()

    /*this.fetchData({ftype: 1})*/
    if (this.listInfo) {
      this.form = {...this.listInfo}
      //this.getBarcodePrint(this.listInfo.id)

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
    calculate() {
      this.list = []
      if (this.form.ruleId == 1 || this.form.ruleId == 5) {
        this.fetchData();
      } else if (this.form.ruleId == 11 || this.form.ruleId == 12 || this.form.ruleId == 13 || this.form.ruleId == 14) {
        this.fetchData2();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    async changeUser(val) {
      console.log(val)
      if (val == 1 || val == 5) {
        this.columns = [
          {text: '打印数量', name: 'printNum', sfkgg: true},
          {text: '物料名称', name: 'FName'},
          {text: '物料编码', name: 'FNumber'},
          {text: '全名称', name: 'FFullName'},
          {text: '规格型号', name: 'FModel'},
          {text: '计量单位', name: 'FUnitName'},
          {text: '单位编码', name: 'FUnitNumber'},
          {text: '批号', name: 'FBatchNo', sfkgg: true},
          {text: '数量', name: 'FAuxQty', sfkgg: true},
          {text: '默认仓库编码', name: 'FDefaultStockNumber'},
          {text: '默认仓库名称', name: 'FDefaultStockName'},
          {text: '库位', name: 'FStockPlace'},
          {text: '制作时间', name: 'FMakeTime'},
          {text: '制作厂家', name: 'fmaker'},
          {text: '模具类别', name: 'FModelType'},
          {text: '批次号', name: 'FBatchNo'}]
        this.isOrder = false;
        this.aliasName = '物料名称'
        this.aliasNumber = '物料编码'
        this.list = []
      } else if (val == 11) {
        this.columns = [
          {text: '打印数量', name: 'printNum', sfkgg: true},
          {text: '单据编号', name: 'FBillNo'},
          {text: '单据行号', name: 'FEntryID'},
          {text: '日期', name: 'Fdate'},
          {text: '物料编码', name: 'FItemNumber'},
          {text: '物料名称', name: 'FItemName'},
          {text: '型号', name: 'FModel'},
          {text: '计量单位', name: 'FUnitName'},
          {text: '仓库编码', name: 'FDefaultStockNumber'},
          {text: '仓库名称', name: 'FDefaultStockName'},
          {text: '批号', name: 'FBatchNo', sfkgg: true},
          {text: '数量', name: 'FAuxQty', sfkgg: true},
          {text: '供应商批号', name: 'FSupBatchNo'},
          {text: '净重', name: 'FNetWeight'},
          {text: '供应商生产日期', name: 'FSupDate'},
          {text: '部门', name: 'FDeptName'},
          {text: '计划开工日期', name: 'FPlanCommitDate'},
          {text: '标签编码', name: 'FLabel'}]
        this.aliasNumber = '项目名称'
        this.isOrder = true;
        this.list = []
      } else if (val == 12 || val == 13 || val == 14) {
        this.columns = [
          {text: '打印数量', name: 'printNum', sfkgg: true},
          {text: '单据编号', name: 'FBillNo'},
          {text: '单据行号', name: 'FEntryID'},
          {text: '日期', name: 'Fdate'},
          {text: '物料编码', name: 'FItemNumber'},
          {text: '物料名称', name: 'FItemName'},
          {text: '客户产品编码', name: 'FCustNumber'},
          {text: '客户产品名称', name: 'FCustName'},
          {text: '型号', name: 'FModel'},
          {text: '计量单位', name: 'FUnitName'},
          {text: '仓库编码', name: 'FDefaultStockNumber'},
          {text: '仓库名称', name: 'FDefaultStockName'},
          {text: '批号', name: 'FBatchNo', sfkgg: true},
          {text: '数量', name: 'FAuxQty', sfkgg: true},
          {text: '供应商批号', name: 'FSupBatchNo'},
          {text: '净重', name: 'FNetWeight'},
          {text: '供应商生产日期', name: 'FSupDate'},
          {text: '部门', name: 'FDeptName'},
          {text: '计划开工日期', name: 'FPlanCommitDate'},
          {text: '标签编码', name: 'FLabel'}]
        this.isOrder = true;
        this.aliasNumber = '项目名称'
        this.list = []
      }
    },
    importData() {
      this.visible = true
    },
    getBarcodePrint(val) {
      getBarcodePrintById(val).then(res => {
        if (res.success) {
          this.list = res.data.details
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
      var params = {
        pageSize: '100',
        pageIndex: '1'
      }
      this.form.FNumber != null && this.form.FNumber != '' ? params.number = this.form.FNumber : null
      this.form.FName != null && this.form.FName != '' ? params.name = this.form.FName : null
      this.form.FModel != null && this.form.FModel != '' ? params.model = this.form.FModel : null
      getItemList(params).then(res => {
        this.loading = false
        if (res.success) {
          res.data.forEach((item) => {
            item.printNum = 1;
            item.location = '';
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
      if(this.form.Ftrantype == null){
        return this.$message({
          message: '选择单据类型',
          type: 'error'
        });
      }
      var params = {
        tranType: this.form.Ftrantype,
        billNo: this.form.FName,
        type: 2,
        pageNum: 1,
        pageSize: 100,
      }
      this.value.length == 0? params.startDate = this.value[0] : null
      this.value.length == 0? params.endDate = this.value[1] : null
      queryBillList(params).then(res => {
        this.loading = false
        if (res.success) {
          res.data.list.forEach((item) => {
            item.printNum = 1
            item.barcode = ''
          })
          this.list = res.data.list
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
          var ruleId;
          this.userList.forEach((item) => {
            if(this.form.ruleId == item.ruleType){
              ruleId = item.id
            }
          })
          paramsData.ruleId = ruleId;
          var params = []
          this.multipleSelection.forEach((item) => {
            var barcodePrintDetail = {};
            if (that.form.ruleId == 1 || that.form.ruleId == 5) {
              barcodePrintDetail.time = item.FMakeTime;
              barcodePrintDetail.maker = item.fmaker;
              barcodePrintDetail.modelType = item.FModelType;
              barcodePrintDetail.location = item.location;
              barcodePrintDetail.name = item.FName;
              barcodePrintDetail.number = item.FNumber;
            } else if (that.form.ruleId == 11) {
              barcodePrintDetail.tranType = item.Ftrantype;
              barcodePrintDetail.billNo = item.FBillNo;
              barcodePrintDetail.entryId = item.FEntryID;
              barcodePrintDetail.date = item.FDate;
              barcodePrintDetail.supBatchNo = item.FSupBatchNo;
              barcodePrintDetail.netWeight = item.FNetWeight;
              barcodePrintDetail.supDate = item.FSupDate;
              barcodePrintDetail.deptName = item.FDeptName;
              barcodePrintDetail.planCommitDate = item.FPlanCommitDate;
              barcodePrintDetail.label = item.FLabel;
              barcodePrintDetail.name = item.FItemName;
              barcodePrintDetail.number = item.FItemNumber;
            } else if (that.form.ruleId == 12 || that.form.ruleId == 13 || that.form.ruleId == 14) {
              barcodePrintDetail.tranType = item.Ftrantype;
              barcodePrintDetail.billNo = item.FBillNo;
              barcodePrintDetail.entryId = item.FEntryID;
              barcodePrintDetail.date = item.FDate;
              barcodePrintDetail.custNumber = item.FCustNumber;
              barcodePrintDetail.custName = item.FCustName;

              barcodePrintDetail.supBatchNo = item.FSupBatchNo;
              barcodePrintDetail.netWeight = item.FNetWeight;
              barcodePrintDetail.supDate = item.FSupDate;
              barcodePrintDetail.deptName = item.FDeptName;
              barcodePrintDetail.planCommitDate = item.FPlanCommitDate;
              barcodePrintDetail.label = item.FLabel;
              barcodePrintDetail.name = item.FItemName;
              barcodePrintDetail.number = item.FItemNumber;
            }
            barcodePrintDetail.quantity = item.FAuxQty;
            barcodePrintDetail.model = item.FModel;
            barcodePrintDetail.unitNumber = item.FUnitID;
            barcodePrintDetail.unitName = item.FUnitName;
            barcodePrintDetail.defaultStockNumber = item.FDefaultStockNumber;
            barcodePrintDetail.defaultStockName = item.FDefaultStockName;
            barcodePrintDetail.batchNo = item.FBatchNo;
            barcodePrintDetail.printNum = item.printNum
            params.push(barcodePrintDetail);
          })
          paramsData.details = params;
          printBarcode(paramsData).then(reso => {
            if (reso.success) {
              if(reso.data.data instanceof Array){
                if (that.form.ruleId == 5) {
                  print4(reso.data.data)
                  LODOP.PREVIEW()
                } else if (that.form.ruleId == 14) {
                  print3(reso.data.data)
                  LODOP.PREVIEW()
                } else if (that.form.ruleId == 11) {
                  print1(reso.data.data)
                  LODOP.PREVIEW()
                } else if (that.form.ruleId == 12 || that.form.ruleId == 13) {
                  print2(reso.data.data)
                  LODOP.PREVIEW()
                }
                this.$emit('hideDialog', false)
                this.$emit('uploadList')
              }else{
                that.$message({
                  message: reso.data.msg,
                  type: 'error'
                });
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
          if(this.multipleSelection.length == 0){
            return that.$message({
              message: '无数据',
              type: 'error'
            });
          }
          var ruleId;
          this.userList.forEach((item) => {
            if(this.form.ruleId == item.ruleType){
              ruleId = item.id
            }
          })
          this.multipleSelection.forEach((item) => {
            params.push({
              ruleId: ruleId,
              number: item.FItemNumber || item.FNumber
            })
          })
          createBarcode(params).then(res => {
            var barcode = res.replace(',','').split(',')
            if (barcode.length>0) {
              console.log(barcode)
              barcode.forEach((item, index) => {
                console.log(that.multipleSelection)
                console.log(index)
                if (that.form.ruleId == 1 || that.form.ruleId == 5) {
                  that.multipleSelection[index]['location'] = item
                } else if (this.form.ruleId == 11 ||that.form.ruleId == 12 ||that.form.ruleId == 13 ||that.form.ruleId == 14) {

                  that.multipleSelection[index]['barcode'] = item
                }
              })
            }
            that.multipleSelection.forEach((item) => {
              that.list.forEach((listItem) => {
                if(listItem.id == item.id){
                  listItem.barcode = item.barcode
                }
              })
            })
            console.log(that.list)
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
