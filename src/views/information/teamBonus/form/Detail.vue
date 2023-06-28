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
                  type="year"
                  @change="changeFannual"
                  value-format="yyyy"
                  style="width: 100%"
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
                    :label="item.fname"
                    :value="item.fname">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="'Consultant Name'">
                <el-input v-model="form.fenglishname"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
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
            <el-col :span="8">
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
            <el-col :span="8">
              <el-form-item :label="'是否助理'">
                <el-radio-group style="width: 100%" v-model="form.fisassistant">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">

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
              class="tableBox"
              border
              height="550px"
              stripe
              size="mini"
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
                  <el-input size="mini" v-if="!t.sfkgg" v-model="scope.row[t.name]" clearable/>
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
               <!-- <el-button @click="importData">导入</el-button>
                <el-button @click="setRow">增加</el-button>
                <el-button @click="delRow">删除</el-button>-->
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
              ref="multipleTable"
              @selection-change="handleSelectionChange"
              :summary-method="getSummaries"
              show-summary
              class="tableBox"
              :cell-style="myclass"
              :highlight-current-row="true">
              <el-table-column align="center" type="selection" width="50"></el-table-column>
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
                        :label="item.fname"
                        :value="item.fname">
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
                  v-else-if="t.name=='fperformanceadvisor'"
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
                        :label="item.fname"
                        :value="item.fname">
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
            <el-form-item :label="'上传文件'">
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
    <!-- <div slot="footer" style="text-align:center;">
       <el-button type="primary" @click="saveData('form')">保存</el-button>
     </div>-->
  </div>
</template>

