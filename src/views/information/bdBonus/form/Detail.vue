<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="first">
        <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item :label="'当前年度'" prop="fannual">
                <el-date-picker
                  v-model="form.fannual"
                  type="month"
                  style="width: 100%"
                  @change="changeFannual"
                  value-format="yyyy-MM"
                  placeholder="年度">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'职员'" prop="femp">
                <el-select
                  size="mini"
                  filterable
                  remote
                  @change="changeUser"
                  :remote-method="remoteMethod"
                  :loading="loading"
                  style="width: 100%"
                  v-model="form.femp"
                  placeholder="请选择">
                  <el-option
                    v-for="item in userList"
                    :key="item.fid"
                    :label="item.fenglishname +'-'+item.fname"
                    :value="item.fenglishname">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'Consultant Name'">
                <el-input v-model="form.fbelongconsultant"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="'入职日期'">
                <el-date-picker
                  v-model="form.fjoindate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                  placeholder="年度">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="'蜜月过渡期截止日期'">
                <el-date-picker
                  v-model="form.fcutoffdate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                  placeholder="年度">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="'结清标记'">
                <el-radio-group style="width: 100%" v-model="form.fkey">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="'是否助理'">
                <el-radio-group style="width: 100%" v-model="form.fisassistant">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="'本年度'">
                <el-button @click="calculate('form')">计算</el-button>
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
              :cell-style="myclass"
              :highlight-current-row="true">
              <el-table-column
                v-for="(t,i) in columns"
                :key="i"
                align="center"
                :prop="t.name"
                :label="t.text"
              >
                <template slot-scope="scope">
                  <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                  <el-input size="mini" v-if="!t.sfkgg" v-model="scope.row[t.name]" clearable />
                  <span>{{scope.row[t.name]}}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="费用明细" name="second">
        <el-form :model="form2" :rules="rules" ref="form2" :size="'mini'">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="''">
                <!--<el-button @click="importData">导入</el-button>-->
                <el-button @click="setRow">增加</el-button>
                <el-button @click="delRow">删除</el-button>
                <el-button @click="saveRow">保存</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-table
              :data="list2"
              border
              height="250px"
              stripe
              size="mini"
              :summary-method="getSummaries"
              show-summary
              ref="multipleTable"
              class="tableBox"
              :cell-style="myclass"
              @selection-change="handleSelectionChange"
              :highlight-current-row="true">
              <el-table-column width="50" align="center" type="selection"></el-table-column>
              <template
                v-for="(t,i) in columns2"
              >
                <el-table-column
                  :key="i"
                  align="center"
                  :prop="t.name"
                  :width="t.width?t.width:'120px'"
                  v-if="t.name == 'finvoicingdate' || t.name == 'fpaymentreceiveddate'|| t.name == 'fentrydate'|| t.name == 'fsecuritydate'"
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
                  v-else-if="t.name == 'femp'"
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
                        v-for="item in userList"
                        :key="item.fid"
                        :label="item.fenglishname +'-'+item.fname"
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
                  :width="t.width?t.width:'120px'"
                  v-else-if="t.name == 'fcandidate'"
                  :label="t.text"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row[t.name]}}</span>
                  </template>
                </el-table-column>
                <!--<el-table-column
                  :key="i"
                  align="center"
                  :prop="t.name"
                  :width="t.width?t.width:'120px'"
                  v-else-if="t.name == 'fcandidate'"
                  :label="t.text"
                >
                  <template slot-scope="scope">
                    &lt;!&ndash;// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //&ndash;&gt;
                    <el-select size="mini" filterable
                               remote
                               :remote-method="remoteMethod"
                               :loading="loading" style="width: 100%" v-if="!t.sfkgg" v-model="scope.row[t.name]"
                               placeholder="请选择">
                      <el-option
                        v-for="item in userList"
                        :key="item.fid"
                        :label="item.fname"
                        :value="item.fname">
                      </el-option>
                    </el-select>
                    <span>{{scope.row[t.name]}}</span>
                  </template>
                </el-table-column>-->
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
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      :visible.sync="visible"
      title="文件"
      v-if="visible"
      :width="'20%'"
      destroy-on-close
      append-to-body
    >
      <el-form ref="postform" :model="postform" :size="'mini'" :rules="rules">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="'上传文件'" >
              <div style="min-height: 28px">
                <el-upload
                  class="upload-demo"
                  accept=".doc,.docx,.pdf,.xls,.xlsx"
                  :action="fileUrl"
                  :headers="headers"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="handleAvatarSuccess"
                  :on-error="uploadError"
                  :before-remove="beforeRemove"
                  multiple
                  name="tExpenseDetails"
                  :data="fileData"
                  :limit="1"
                  ref="upload"
                  :auto-upload="false"
                  :on-change="handleUpload"
                  :on-exceed="handleExceed"
                  :file-list="fileList">
                  <el-button>选择</el-button>
                </el-upload>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" style="text-align:center;">
        <el-button type="primary" @click="submitUpload('form')">上传</el-button>
      </div>
    </el-dialog>
    <!--<div slot="footer" style="text-align:center;">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>-->
  </div>
