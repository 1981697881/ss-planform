<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="150px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'子团队名称'" prop="fdeptname">
            <el-input v-model="form.fdeptname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'团队名称'" prop="ffullname">
            <el-input v-model="form.ffullname"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'上级团队'">
            <el-select v-model="form.fparentname" placeholder="请选择">
              <el-option
                v-for="(item,index) in options"
                :key="index"
                :label="item.fdeptname"
                :value="item.fid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'团队负责人'" prop="fheader">
            <el-select v-model="form.fheader" placeholder="请选择">
              <el-option
                v-for="(item,index) in usersList"
                :key="index"
                :label="item.username"
                :value="item.uid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {addOrganizations,getOrganizationsList,getUsersList} from '@/api/basic/index'

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
        fdeptname: null,
        fparentname: null,
        ffullname: null,
        fheader: null,
        fisno: 0,
        fgettype: '全款',
      },
      options: [],
      usersList: [],
      disPl: true,
      rules: {
        fdeptname: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        fheader: [
          {required: true, message: '请选择', trigger: 'change'}
        ]
      }
    }
  },
  mounted() {
    this.fetchData()
    this.fetchUserData()
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    fetchData(val={}, data = {
      pageNum: 1,
      pageSize:  500
    }) {
      getOrganizationsList(data, val).then(res => {
        this.options = res.data.records
      });
    },
    fetchUserData(val={}, data = {
      pageNum: 1,
      pageSize:  500
    }) {
      getUsersList(data, val).then(res => {
        this.usersList = res.data.records
      });
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          addOrganizations(this.form).then(res => {
            this.$emit('hideDialog', false)
            this.$emit('uploadList')
          })
        } else {
          return false
        }
      })
    },
  }
}
</script>

<style>
</style>
