<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'工号'" prop="jobNum">
            <el-input v-model="form.jobNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'姓名'" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'性别'">
            <el-select style="width: 100%" v-model="form.fparentname" placeholder="请选择">
              <el-option
                v-for="(item,index) in levelFormat"
                :key="index"
                :label="item.fdutyname"
                :value="item.fid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'联系电话'">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'调整时间'">
            <el-date-picker
              v-model="form.eur"
              type="datetime"
              style="width: 100%"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'职位'">
            <el-select style="width: 100%" v-model="form.fparentname" placeholder="请选择">
              <el-option
                v-for="(item,index) in levelFormat"
                :key="index"
                :label="item.fdutyname"
                :value="item.fid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'部门'">
            <el-select style="width: 100%" v-model="form.fparentname" placeholder="请选择">
              <el-option
                v-for="(item,index) in levelFormat"
                :key="index"
                :label="item.fdutyname"
                :value="item.fid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'过渡截至日期'">
            <el-date-picker
              v-model="form.eur"
              type="date"
              style="width: 100%"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'转正日期'">
            <el-date-picker
              v-model="form.eur"
              type="date"
              style="width: 100%"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'离职日期'">
            <el-date-picker
              v-model="form.eur"
              type="date"
              style="width: 100%"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'基本工资'">
            <el-input-number style="width: 100%" v-model="form.address"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'Base Line倍数'">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'是否助理'">
            <el-switch
              style="width: 100%"
              v-model="form.eur"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="100"
              inactive-value="0">
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'所属顾问'">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'英文名'">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'是否客服'">
            <el-switch
              style="width: 100%"
              v-model="form.eur"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="100"
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

<script>import {addClerk, alterClerk, clerkInfo} from '@/api/basic/index'

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
        eid: null,
        jobNum: null,
        address: null,
        tel: null,
        uid: null,
        disable: true,
        username: null,
        remark: null,
        name: null// 名称
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
      visible: null,
      username: '',
      pidS: [],
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
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    query() {
      this.visible = true
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          if (typeof (this.form.eid) != undefined && this.form.eid != null) {
            alterClerk(this.form).then(res => {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            })
          } else {
            addClerk(this.form).then(res => {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            })
          }
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
