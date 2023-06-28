<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'简称（客户）'" prop="fcustom">
            <el-input v-model="form.fcustom"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'发票抬头'" prop="finvoice">
            <el-input v-model="form.finvoice"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'合同编号'">
            <el-input v-model="form.fcontractnumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'合同性质'">
            <el-input v-model="form.fcontractnature"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'支付规则'">
            <el-input v-model="form.fpaymentrules"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'付款期限'">
            <el-input v-model="form.fpaymentterm"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'担保期'">
            <el-date-picker
              v-model="form.fwarranty"
              type="date"
              value-format="yyyy-MM-dd"
              style="width: 100%"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'退款条例'">
            <el-input v-model="form.frefundregulations"></el-input>
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
    </el-form>
    <div slot="footer" style="text-align:center;">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {addTcontract} from '@/api/basic/index'

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
        fcustom: null,
        finvoice: null,
        fcontractnumber: null,
        fcontractnature: null,
        fpaymentrules: null,
        fpaymentterm: null,
        fwarranty: null,
        frefundregulations: null,
        feffectivedate: null,
        fexpiringdate: null,
      },
      rules: {
        fcustom: [
          {required: true, message: '请输入', trigger: 'blur'}
        ], finvoice: [
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
          addTcontract(this.form).then(res => {
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