<script>import {
  getSelectList,
  addExpenseDetails,
  getTteamList,
  deleteExpenseDetails,
  addRecruitmentBonus,
  countRecruitmentBonus,
  getRecruitmentBonusList
} from '@/api/information/index'
import {getTuserList} from '@/api/basic/index'
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
      loading: false,
      fullscreenLoading: false,
      isUpload: null,
      fileList: [],
      fileUrl: this.$store.state.user.url + '/web/expenseDetails/input',
      activeName: 'first',
      form: {
        femp: null,
        fannual: null,
        ftype: 2,
        fcutoffdate: null,
        fisassistant: null,
        fjoindate: null,
        fenglishname: null,
        fdesc: null,
      },
      userList: [],
      teamList: [],
      multipleSelection: [],
      form2: {},
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
        title: '团队业绩 GP',
        calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: '点击弹出成员GP明细表'
      }, {
        title: '团队业绩目标',
        calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: '来自团队管理中的业绩目标'
      }, {
        title: '团队业绩达标率',
        calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: ''
      }, {
        title: '计提比例',
        calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: ''
      }, {
        title: '奖金权重占比',
        calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: '来自团队管理中的奖金权重占比'
      }, {
        title: '累计可提奖金',
        calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: ''
      }, {
        title: '担保期内奖金',
        calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: ''
      }, {
        title: '已发放奖金',
        calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: '自动累计'
      }, {
        title: '本月可发奖金',
        calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: '填写'
      }, {
        title: '累计未发佣金',
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
        {text: '担保期', name: 'fsecuritydate'},
        /*{text: '成单顾问', name: 'fsingleconsultant'},*/
        {text: '合同编号', name: 'fcontractnumber'},
        {text: '支付规则', name: 'fpaymentrules'},
        {text: '付款期限', name: 'fpaymentterm'},
        {text: '退款条例', name: 'frefundregulations'},
        {text: '奖金系数', name: 'fbonuscoefficient'},
        {text: '奖金金额', name: 'fbonusamount'},
        {text: '担保期内GP', name: 'fguaranteeperiodgp', width: '150'},
        {text: '担保期内佣金', name: 'fguaranteeperiodfees', width: '150'},
        {text: '备注', name: 'remark'},
        {text: '业绩所属顾问', name: 'fperformanceadvisor', width: '150'}
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
  mounted() {
    this.getUsersArray()
    if (this.listInfo) {
      this.form = this.listInfo
      /*this.fetchData({ftype: 2})*/
    }
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        this.getUsersArray({fname: query});
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
    },getTeamArray(val = {}, data = {
      pageNum: 1,
      pageSize: 10
    }) {
      getTteamList(data, val).then(res => {
        if (res.flag) {
          this.loading = false;
          this.teamList = res.data.records
        }
      });
    },
    getSummaries(param) {
      const {columns, data} = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += ' ';
        } else {
          sums[index] = 'N/A';
        }
      });

      return sums;
    },
    changeFannual(val) {
      /*if (this.listInfo) {*/
      /*this.fetchData({ftype: 2, femp: this.form.femp,fannual: val})*/
      /*}*/
    },
    changeUser(val) {
      this.userList.forEach((item)=>{
        if(item.fname == val){
          console.log(item)
          this.form.fcutoffdate = item.fcutoffdate
          this.form.fisassistant = item.fisassistant
          this.form.fjoindate = item.fjoindate
          this.form.fenglishname = item.fenglishname
        }
      })
      /*if (this.listInfo) {*/
      this.fetchData2({ftype: 2,fposition: this.form.femp, fannual: this.form.fannual})
      this.fetchData({ftype: 2, femp: this.form.femp, fannual: this.form.fannual})
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
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    setRow() {
      var itemObj = {
        finvoicingdate: '',
        finvoiceheader: '',
        fannual: '',
        fcandidate: '',
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
        remark: '',
        femp: '',
        fperformanceadvisor: '',
        ftype: 2,
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
        deleteExpenseDetails(array).then(res => {
          if (res.flag) {
            this.fetchData()
          }
        })
      } else {
        this.$message({
          message: "请选择删除项",
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
          params.ftype = 2
          params.fmonthcost = 0
          params.foutmonthcost = 0
          countRecruitmentBonus(params).then(res => {
            if (res.flag) {
              let resData = res.data.tQuarterList
              for (var item in resData) {
                if (resData[item].fitem == '0') {
                  this.list[0].qOne = resData[item]['q1']
                  this.list[0].qTwo = resData[item]['q2']
                  this.list[0].qThree = resData[item]['q3']
                  this.list[0].qFour = resData[item]['q4']
                  this.list[0]['total'] = res.data.fbasicsalarycost
                } else if (resData[item].fitem == '1') {
                  this.list[1].qOne = resData[item]['q1']
                  this.list[1].qTwo = resData[item]['q2']
                  this.list[1].qThree = resData[item]['q3']
                  this.list[1].qFour = resData[item]['q4']
                  this.list[1]['total'] = res.data.faccumulateia
                } else if (resData[item].fitem == '2') {
                  this.list[2].qOne = resData[item]['q1']
                  this.list[2].qTwo = resData[item]['q2']
                  this.list[2].qThree = resData[item]['q3']
                  this.list[2].qFour = resData[item]['q4']
                  this.list[2]['total'] = res.data.finvoicedgp
                } else if (resData[item].fitem == '3') {
                  this.list[3].qOne = resData[item]['q1']
                  this.list[3].qTwo = resData[item]['q2']
                  this.list[3].qThree = resData[item]['q3']
                  this.list[3].qFour = resData[item]['q4']
                  this.list[3]['total'] = res.data.fcollectiongp
                }
              }
              this.list[4]['total'] = res.data.faccumulatebl
              this.list[5]['total'] = res.data.fassistantcostsgp
              this.list[6]['total'] = res.data.faccumulategp
              this.list[7]['total'] = res.data.faccumulatedprovisionratio
              this.list[8]['total'] = res.data.faccumulatedaccruedexpenses
              this.list[9]['total'] = res.data.fwarrantycost
              this.list[10]['total'] = res.data.fwarrantyfreezecost
              this.list[11]['total'] = res.data.fwarrantypart
              this.list[12]['total'] = res.data.fpaidfees
              this.list[13]['total'] = res.data.fmonthcost
              this.list[14]['total'] = res.data.faccumulatenocost
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
    fetchData(val = {}, data = {
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
        if (res.flag) {
          let resData = res.data.records[0].tQuarterList
          for (var item in resData) {
            if (resData[item].fitem == '0') {
              this.list[0].qOne = resData[item]['q1']
              this.list[0].qTwo = resData[item]['q2']
              this.list[0].qThree = resData[item]['q3']
              this.list[0].qFour = resData[item]['q4']
              this.list[0]['total'] = res.data.records[0].fbasicsalarycost
            } else if (resData[item].fitem == '1') {
              this.list[1].qOne = resData[item]['q1']
              this.list[1].qTwo = resData[item]['q2']
              this.list[1].qThree = resData[item]['q3']
              this.list[1].qFour = resData[item]['q4']
              this.list[1]['total'] = res.data.records[0].faccumulateia
            } else if (resData[item].fitem == '2') {
              this.list[2].qOne = resData[item]['q1']
              this.list[2].qTwo = resData[item]['q2']
              this.list[2].qThree = resData[item]['q3']
              this.list[2].qFour = resData[item]['q4']
              this.list[2]['total'] = res.data.records[0].finvoicedgp
            } else if (resData[item].fitem == '3') {
              this.list[3].qOne = resData[item]['q1']
              this.list[3].qTwo = resData[item]['q2']
              this.list[3].qThree = resData[item]['q3']
              this.list[3].qFour = resData[item]['q4']
              this.list[3]['total'] = res.data.records[0].fcollectiongp
            }
          }
          this.list[4]['total'] = res.data.records[0].faccumulatebl
          this.list[5]['total'] = res.data.records[0].fassistantcostsgp
          this.list[6]['total'] = res.data.records[0].faccumulategp
          this.list[7]['total'] = res.data.records[0].faccumulatedprovisionratio
          this.list[8]['total'] = res.data.records[0].faccumulatedaccruedexpenses
          this.list[9]['total'] = res.data.records[0].fwarrantycost
          this.list[10]['total'] = res.data.records[0].fwarrantyfreezecost
          this.list[11]['total'] = res.data.records[0].fwarrantypart
          this.list[12]['total'] = res.data.records[0].fpaidfees
          this.list[13]['total'] = res.data.records[0].fmonthcost
          this.list[14]['total'] = res.data.records[0].faccumulatenocost
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
    }, handleUpload(file, fileList) {
      if (file.status == 'ready') {
        this.isUpload = true
      }
    },
    submitUpload(form) {
      if (this.isUpload) {
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
      if (res.flag) {
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
      return this.$confirm(`确定移除 ${file.name}？`);
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
