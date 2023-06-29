<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'工号'" prop="fnumber">
            <el-input v-model="form.fnumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'姓名'" prop="fname">
            <el-input v-model="form.fname"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'性别'">
            <el-select style="width: 100%" v-model="form.fgender" placeholder="请选择">
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
          <el-form-item :label="'联系电话'">
            <el-input v-model="form.fphone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'邮箱'">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'职位'">
            <el-select size="mini"
                      filterable
                      remote
                      :remote-method="remoteMethod"
                      :loading="loading"
                      style="width: 100%"
                      v-model="form.fduty" placeholder="请选择">
              <el-option
                v-for="(item,index) in dutiesArray"
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
          <el-form-item :label="'部门'">
            <el-select size="mini"
                       filterable
                       remote
                       :remote-method="remoteMethod2"
                       :loading="loading"
                       style="width: 100%" v-model="form.fdept" placeholder="请选择">
              <el-option
                v-for="(item,index) in deptArray"
                :key="index"
                :label="item.fdeptname"
                :value="item.fdeptname">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'过渡截至日期'">
            <el-date-picker
              v-model="form.fcutoffdate"
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
          <el-form-item :label="'入职日期'">
            <el-date-picker
              v-model="form.fjoindate"
              type="date"
              value-format="yyyy-MM-dd"
              style="width: 100%"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'转正日期'">
            <el-date-picker
              v-model="form.fregulardate"
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
          <el-form-item :label="'离职日期'">
            <el-date-picker
              v-model="form.fdeparturedate"
              type="date"
              value-format="yyyy-MM-dd"
              style="width: 100%"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'基本工资'">
            <el-input-number style="width: 100%" v-model="form.fbasicsalary"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'Base Line倍数'">
            <el-input v-model="form.fmultiple"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'所属顾问'">
            <el-input v-model="form.fbelongconsultant"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'英文名'">
            <el-input v-model="form.fenglishname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="'是否助理'">
            <el-switch
              style="width: 100%"
              v-model="form.fisassistant"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0">
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="'是否客服'">
            <el-switch
              style="width: 100%"
              v-model="form.fiscustomer"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0">
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {addTuser,getDutyList,getOrganizationsList} from '@/api/basic/index'

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
        fnumber: null,
        fname: null,
        fgender: null,
        fphone: null,
        fduty: null,
        fdept: null,
        fcutoffdate: null,
        fregulardate: null,
        fdeparturedate: null,
        fbasicsalary: null,
        fmultiple: null,
        fjoindate: null,
        fisassistant: null,
        fiscustomer: null,
        fbelongconsultant: null,
        fenglishname: null
      },
      list: [],
      columns: [
        {text: '会员名称', name: 'username'},
        {text: '微信号', name: 'wechatId'},
        {text: '联系地址', name: 'adress'},
        {text: '联系电话', name: 'phoneNumber'},
        {text: '注册时间', name: 'createDatetime'},
        {text: '最后登录时间', name: 'editDatetime'},
        {text: '生日', name: 'birthday'},
        {text: '性别', name: 'sex'},
        {text: '描述', name: 'describes'}
      ],
      disPl: true,
      loading: false,
      visible: null,
      username: '',
      deptArray: [],
      dutiesArray: [],
      levelFormat: [
        {name: '男', value: '男'},
        {name: '女', value: '女'}
      ],
      rules: {
        fnumber: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        storeId: [
          {required: true, message: '请选择', trigger: 'change'}
        ],
        fname: [
          {required: true, message: '请输入', trigger: 'blur'}
        ]
      }
    }
  },
  mounted() {
    this.getDutiesList();
    this.getDeptList();
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        this.getDutiesList({fdutyname: query});
      } else {
        this.dutiesArray = [];
      }
    },
    remoteMethod2(query) {
      if (query !== '') {
        this.loading = true;
        this.getDeptList({fdeptname: query});
      } else {
        this.deptArray = [];
      }
    },
    getDutiesList(val={}) {
      const data = {
        pageNum: 1,
        pageSize: 10
      }
      getDutyList(data, val).then(res => {
        this.loading = false
        this.dutiesArray = res.data.records
      })
    },
    getDeptList(val={}) {
      const data = {
        pageNum: 1,
        pageSize: 10
      }
      getOrganizationsList(data, val).then(res => {
        this.loading = false
        this.deptArray = res.data.records
      })
    },
    query() {
      this.visible = true
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          addTuser(this.form).then(res => {
            this.$emit('hideDialog', false)
            this.$emit('uploadList')
          })
        } else {
          return false
        }
      })
    },

    dblclick(obj) {
      this.visible = false
      this.form.wechatName = obj.username
      this.form.uid = obj.uid
    },
  }
}
</script>

<style>
</style>
