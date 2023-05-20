<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'项目编码'" prop="fkey">
            <el-input v-model="form.fkey"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'公司名称'" prop="fname">
            <el-input v-model="form.fname"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'部门名称'" prop="fvalue">
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
          <el-form-item :label="'部门编码'">
            <el-input v-model="form.fdesc"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'负责人名称'" prop="fvalue">
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
          <el-form-item :label="'负责人编码'">
            <el-input v-model="form.fdesc"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'英文名'">
            <el-input v-model="form.fdesc"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'项目编码'">
            <el-input v-model="form.fdesc"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'项目名称'">
            <el-input v-model="form.fdesc"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'客户编码'">
            <el-input v-model="form.fdesc"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'客户简称'">
            <el-input v-model="form.fdesc"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'客户全称'">
            <el-input v-model="form.fdesc"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {updateProduction} from '@/api/basic/index'

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
        fkey: null,
        fname: null,
        fvalue: null,
        fdesc: null,
      },
      rules: {
        fvalue: [
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
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          updateProduction(this.form).then(res => {
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
