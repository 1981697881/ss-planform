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
                    :label="item.fenglishname"
                    :value="item.fenglishname">
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
              <el-form-item :label="'是否客服'">
                <el-radio-group style="width: 100%" v-model="form.fiscustomer">
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
      <el-tab-pane label="外包项目费用明细" name="second">
        <el-form :model="form2" :rules="rules" ref="form2" :size="'mini'">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="''">
                <!--<el-button @click="importData1">导入</el-button>-->
                <el-button @click="setRow1">增加</el-button>
                <el-button @click="delRow1">删除</el-button>
                <el-button @click="saveRow1">保存</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-table
              :data="list2"
              class="tableBox"
              border
              height="250px"
              stripe
              size="mini"
              :highlight-current-row="true"
              ref="multipleTable1"
              @selection-change="handleSelectionChange1"
              align="center"
              :cell-style="myclass"
              :summary-method="getSummaries"
              show-summary>
              <el-table-column align="center" type="selection" width="50"></el-table-column>
              <template
                v-for="(t,i) in columns2"
              >
                <el-table-column
                  :key="i"
                  align="center"
                  :prop="t.name"
                  v-if="t.name == 'fmonth'"
                  :label="t.text"
                >
                  <template slot-scope="scope">
                    <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                    <el-date-picker
                      size="mini"
                      type="month"
                      style="width: 100%"
                      v-if="!t.sfkgg"
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
                  v-else-if="t.name == 'fheader'"
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
                  v-else-if="t.name == 'fheader'"
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
                  v-else-if="t.name == 'fproject'"
                  :label="t.text"
                >
                  <template slot-scope="scope">
                    <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                    <el-select size="mini" filterable
                               remote
                               :remote-method="remoteMethod2"
                               :loading="loading" style="width: 100%" v-if="!t.sfkgg" v-model="scope.row[t.name]"
                               placeholder="请选择">
                      <el-option
                        v-for="item in projectList"
                        :key="item.fid"
                        :label="item.fprojectname"
                        :value="item.fprojectname">
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
      <el-tab-pane label="外包客服明细" name="third">
        <el-form :model="form2" :rules="rules" ref="form2" :size="'mini'">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="''">
                <el-button @click="setRow2">增加</el-button>
                <!--<el-button @click="importData2">导入</el-button>-->
                <el-button @click="delRow2">删除</el-button>
                <el-button @click="saveRow2">保存</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-table
              :data="list3"
              class="tableBox"
              border
              height="250px"
              stripe
              size="mini"
              :highlight-current-row="true"
              ref="multipleTable2"
              @selection-change="handleSelectionChange2"
              align="center"
              :cell-style="myclass"
              :summary-method="getSummaries"
              show-summary>
              <el-table-column align="center" type="selection" width="50"></el-table-column>
              <template
                v-for="(t,i) in columns3"
              >
                <el-table-column
                  :key="i"
                  align="center"
                  :prop="t.name"
                  v-if="t.name == 'fmonth'"
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
                  v-else-if="t.name == 'fcustomerservice'"
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
                  v-else-if="t.name == 'fcustomerservice'"
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
                  v-else-if="t.name == 'fproject'"
                  :label="t.text"
                >
                  <template slot-scope="scope">
                    <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                    <el-select size="mini" filterable
                               remote
                               :remote-method="remoteMethod2"
                               :loading="loading" style="width: 100%" v-if="!t.sfkgg" v-model="scope.row[t.name]"
                               placeholder="请选择">
                      <el-option
                        v-for="item in projectList"
                        :key="item.fid"
                        :label="item.fprojectname"
                        :value="item.fprojectname">
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
      <el-tab-pane label="外包外聘费用明细" name="fourth">
        <el-form :model="form2" :rules="rules" ref="form2" :size="'mini'">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="''">
                <el-button @click="setRow3">增加</el-button>
                <!--<el-button @click="importData3">导入</el-button>-->
                <el-button @click="delRow3">删除</el-button>
                <el-button @click="saveRow3">保存</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-table
              :data="list4"
              class="tableBox"
              border
              height="250px"
              stripe
              size="mini"
              :highlight-current-row="true"
              ref="multipleTable3"
              @selection-change="handleSelectionChange3"
              align="center"
              :cell-style="myclass"
              :summary-method="getSummaries"
              show-summary
            >
              <el-table-column align="center" type="selection" width="50"></el-table-column>
              <template
                v-for="(t,i) in columns4"
              >
                <el-table-column
                  :key="i"
                  align="center"
                  :prop="t.name"
                  v-if="t.name == 'fcountdate' || t.name == 'fentrydate' || t.name == 'fguaranteedate'"
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
                  v-else-if="t.name == 'fclerk'"
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
                    <el-select
                      size="mini"
                      filterable
                      remote
                      :remote-method="remoteMethod"
                      :loading="loading"
                      style="width: 100%"
                      v-if="!t.sfkgg"
                      v-model="scope.row[t.name]"
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
                  v-else-if="t.name == 'fbelongproject'"
                  :label="t.text"
                >
                  <template slot-scope="scope">
                    <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
                    <el-select size="mini" filterable
                               remote
                               :remote-method="remoteMethod2"
                               :loading="loading" style="width: 100%" v-if="!t.sfkgg" v-model="scope.row[t.name]"
                               placeholder="请选择">
                      <el-option
                        v-for="item in projectList"
                        :key="item.fid"
                        :label="item.fprojectname"
                        :value="item.fprojectname">
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
                  :action="uploadType=='0'?fileUrl1:(uploadType=='1'?fileUrl2:fileUrl3)"
                  :headers="headers"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="handleAvatarSuccess"
                  :on-error="uploadError"
                  :before-remove="beforeRemove"
                  multiple
                  :name="uploadType=='0'?'tOutsourceProjects':(uploadType=='1'?'tOutsourcingCustomerServiceList':'tOutsourcingRecruitmentFees')"
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

