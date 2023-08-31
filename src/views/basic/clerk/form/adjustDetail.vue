<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item :label="'调整日期'">
            <el-date-picker
              v-model="form.falterdate"
              type="date"
              value-format="yyyy-MM-dd"
              style="width: 100%"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
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
        <el-col :span="8">
          <el-form-item :label="'部门'">
            <el-select size="mini"
                       filterable
                       remote
                       :remote-method="remoteMethod2"
                       :loading="loading"
                       style="width: 100%"
                       v-model="form.fdept" placeholder="请选择">
              <el-option
                v-for="(item,index) in deptArray"
                :key="index"
                :label="item.fdeptname"
                :value="item.fdeptname">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item :label="'基本工资'">
            <el-input-number style="width: 100%" :min="0" v-model="form.fbasicsalary"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'Base Line倍数'">
            <el-input v-model="form.fmultiple"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'英文名'">
            <el-input v-model="form.fenglishname"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item :label="'所属顾问'">
            <el-input v-model="form.fbelongconsultant"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
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
        <el-col :span="8">
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
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'调整记录'">
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-table
          border
          height="250px"
          stripe
          size="mini"
          :highlight-current-row="true"
          :data="list"
          align="center"
        >
          <el-table-column prop="date" label="序号" type="index" align="center" sortable></el-table-column>
          <el-table-column
            v-for="(t,i) in columns"
            :key="i"
            align="center"
            :prop="t.name"
            :label="t.text"
          >
          </el-table-column>
        </el-table>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {addTuser, getDutyList, getOrganizationsList, addAlter, getTuserAlterList} from '@/api/basic/index'

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
        fduty: null,
        fdept: null,
        falterdate: null,
        fbasicsalary: null,
        fmultiple: null,
        fisassistant: null,
        fbelongconsultant: true,
        fenglishname: null,
        fiscustomer: null,
      },
      list: [],
      loading: false,
      columns: [
        {text: '职位', name: 'fduty'},
        {text: '角色', name: 'ftype', width: '130'},
        {text: '部门', name: 'fdept'},
        {text: '基本工资', name: 'fbasicsalary'},
        {text: '离职日期', name: 'fdeparturedate', width: '130'},
        {text: '调整日期', name: 'falterdate', width: '130'},
      ],
      disPl: true,
      visible: null,
      username: '',
      pidS: [],
      deptArray: [],
      dutiesArray: [],
      levelFormat: [{name: '管理员', value: '0'}, {name: '生产企业', value: '1'}, {name: '打码平台', value: '2'}, {
        name: '销售员',
        value: '3'
      }],
      rules: {
        jobNum: [
          {required: true, message: '请输入工号', trigger: 'blur'}
        ],
        storeId: [
          {required: true, message: '请输入选择', trigger: 'change'}
        ],
        name: [
          {required: true, message: '请输入名稱', trigger: 'blur'}
        ]
      }
    }
  },
  mounted() {
    console.log(this.listInfo)
    this.getDutiesList();
    this.getDeptList();
    if (this.listInfo) {
      this.form = {...this.listInfo}
      this.form.fempid = this.listInfo.fid
      delete this.form.fid
      this.getUserAlterList({fempid: this.form.fempid})
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
    getDutiesList() {
      const data = {
        pageNum: 1,
        pageSize: 10
      }
      getDutyList(data, {}).then(res => {
        this.loading = false
        this.dutiesArray = res.data.records
      })
    },
    getUserAlterList(val) {
      const data = {
        pageNum: 1,
        pageSize: 1000
      }
      getTuserAlterList(data, val).then(res => {
        this.loading = false
        this.list = res.data.records
      })
    },
    getDeptList() {
      const data = {
        pageNum: 1,
        pageSize: 10
      }
      getOrganizationsList(data, {}).then(res => {
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
          addAlter(this.form).then(res => {
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
    fetchData(val) {
      clerkInfo(val).then(res => {
        this.form = res.data
      })
    }
  }
}
</script>

<style>
</style>
