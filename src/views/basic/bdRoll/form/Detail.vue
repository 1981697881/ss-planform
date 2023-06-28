<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'合同编号'" prop="fcontractnumber">
            <el-input v-model="form.fcontractnumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'公司名称'" prop="fcompanyname">
            <el-input v-model="form.fcompanyname"></el-input>
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
          <el-form-item :label="'BD职员'">
            <el-select
              size="mini"
              filterable
              remote
              :remote-method="remoteMethod"
              :loading="loading"
              style="width: 100%" v-model="form.fbdclerk" placeholder="请选择">
              <el-option
                v-for="(item,index) in usersList"
                :key="index"
                :label="item.fname"
                :value="item.fname">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'合同对接人'">
            <el-select
              size="mini"
              filterable
              remote
              :remote-method="remoteMethod"
              :loading="loading"
              style="width: 100%" v-model="form.fcontactperson" placeholder="请选择">
              <el-option
                v-for="(item,index) in usersList"
                :key="index"
                :label="item.fname"
                :value="item.fname">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'签约主体'">
            <el-input v-model="form.fcontractingentity"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'合同性质'">
            <el-input v-model="form.fcontractnature"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
       <!-- <el-col :span="12">
          <el-form-item :label="'提成比例'">
            <el-input v-model="form.fcommissionratio"></el-input>
          </el-form-item>
        </el-col>-->
        <el-col :span="24">
          <el-form-item :label="'备注'">
            <el-input v-model="form.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {addTbonusManagement,getTuserList} from '@/api/basic/index'

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
        fcontractnumber: null,
        fcompanyname: null,
        feffectivedate: null,
        fexpiringdate: null,
        fbdclerk: null,
        fcontactperson: null,
        fcontractingentity: null,
        fcontractnature: null,
        fcommissionratio: null,
        remark: null
      },
      loading: false,
      usersList: [],
      rules: {
        fcontractnumber: [
          {required: true, message: '请输入', trigger: 'blur'}
        ], fcompanyname: [
          {required: true, message: '请输入', trigger: 'blur'}
        ], fname: [
          {required: true, message: '请输入', trigger: 'blur'}
        ]
      }
    }
  },
  mounted() {
    this.fetchUserData()
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        this.fetchUserData({fname: query});
      } else {
        this.usersList = [];
      }
    },
    fetchUserData(val={}, data = {
      pageNum: 1,
      pageSize:  10
    }) {
      getTuserList(data, val).then(res => {
        this.loading = false
        this.usersList = res.data.records
      });
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          addTbonusManagement(this.form).then(res => {
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