</template>

<script>
import {getSelectList,addExpenseDetails,deleteExpenseDetails,addRecruitmentBonus,countRecruitmentBonus,getRecruitmentBonusList} from '@/api/information/index'
import { getTuserList, getTTeamList } from '@/api/basic/index'
import {
  getToken
} from '@/utils/auth'
export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      fileData: {},
      headers: {
        'authorization': getToken('ssrx'),
      },
      fullscreenLoading: false,
      loading: false,
      isUpload: null,
      fileList: [],
      multipleSelection: [],
      fileUrl: this.$store.state.user.url + '/web/expenseDetails/input',
      activeName: 'first',
      form: {
        femp: null,
        fannual: null,
        ftype: 1,
        fcutoffdate: null,
        fisassistant: null,
        fjoindate: null,
        fbelongconsultant: null,
        fdesc: null,
      },
      form2: {},
      userList: [],
      columns: [
        {text: '', name: 'title', sfkgg: true},
        {text: 'Calculation', name: 'calculation', sfkgg: true},
        {text: 'Q1', name: 'qOne', sfkgg: true},
        {text: 'Q2', name: 'qTwo', sfkgg: true},
        {text: 'Q3', name: 'qThree', sfkgg: true},
        {text: 'Q4', name: 'qFour', sfkgg: true},
        {text: 'Total', name: 'total', sfkgg: true},
        {text: '填写说明', name: 'remark', sfkgg: true},
      ],
      list: [{
        title: '累计Invoiced Amount',
        calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: '取费用明细已回款的开票总额'
      }, {
        title: '累计Invoiced GP',
        calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: '取费用明细已回款的GP数'
      }, {
        title: '累计回款GP',
        calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: '同上，取费用明细已回款的GP数'
      }, {
        title: '累计计提GP',
        calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: '公式'
      }, {
        title: '累计计提比例',
        calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: '计算：累计回款GP/(过去月份累计+当前月薪*剩余月份）,计完后可修改'
      }, {
        title: '累计可提费用',
        calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: '公式'
      }, {
        title: '担保期内费用',
        calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: '取费用明细汇总'
      }, {
        title: '担保冻结费用',
        calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: ''
      }, {
        title: '过担保期可计提部分',
        calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: '公式'
      }, {
        title: '已发放佣金',
        calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: '自动累计'
      }, {
        title: '本月应计发费用',
        calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: '填写'
      }, {
        title: '累计未计发费用',
        calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: '公式'
      }],
      columns2: [
        {text: '开票日期', name: 'finvoicingdate', width: '150'},
        {text: '发票抬头', name: 'finvoiceheader', width: '150'},
        {text: '年度', name: 'fannual'},
        {text: '候选人', name: 'fcandidate'},
        {text: '职员', name: 'femp'},
        {text: '已到款', name: 'freceivedpayment'},
        {text: 'GP', name: 'fgp'},
        {text: '到款时间', name: 'fpaymentreceiveddate', width: '150'},
        {text: '入职日期', name: 'fentrydate', width: '150'},
        {text: '担保期', name: 'fsecuritydate', width: '150'},
        {text: '成单顾问', name: 'fsingleconsultant'},
        {text: '合同编号', name: 'fcontractnumber'},
        {text: '支付规则', name: 'fpaymentrules'},
        {text: '付款期限', name: 'fpaymentterm'},
        {text: '退款条例', name: 'frefundregulations'},
        {text: '奖金系数', name: 'fbonuscoefficient'},
        {text: '奖金金额', name: 'fbonusamount'},
        {text: '担保期内GP', name: 'fguaranteeperiodgp', width: '150'},
        {text: '担保期内佣金', name: 'fguaranteeperiodfees', width: '150'},
        {text: '备注', name: 'remark'}
      ],
      list2: [],
      postform: {
        name: null,
        start_time: null,
        end_time: null,
      },
      visible: null,
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
    this.getUsersArray()
    /*this.fetchData({ftype: 1})*/
    if (this.listInfo) {
      this.form = this.listInfo
      this.form.femp = this.listInfo.fposition
      this.form.fannual = this.form.fannual+'-01'
      await this.remoteMethod(this.form.femp)
      await this.changeUser(this.form.femp)
    }
  },
  methods: {
    async remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        await this.getUsersArray({fenglishname: query});
      } else {
        this.userList = [];
      }
    },
    async getUsersArray(val = {}, data = {
      pageNum: 1,
      pageSize: 10
    }) {
      await getTuserList(data, val).then(res => {
        if (res.flag) {
          this.loading = false;
          this.userList = res.data.records
        }
      });
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ' '
        } else {
          sums[index] = 'N/A'
        }
      })
      return sums
    },
    handleSelectionChange(val) {

      this.multipleSelection = val
    },
    changeFannual(val){
      /*if (this.listInfo) {*/
     /* this.fetchData({ftype: 1,femp: this.form.femp, fannual: val})*/
      /*}*/
    },
    async changeUser(val) {
      this.userList.forEach((item)=>{
        if(item.fenglishname == val){
          console.log(item)
          this.form.fcutoffdate = item.fcutoffdate
          this.form.fjoindate = item.fjoindate
          this.form.fbelongconsultant = item.fbelongconsultant
          this.form.fisassistant = Number(item.fisassistant)
        }
      })
      /*if (this.listInfo) {*/
      this.fetchData2({ftype: 1,fposition: this.form.femp, fannual: this.form.fannual})
      this.fetchData({ftype: 1,femp: this.form.femp, fannual: this.form.fannual})
      /*}*/
    },
    importData() {
      this.visible = true
    },
    myclass({row, columnIndex}) {
      if (row[columnIndex] && !row[columnIndex].sfcb && row[columnIndex].sfcb != null) {
        return "color: red";
      }
    },
    setRow() {
      var itemObj = {
        finvoicingdate: '',
        finvoiceheader: '',
        fannual: '',
        fcandidate: this.form.femp,
        freceivedpayment: '',
        fgp: '',
        fpaymentreceiveddate: '',
        fsecuritydate: '',
        fteam: '',
        fcontractnumber: '',
        fpaymentrules: '',
        fpaymentterm: '',
        frefundregulations: '',
        fbonuscoefficient: '',
        fbonusamount: '',
        fguaranteeperiodgp: '',
        fguaranteeperiodfees: '',
        fsingleconsultant: '',
        remark: '',
        femp: '',
        ftype: 1,
        sfkgg: true,
        sfcb: null,
      }
      if(this.list2 == null){
        this.list2 = []
      }
      this.list2.push(itemObj)
    },
    delRow() {
      let array = []
      if (this.multipleSelection.length > 0) {
        this.multipleSelection.forEach((item) => {
          if (item.fid) {
            array.push(item.fid)
          } else {
            this.list2.splice(this.list2.indexOf(item), 1)
          }
        })
        if(array.length>0){
          deleteExpenseDetails(array).then(res => {
            if (res.flag) {
              this.fetchData()
            }
          })
        }
      } else {
        this.$message({
          message: "请选择删除项",
          type: 'error'
        });
      }
    },
    saveRow() {
      if (this.list2.length > 0) {
        addExpenseDetails(this.list2).then(res => {
          this.$emit('hideDialog', false)
          this.$emit('uploadList')
        })
      } else {
        this.$message({
          message: "无数据",
          type: 'error'
        });
      }
    },
    calculate(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let params = {}
          params.fannual = this.form.fannual
          params.femp = this.form.femp
          params.ftype = 1
          params.fmonthcost = 0
          params.foutmonthcost = 0
          countRecruitmentBonus(params).then(res => {
            if (res.flag) {
              let resData = res.data.tQuarterList
              for (var item in resData) {
                if (resData[item].fitem == '1') {
                  this.list[0].qOne = resData[item]['q1']
                  this.list[0].qTwo = resData[item]['q2']
                  this.list[0].qThree = resData[item]['q3']
                  this.list[0].qFour = resData[item]['q4']
                  this.list[0]['calculation'] = res.data.faccumulateia
                  this.list[0]['total'] = resData[item].ftotal
                } else if (resData[item].fitem == '2') {
                  this.list[1].qOne = resData[item]['q1']
                  this.list[1].qTwo = resData[item]['q2']
                  this.list[1].qThree = resData[item]['q3']
                  this.list[1].qFour = resData[item]['q4']
                  this.list[1]['calculation'] = res.data.finvoicedgp
                  this.list[1]['total'] = resData[item].ftotal
                } else if (resData[item].fitem == '3') {
                  this.list[2].qOne = resData[item]['q1']
                  this.list[2].qTwo = resData[item]['q2']
                  this.list[2].qThree = resData[item]['q3']
                  this.list[2].qFour = resData[item]['q4']
                  this.list[2]['calculation'] = res.data.fcollectiongp
                  this.list[2]['total'] = resData[item].ftotal
                } /*else if (resData[item].fitem == '4') {
                  this.list[3].qOne = resData[item]['q1']
                  this.list[3].qTwo = resData[item]['q2']
                  this.list[3].qThree = resData[item]['q3']
                  this.list[3].qFour = resData[item]['q4']
                  this.list[3]['calculation'] = res.data.faccumulategp
                }*/
              }
              this.list[3]['calculation'] = res.data.faccumulategp
              this.list[4]['calculation'] = res.data.faccumulatedprovisionratio
              this.list[5]['calculation'] = res.data.faccumulatedaccruedexpenses
              this.list[6]['calculation'] = res.data.fwarrantycost
              this.list[7]['calculation'] = res.data.fwarrantyfreezecost
              this.list[8]['calculation'] = res.data.fwarrantypart
              this.list[9]['calculation'] = res.data.fpaidfees
              this.list[10]['calculation'] = res.data.fmonthcost
              this.list[11]['calculation'] = res.data.faccumulatenocost
            }
          })
        }
      })
    },
    confirmData(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const postForm = {...this.postform}
          if (this.list2.findIndex(item => item.name == postForm.name) == -1) {
            this.list2.push(postForm)
            this.visible = false
          } else {
            this.$message({
              message: "已存在相同项",
              type: 'error'
            });
          }
        }
      })
    },
    fetchData(val={}, data = {
      pageNum: 1,
      pageSize: 1000
    }) {
      this.loading = true
      getSelectList(data, val).then(res => {
        this.loading = false
        this.list2 = res.data.records
      })
    },
    fetchData2(val = {}, data = {
      pageNum: 1,
      pageSize: 1000
    }) {
      this.loading = true
      getRecruitmentBonusList(data, val).then(res => {
        this.loading = false
        if(res.flag){
          if(res.data.records.length > 0){
            let resData = res.data.records[0].tQuarterList
            for (var item in resData) {
              if (resData[item].fitem == '1') {
                this.list[0].qOne = resData[item]['q1']
                this.list[0].qTwo = resData[item]['q2']
                this.list[0].qThree = resData[item]['q3']
                this.list[0].qFour = resData[item]['q4']
                this.list[0]['calculation'] = res.data.records[0].faccumulateia
                this.list[0]['total'] = resData[item].ftotal
              } else if (resData[item].fitem == '2') {
                this.list[1].qOne = resData[item]['q1']
                this.list[1].qTwo = resData[item]['q2']
                this.list[1].qThree = resData[item]['q3']
                this.list[1].qFour = resData[item]['q4']
                this.list[1]['calculation'] = res.data.records[0].finvoicedgp
                this.list[1]['total'] = resData[item].ftotal
              } else if (resData[item].fitem == '3') {
                this.list[2].qOne = resData[item]['q1']
                this.list[2].qTwo = resData[item]['q2']
                this.list[2].qThree = resData[item]['q3']
                this.list[2].qFour = resData[item]['q4']
                this.list[2]['calculation'] = res.data.records[0].fcollectiongp
                this.list[2]['total'] = resData[item].ftotal
              } /*else if (resData[item].fitem == '4') {
                  this.list[3].qOne = resData[item]['q1']
                  this.list[3].qTwo = resData[item]['q2']
                  this.list[3].qThree = resData[item]['q3']
                  this.list[3].qFour = resData[item]['q4']
                  this.list[3]['calculation'] = res.data.records[0].faccumulategp
                }*/
            }
            this.list[3]['calculation'] = res.data.records[0].faccumulategp
            this.list[4]['calculation'] = res.data.records[0].faccumulatedprovisionratio
            this.list[5]['calculation'] = res.data.records[0].faccumulatedaccruedexpenses
            this.list[6]['calculation'] = res.data.records[0].fwarrantycost
            this.list[7]['calculation'] = res.data.records[0].fwarrantyfreezecost
            this.list[8]['calculation'] = res.data.records[0].fwarrantypart
            this.list[9]['calculation'] = res.data.records[0].fpaidfees
            this.list[10]['calculation'] = res.data.records[0].fmonthcost
            this.list[11]['calculation'] = res.data.records[0].faccumulatenocost
          }
        }
      })
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          addRecruitmentBonus(this.form).then(res => {
            this.$emit('hideDialog', false)
            this.$emit('uploadList')
          })
        } else {
          return false
        }
      })
    },handleUpload(file, fileList) {
      if (file.status=='ready') {
        this.isUpload = true
      }
    },
    submitUpload(form) {
      if(this.isUpload){
        this.fullscreenLoading = true
        this.$refs.upload.submit()
      } else {
        this.$message({
          message: '请选择文件',
          type: 'warning'
        });
      }
    },
    uploadError(res) {
      this.$message({
        message: '导入失败',
        type: 'warning'
      });
      this.fullscreenLoading = false
    },
    handleAvatarSuccess(res, file) {
      if(res.flag) {
        this.$message({
          message: '上传成功',
          type: 'success'
        });
        this.list = res.data
        this.fullscreenLoading = false
        /* this.$emit('hideDialog', false)
         this.$emit('uploadList')*/
      } else {
        this.$message({
          message: res.msg,
          type: 'warning'
        });
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
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