<script>import {
  addTprojectOutsourcingBonus,
  getToutsourcingCustomerServiceList,
  addToutsourcingCustomerService,
  deleteToutsourcingCustomerService,
  deleteToutsourceProject,
  addToutsourceProject,
  getToutsourceProjectList,
  deleteToutsourcingRecruitmentFee,
  addToutsourcingRecruitmentFee,
  getToutsourcingRecruitmentFeeList,
  countRecruitmentBonus,
  getTprojectOutsourcingBonusList,
  getTprojectList
} from '@/api/information/index'
import {getTuserList, getTTeamList} from '@/api/basic/index'
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
      fileList: [],
      headers: {
        'authorization': getToken('ssrx'),
      },
      fullscreenLoading: false,
      loading: false,
      isUpload: null,
      uploadType: '0',
      fileUrl1: '/web/toutsourceProject/input',
      fileUrl2: '/web/toutsourcingCustomerService/input',
      fileUrl3: '/web/toutsourcingRecruitmentFee/input',
      activeName: 'first',
      form: {
        fkey: null,
        femp: null,
        fannual: null,
        fcutoffdate: null,
        fisassistant: null,
        fjoindate: null,
        fenglishname: null,
        fiscustomer: null,
        fdesc: null,
      },
      form2: {},
      userList: [],
      projectList: [],
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
        title: '本年项目GP', calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: ''
      }, {
        title: '上年年项目GP', calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: ''
      }, {
        title: '本年度目标', calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: ''
      }, {
        title: '风险金7%', calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: ''
      }, {
        title: '项目管理奖金3%', calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: ''
      }, {
        title: '增量项目管理奖金5%', calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: ''
      }, {
        title: '达标奖金', calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: ''
      }, {
        title: '卓越奖金', calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: ''
      }, {
        title: '已发放费用', calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: ''
      }, {
        title: '本月应发费用', calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: ''
      }, {
        title: '累计未发外包项目费用', calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: ''
      }, {
        title: '季度奖金1%', calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: ''
      }, {
        title: '年度奖金1%', calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: ''
      }, {
        title: '团队盈利达标1%', calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: ''
      }, {
        title: '本月应发客服费用', calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: ''
      }, {
        title: '外包招聘费用', calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: ''
      }, {
        title: '管理津贴', calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: ''
      }, {
        title: '已发放费用', calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: ''
      }, {
        title: '本月应发费用', calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: ''
      }, {
        title: '累计未发外包招聘佣金', calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: ''
      }, {
        title: '汇总合计', calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: ''
      }, {
        title: '汇总应发', calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: ''
      }, {
        title: '汇总已发', calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: ''
      }, {
        title: '汇总未发', calculation: '',
        qOne: '',
        qTwo: '',
        qThree: '',
        qFour: '',
        total: '',
        remark: ''
      }],
      columns2: [
        {text: '年度', name: 'fannual'},
        {text: '计算月份', name: 'fmonth'},
        {text: '项目负责人', name: 'fheader'},
        {text: '项目', name: 'fproject'},
        {text: '本年项目GP', name: 'ftyearprojectgp'},
        {text: '上年年项目GP', name: 'flyearprojectgp'},
        {text: '备注', name: 'remark'}
      ],
      list2: [],
      list3: [],
      columns3: [
        {text: '年度', name: 'fannual'},
        {text: '计算月份', name: 'fmonth'},
        {text: '客服人员', name: 'fcustomerservice'},
        {text: '项目', name: 'fproject'},
        {text: '本年GP', name: 'fannualgp'},
        /* {text: '客服人数', name: 'fcustomerservicecount'},
         {text: '客服单价', name: 'fcustomerserviceunivalence'},*/
        {text: '备注', name: 'remark'}
      ],
      list4: [],
      columns4: [
        {text: '年度', name: 'fannual'},
        {text: '计算日期', name: 'fcountdate'},
        {text: '所属项目', name: 'fbelongproject'},
        {text: '候选人', name: 'fcandidate'},
        {text: '员工', name: 'fclerk'},
        {text: '入职时间', name: 'fentrydate'},
        {text: '佣金类别', name: 'fcommissiontype'},
        {text: '成单人次', name: 'fsinglepersontime'},
        {text: '费用金额', name: 'ffeeamount'},
        {text: '候选人状态', name: 'fcandidatestatus'},
        {text: '担保期至', name: 'fguaranteedate'},
        {text: '备注', name: 'remark'}
      ],
      postform: {
        name: null,
        start_time: null,
        end_time: null,
      },
      multipleSelection1: [],
      multipleSelection2: [],
      multipleSelection3: [],
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
    this.getProjectArray()
    if (this.listInfo) {
      this.form = this.listInfo
      /* this.fetchData()
       this.fetchData2()
       this.fetchData3()*/
    }
  },
  methods: {
    calculate(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let params = {}
          params.fannual = this.form.fannual
          params.femp = this.form.femp
          params.ftype = 3
          params.fmonthcost = 0
          params.foutmonthcost = 0
          countRecruitmentBonus(params).then(res => {
            if (res.flag) {
              let resData = res.data.tQuarterList
              for (var item in resData) {
                if (resData[item].fitem == '4') {
                  this.list[8].qOne = resData[item]['q1']
                  this.list[8].qTwo = resData[item]['q2']
                  this.list[8].qThree = resData[item]['Q3']
                  this.list[8].qFour = resData[item]['q4']
                } else if (resData[item].fitem == '5') {
                  this.list[16].qOne = resData[item]['q1']
                  this.list[16].qTwo = resData[item]['q2']
                  this.list[16].qThree = resData[item]['q3']
                  this.list[16].qFour = resData[item]['q4']
                }
              }
              this.list[0]['total'] = res.data.ftyearprojectgp
              this.list[1]['total'] = res.data.flyearprojectgp
              this.list[2]['total'] = res.data.fyeargoal
              this.list[3]['total'] = res.data.friskfund
              this.list[4]['total'] = res.data.fprojectmanagementbonus
              this.list[5]['total'] = res.data.fincrementalprojectmanagementbonus
              this.list[6]['total'] = res.data.fcompliancebonus
              this.list[7]['total'] = res.data.fexcellencebonus
              this.list[8]['total'] = res.data.fpaidexpenses
              this.list[9]['total'] = res.data.fmonthcost
              this.list[10]['total'] = res.data.faccumulatenocost
              this.list[11]['total'] = res.data.fquarterlybonus
              this.list[12]['total'] = res.data.fannualbonus
              this.list[13]['total'] = res.data.fteambonus
              this.list[14]['total'] = ''
              this.list[15]['total'] = res.data.foutsourcedrecruitmentcosts
              this.list[16]['total'] = res.data.fmanagementallowance
              this.list[17]['total'] = res.data.foutpaidexpenses
              this.list[18]['total'] = res.data.foutmonthcost
              this.list[19]['total'] = res.data.foutsourcecommission
              this.list[20]['total'] = res.data.ftotalsummary
              this.list[21]['total'] = res.data.fpayablesummary
              this.list[22]['total'] = res.data.fsentsummary
              this.list[23]['total'] = res.data.fnotsentsummary
            }
          })
        }
      })
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        this.getUsersArray({fenglishname: query});
      } else {
        this.userList = [];
      }
    }, remoteMethod2(query) {
      if (query !== '') {
        this.loading = true;
        this.getProjectArray({fprojectname: query});
      } else {
        this.projectList = [];
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
    }, getProjectArray(val = {}, data = {
      pageNum: 1,
      pageSize: 10
    }) {
      getTprojectList(data, val).then(res => {
        if (res.flag) {
          this.loading = false;
          this.projectList = res.data.records
        }
      });
    },
    changeFannual(val) {
      /*if (this.listInfo) {*/
      this.fetchData4({ftype: 3, fposition: this.form.femp, fannual: this.form.fannual})
      this.fetchData({ftype: 3, femp: this.form.femp, fannual: this.form.fannual})
      this.fetchData2({ftype: 3, femp: this.form.femp, fannual: this.form.fannual})
      this.fetchData3({ftype: 3, femp: this.form.femp, fannual: this.form.fannual})
      /*}*/
    },
    changeUser(val) {
      /*if (this.listInfo) {*/
      this.userList.forEach((item) => {
        if (item.fenglishname == val) {
          console.log(item)
          this.form.fcutoffdate = item.fcutoffdate
          this.form.fiscustomer = item.fiscustomer
          this.form.fjoindate = item.fjoindate
          this.form.fenglishname = item.fenglishname
        }
      })
      this.fetchData4({ftype: 3, fposition: this.form.femp, fannual: this.form.fannual})
      this.fetchData({ftype: 3, femp: this.form.femp, fannual: this.form.fannual})
      this.fetchData2({ftype: 3, femp: this.form.femp, fannual: this.form.fannual})
      this.fetchData3({ftype: 3, femp: this.form.femp, fannual: this.form.fannual})
      /*}*/
    },
    importData1() {
      this.uploadType = '0'
      this.visible = true
    },
    importData2() {
      this.uploadType = '1'
      this.visible = true
    },
    importData3() {
      this.uploadType = '2'
      this.visible = true
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
          sums[index] += ' 元';
        } else {
          sums[index] = 'N/A';
        }
      });

      return sums;
    },
    fetchData(val = {}, data = {
      pageNum: 1,
      pageSize: 1000
    }) {
      this.loading = true
      getToutsourceProjectList(data, val).then(res => {
        this.loading = false
        this.list2 = res.data.records
      })
    }, fetchData2(val = {}, data = {
      pageNum: 1,
      pageSize: 1000
    }) {
      this.loading = true
      getToutsourcingCustomerServiceList(data, val).then(res => {
        this.loading = false
        this.list3 = res.data.records
      })
    }, fetchData3(val = {}, data = {
      pageNum: 1,
      pageSize: 1000
    }) {
      this.loading = true
      getToutsourcingRecruitmentFeeList(data, val).then(res => {
        this.loading = false
        this.list4 = res.data.records
      })
    },
    fetchData4(val = {}, data = {
      pageNum: 1,
      pageSize: 1000
    }) {
      this.loading = true
      getTprojectOutsourcingBonusList(data, val).then(res => {
        this.loading = false
        if (res.flag) {
          let resData = res.data.records[0].tQuarterList
          for (var item in resData) {
            if (resData[item].fitem == '4') {
              this.list[8].qOne = resData[item]['q1']
              this.list[8].qTwo = resData[item]['q2']
              this.list[8].qThree = resData[item]['q3']
              this.list[8].qFour = resData[item]['q4']
            } else if (resData[item].fitem == '5') {
              this.list[16].qOne = resData[item]['q1']
              this.list[16].qTwo = resData[item]['q2']
              this.list[16].qThree = resData[item]['q3']
              this.list[16].qFour = resData[item]['q4']
            }
          }
          this.list[0]['total'] = res.data.records[0].ftyearprojectgp
          this.list[1]['total'] = res.data.records[0].flyearprojectgp
          this.list[2]['total'] = res.data.records[0].fyeargoal
          this.list[3]['total'] = res.data.records[0].friskfund
          this.list[4]['total'] = res.data.records[0].fprojectmanagementbonus
          this.list[5]['total'] = res.data.records[0].fincrementalprojectmanagementbonus
          this.list[6]['total'] = res.data.records[0].fcompliancebonus
          this.list[7]['total'] = res.data.records[0].fexcellencebonus
          this.list[8]['total'] = res.data.records[0].fpaidexpenses
          this.list[9]['total'] = res.data.records[0].fmonthcost
          this.list[10]['total'] = res.data.records[0].faccumulatenocost
          this.list[11]['total'] = ''
          this.list[12]['total'] = ''
          this.list[13]['total'] = ''
          this.list[14]['total'] = res.data.records[0].foutsourcedrecruitmentcosts
          this.list[15]['total'] = res.data.records[0].fmanagementallowance
          this.list[16]['total'] = res.data.records[0].foutpaidexpenses
          this.list[17]['total'] = res.data.records[0].foutmonthcost
          this.list[18]['total'] = res.data.records[0].foutsourcecommission
          this.list[19]['total'] = res.data.records[0].ftotalsummary
          this.list[20]['total'] = res.data.records[0].fpayablesummary
          this.list[21]['total'] = res.data.records[0].fsentsummary
          this.list[22]['total'] = res.data.records[0].fnotsentsummary
        }
      })
    },
    myclass({row, columnIndex}) {
      if (row[columnIndex] && !row[columnIndex].sfcb && row[columnIndex].sfcb != null) {
        return 'color: red';
      }
    },
    setRow1() {
      if (this.form.femp != null) {
        var itemObj = {
          fmonth: '',
          fannual: '',
          fheader: this.form.femp,
          fproject: '',
          ftyearprojectgp: '',
          flyearprojectgp: '',
          remark: '',
          sfkgg: true,
          sfcb: null,
        }
        if (this.list2 == null) {
          this.list2 = []
        }
        this.list2.push(itemObj)
      } else {
        this.$message({
          message: '请先选择职员',
          type: 'error'
        });
      }
    },
    setRow2() {
      if (this.form.femp != null) {
        var itemObj = {
          fmonth: '',
          fannual: '',
          fcustomerservice: this.form.femp,
          fproject: '',
          fcustomerservicecount: '',
          fcustomerserviceunivalence: '',
          remark: '',
          sfkgg: true,
          sfcb: null,
        }
        if (this.list3 == null) {
          this.list3 = []
        }
        this.list3.push(itemObj)
      } else {
        this.$message({
          message: '请先选择职员',
          type: 'error'
        });
      }
    },
    setRow3() {
      if (this.form.femp != null) {
        var itemObj = {
          fcountdate: '',
          fannual: '',
          fbelongproject: '',
          fcandidate: '',
          fclerk: this.form.femp,
          fentrydate: '',
          fcommissiontype: '',
          fsinglepersontime: '',
          ffeeamount: '',
          fcandidatestatus: '',
          fguaranteedate: '',
          remark: '',
          sfkgg: true,
          sfcb: null,
        }
        if (this.list4 == null) {
          this.list4 = []
        }
        this.list4.push(itemObj)
      } else {
        this.$message({
          message: '请先选择职员',
          type: 'error'
        });
      }

    },
    handleSelectionChange1(val) {
      this.multipleSelection1 = val
    },
    handleSelectionChange2(val) {
      this.multipleSelection2 = val
    },
    handleSelectionChange3(val) {
      this.multipleSelection3 = val
    },
    delRow1() {
      let array = []
      if (this.multipleSelection1.length > 0) {
        this.multipleSelection1.forEach((item) => {
          if (item.fid) {
            array.push(item.fid)
          } else {
            this.list2.splice(this.list2.indexOf(item), 1)
          }
        })
        if (array.length > 0) {
          deleteToutsourceProject(array).then(res => {
            if (res.flag) {
              this.fetchData({ftype: 3, femp: this.form.femp, fannual: this.form.fannual})
              this.fetchData4({ftype: 3, fposition: this.form.femp, fannual: this.form.fannual})
            }
          })
        }
      } else {
        this.$message({
          message: '请选择删除项',
          type: 'error'
        });
      }
    }, delRow2() {
      let array = []
      if (this.multipleSelection2.length > 0) {
        this.multipleSelection2.forEach((item) => {
          if (item.fid) {
            array.push(item.fid)
          } else {
            this.list3.splice(this.list3.indexOf(item), 1)
          }
        })
        if (array.length > 0) {
          deleteToutsourcingCustomerService(array).then(res => {
            if (res.flag) {
              this.fetchData2({ftype: 3, femp: this.form.femp, fannual: this.form.fannual})
              this.fetchData4({ftype: 3, fposition: this.form.femp, fannual: this.form.fannual})
            }
          })
        }
      } else {
        this.$message({
          message: '请选择删除项',
          type: 'error'
        });
      }
    }, delRow3() {
      let array = []
      if (this.multipleSelection3.length > 0) {
        this.multipleSelection3.forEach((item) => {
          if (item.fid) {
            array.push(item.fid)
          } else {
            this.list4.splice(this.list4.indexOf(item), 1)
          }
        })
        if (array.length > 0) {
          deleteToutsourcingRecruitmentFee(array).then(res => {
            if (res.flag) {
              this.fetchData3({ftype: 3, femp: this.form.femp, fannual: this.form.fannual})
              this.fetchData4({ftype: 3, fposition: this.form.femp, fannual: this.form.fannual})
            }
          })
        }
      } else {
        this.$message({
          message: '请选择删除项',
          type: 'error'
        });
      }
    },
    saveRow1() {
      if (this.list2.length > 0) {
        addToutsourceProject(this.list2).then(res => {
          if (res.flag) {
            this.$emit('uploadList')
            /* this.fetchData({ftype: 3, femp: this.form.femp, fannual: this.form.fannual})
             this.$confirm('保存成功，是否关闭窗口', '提示', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
             }).then(() => {
               this.$emit('hideDialog', false)
             }).catch(() => {
               this.$message({
                 type: 'info',
                 message: '已取消'
               });
             });*/
          }
        })
      } else {
        this.$message({
          message: '无数据',
          type: 'error'
        });
      }
    },
    saveRow2() {
      if (this.list3.length > 0) {
        addToutsourcingCustomerService(this.list3).then(res => {
          if (res.flag) {
            this.$emit('uploadList')
            this.fetchData2({ftype: 3, femp: this.form.femp, fannual: this.form.fannual})

            /*this.$confirm('保存成功，是否关闭窗口', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$emit('hideDialog', false)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              });
            });*/
          }
        })
      } else {
        this.$message({
          message: '无数据',
          type: 'error'
        });
      }
    },
    saveRow3() {
      if (this.list4.length > 0) {
        addToutsourcingRecruitmentFee(this.list4).then(res => {
          if (res.flag) {
            this.$emit('uploadList')
            this.fetchData3({ftype: 3, femp: this.form.femp, fannual: this.form.fannual})
            /*this.$confirm('保存成功，是否关闭窗口', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$emit('hideDialog', false)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              });
            });*/
          }
        })
      } else {
        this.$message({
          message: '无数据',
          type: 'error'
        });
      }
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          addTprojectOutsourcingBonus(this.form).then(res => {
            if (res.flag) {
              this.$emit('uploadList')
              /*this.$confirm('保存成功，是否关闭窗口', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$emit('hideDialog', false)
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消'
                });
              });*/
            }
          })
        } else {
          return false
        }
      })
    },
    handleUpload(file, fileList) {
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
        if (this.uploadType == '0') {
          this.fetchData()
        } else if (this.uploadType == '1') {
          this.fetchData2()
        } else {
          this.fetchData3()
        }
        /* this.list = res.data*/
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
