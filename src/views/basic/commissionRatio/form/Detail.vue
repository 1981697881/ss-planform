<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'提成方案名称'" prop="fcommissionplanname">
            <el-input v-model="form.fcommissionplanname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'日期'">
            <el-date-picker
              v-model="form.fdate"
              type="date"
              value-format="yyyy-MM-dd"
              style="width: 100%"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'适用计算表'">
            <el-select style="width: 100%" v-model="form.fcalculateamount" placeholder="请选择">
              <el-option
                v-for="(item,index) in levelFormat"
                :key="index"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'提成方式'">
            <el-select style="width: 100%" v-model="form.fcommissionmethod" placeholder="请选择">
              <el-option
                v-for="(item,index) in levelFormat1"
                :key="index"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'固定提成方式'">
            <el-select style="width: 100%" v-model="form.fregularcommissionmethod" placeholder="请选择">
              <el-option
                v-for="(item,index) in levelFormat2"
                :key="index"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'固定提成值'">
            <el-input v-model="form.fregularcommissionvalue"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'适用部门'">
            <el-select filterable
                       remote
                       :remote-method="remoteMethod3"
                       :loading="loading" style="width: 100%" multiple v-model="form.fapplicabledepartment"
                       placeholder="请选择">
              <el-option
                v-for="(item,index) in organizationsList"
                :key="index"
                :label="item.fdeptname"
                :value="item.fdeptname">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'适用岗位'">
            <el-select filterable
                       remote
                       :remote-method="remoteMethod2"
                       :loading="loading" style="width: 100%" multiple v-model="form.fapplicablepositions"
                       placeholder="请选择">
              <el-option
                v-for="(item,index) in dutyList"
                :key="index"
                :label="item.fdutyname"
                :value="item.fdutyname">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'适用人员'" prop="fvalue">
            <el-select filterable
                       remote
                       :remote-method="remoteMethod"
                       :loading="loading" style="width: 100%" multiple v-model="form.fapplicablepersonnel"
                       placeholder="请选择">
              <el-option
                v-for="(item,index) in userList"
                :key="index"
                :label="item.fenglishname +'-'+item.fname"
                :value="item.fenglishname">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'生效日期'">
            <el-date-picker
              v-model="form.feffectivedate"
              type="date"
              value-format="yyyy-MM-dd"
              style="width: 100%"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'失效日期'">
            <el-date-picker
              v-model="form.fexpiringdate"
              type="date"
              value-format="yyyy-MM-dd"
              style="width: 100%"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'提成设定'">
            <el-button @click="setRow">增加</el-button>
            <el-button @click="delRow">删除</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-table class="tableBox" ref="multipleTable" @selection-change="handleSelectionChange" border height="250px"
                  stripe size="mini" :highlight-current-row="true" :data="form.tProgrammeProportionList" align="center"
                  :cell-style="myclass" highlight-current-row>
          <el-table-column align="center" type="selection"></el-table-column>
          <el-table-column prop="date" label="序号" type="index" align="center" sortable></el-table-column>
          <el-table-column
            v-for="(t,i) in columns"
            :key="i"
            align="center"
            :prop="t.name"
            :label="t.text"
          >
            <template slot-scope="scope">
              <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
              <el-input v-if="!t.sfkgg" v-model="scope.row[t.name]" clearable/>
              <span>{{scope.row[t.name]}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-form>
    <el-dialog
      :visible.sync="visible"
      title="编辑"
      v-if="visible"
      :width="'20%'"
      destroy-on-close
      append-to-body
    >
      <el-form ref="postform" :model="postform" :size="'mini'" :rules="rules">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'提成类型'">
              <el-input v-model="postform.gpName1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'开始金额'">
              <el-input v-model="postform.gpName2"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'结束金额'">
              <el-input v-model="postform.gpName3"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'提成比例%'">
              <el-input v-model="postform.gpName4"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" style="text-align:center;">
        <el-button type="primary" @click="confirmData('postform')">确定</el-button>
      </div>
    </el-dialog>
    <div slot="footer" style="text-align:center;">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {addTcommission, getTuserList, getDutyList, getOrganizationsList} from '@/api/basic/index'

export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {
        fcommissionplanname: null,
        fdate: null,
        fcalculateamount: 0,
        fcommissionmethod: null,
        fregularcommissionmethod: null,
        fregularcommissionvalue: null,
        fapplicabledepartment: null,
        fapplicablepositions: null,
        fapplicablepersonnel: null,
        feffectivedate: null,
        fexpiringdate: null,
        tProgrammeProportionList: []
      },
      columns: [
        {text: '提成类型', name: 'ftype'},
        {text: '开始金额', name: 'fsamount'},
        {text: '结束金额', name: 'feamount'},
        {text: '提成比例%', name: 'fproportion'}
      ],
      list: [],
      levelFormat: [
        {name: '招聘', value: 0},
        {name: 'BD', value: 1},
        {name: '团队', value: 2},
        {name: '外包', value: 3},
      ],
      loading: false,
      userList: [],
      dutyList: [],
      organizationsList: [],
      multipleSelection: [],
      levelFormat1: [
        {name: '固定', value: '固定'},
        {name: '阶梯式', value: '阶梯式'}
      ],
      levelFormat2: [
        {name: '比例', value: '比例'},
        {name: '金额', value: '金额'}
      ],
      postform: {
        gpName1: null,
        gpName2: null,
        gpName3: null,
        gpName4: null,
      },
      visible: null,
      rules: {
        fcommissionplanname: [
          {required: true, message: '请输入', trigger: 'blur'}
        ], fkey: [
          {required: true, message: '请输入', trigger: 'blur'}
        ], fname: [
          {required: true, message: '请输入', trigger: 'blur'}
        ]
      }
    }
  },
  mounted() {
    this.getUsersArray()
    this.getDutyArray()
    this.getOrganizationsArray()
    if (this.listInfo) {
      this.form = this.listInfo
      if(this.form.tProgrammeProportionList==null){
        this.form.tProgrammeProportionList = []
      }
     /* this.form.tProgrammeProportionList = JSON.parse(this.form.tProgrammeProportionList)*/
      this.form.fapplicabledepartment = this.form.fapplicabledepartment.split(',')
      this.form.fapplicablepositions = this.form.fapplicablepositions.split(',')
      this.form.fapplicablepersonnel = this.form.fapplicablepersonnel.split(',')
    }
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        this.getUsersArray({fenglishname: query});
      } else {
        this.userList = [];
      }
    },
    remoteMethod2(query) {
      if (query !== '') {
        this.loading = true;
        this.getDutyArray({fdutyname: query});
      } else {
        this.dutyList = [];
      }
    },
    remoteMethod3(query) {
      if (query !== '') {
        this.loading = true;
        this.getOrganizationsArray({fdeptname: query});
      } else {
        this.organizationsList = [];
      }
    },
    myclass({row, columnIndex}) {
      if (row[columnIndex] && !row[columnIndex].sfcb && row[columnIndex].sfcb != null) {
        return "color: red";
      }
    },
    setRow() {/*
      var obj = {}
      for (var i = 1; i < 5; i++) {
        obj['gpName' + i] = "";
      }
      var itemObj = Object.assign({
        sfkgg: true,
        sfcb: null,
      }, obj)*/
      var itemObj = {
        ftype: "",
        fsamount: "",
        feamount: "",
        fproportion: "",
        sfkgg: true,
        sfcb: null,
      }
      if(this.form.tProgrammeProportionList == null){
        this.form.tProgrammeProportionList = []
      }
      this.form.tProgrammeProportionList.push(itemObj)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    delRow() {
      if (this.multipleSelection.length > 0) {
        this.multipleSelection.forEach((item) => {
          this.form.tProgrammeProportionList.splice(item)
        })
      } else {
        this.$message({
          message: "请选择删除项",
          type: 'error'
        });
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
    getDutyArray(val = {}, data = {
      pageNum: 1,
      pageSize: 10
    }) {
      getDutyList(data, val).then(res => {
        if (res.flag) {
          this.loading = false;
          this.dutyList = res.data.records
        }
      });
    },
    getOrganizationsArray(val = {}, data = {
      pageNum: 1,
      pageSize: 10
    }) {
      getOrganizationsList(data, val).then(res => {
        if (res.flag) {
          this.loading = false;
          this.organizationsList = res.data.records
        }
      });
    },
    confirmData(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const postForm = {...this.postform}
          if (this.form.list.findIndex(item => item.gpName1 == postForm.gpName1) == -1) {
            this.form.list.push(postForm)
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
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          let params = {...this.form}
          /*params.tProgrammeProportionList = JSON.stringify(params.tProgrammeProportionList)*/
          params.fapplicabledepartment = params.fapplicabledepartment.join(',')
          params.fapplicablepositions = params.fapplicablepositions.join(',')
          params.fapplicablepersonnel = params.fapplicablepersonnel.join(',')
          params.tProgrammeProportionList.forEach((item) => {
            delete item.fid
          })
          addTcommission(params).then(res => {
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
</style>
