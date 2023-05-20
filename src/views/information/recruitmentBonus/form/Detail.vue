<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'当前年度'" prop="fkey">
            <el-date-picker
              v-model="form.eur"
              type="year"
              style="width: 100%"
              placeholder="年度">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'Consultant Name'">
            <el-input v-model="form.fkey"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'入职日期'">
            <el-date-picker
              v-model="form.eur"
              type="date"
              style="width: 100%"
              placeholder="年度">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'蜜月过渡期截止日期'">
            <el-date-picker
              v-model="form.eur"
              type="date"
              style="width: 100%"
              placeholder="年度">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'本年度'">
            <el-button>计算</el-button>
            <!--<el-button @click="setRow">增加</el-button>
            <el-button @click="delRow">删除</el-button>-->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-table
          :data="list"
          border
          height="250px"
          stripe
          size="mini"
          :highlight-current-row="true">
          <el-table-column align="center" type="selection"></el-table-column>
          <el-table-column
            v-for="(t,i) in columns"
            :key="i"
            align="center"
            :prop="t.name"
            :label="t.text"
            v-if="t.default!=undefined?t.default:true"
          ></el-table-column>
        </el-table>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'费用明细'">
            <el-button @click="setRow">增加</el-button>
            <el-button @click="delRow">删除</el-button>
            <el-button>导入</el-button>
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
          :highlight-current-row="true">
          <el-table-column align="center" type="selection"></el-table-column>
          <el-table-column
            v-for="(t,i) in columns2"
            :key="i"
            align="center"
            :prop="t.name"
            :label="t.text"
            width="auto"
            v-if="t.default!=undefined?t.default:true"
          ></el-table-column>
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
            <el-form-item :label="'项目编码'">
              <el-input v-model="postform.eur"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'项目名称'" prop="name">
              <el-input v-model="postform.name"></el-input>
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
      columns: [
        {text: '', name: 'title'},
        {text: 'Calculation', name: 'gpName'},
        {text: 'Q1', name: 'gpName'},
        {text: 'Q2', name: 'gpName'},
        {text: 'Q3', name: 'gpName'},
        {text: 'Q4', name: 'gpName'},
        {text: 'Total', name: 'gpName'},
        {text: '填写说明', name: 'remark'},
      ],
      list: [{
        title: '累计Invoiced Amount',
        remark: '取费用明细已回款的开票总额'
      }, {
        title: '累计Invoiced GP',
        remark: '取费用明细已回款的GP数'
      }, {
        title: '累计回款GP',
        remark: '同上，取费用明细已回款的GP数'
      }, {
        title: '累计计提GP',
        remark: '公式'
      }, {
        title: '累计计提比例',
        remark: '计算：累计回款GP/(过去月份累计+当前月薪*剩余月份）,计完后可修改'
      }, {
        title: '累计可提费用',
        remark: '公式'
      }, {
        title: '担保期内费用',
        remark: '取费用明细汇总'
      }, {
        title: '担保冻结费用',
        remark: ''
      }, {
        title: '过担保期可计提部分',
        remark: '公式'
      }, {
        title: '已发放佣金',
        remark: '自动累计'
      }, {
        title: '本月应计发费用',
        remark: '填写'
      }, {
        title: '累计未计发费用',
        remark: '公式'
      }],
      columns2: [
        {text: '开票日期', name: 'gpName'},
        {text: '发票抬头', name: 'gpName'},
        {text: '候选人', name: 'gpName'},
        {text: '已到款', name: 'gpName'},
        {text: 'GP', name: 'gpName'},
        {text: '到款时间', name: 'gpName'},
        {text: '入职日期', name: 'gpName'},
        {text: '担保期', name: 'gpName'},
        {text: '成单顾问', name: 'gpName'},
        {text: '合同编号', name: 'gpName'},
        {text: '支付规则', name: 'gpName'},
        {text: '付款期限', name: 'gpName'},
        {text: '退款条例', name: 'gpName'},
        {text: '奖金系数', name: 'gpName'},
        {text: '奖金金额', name: 'gpName'},
        {text: '担保期内GP', name: 'gpName'},
        {text: '担保期内佣金', name: 'gpName'},
        {text: '备注', name: 'gpName'},
      ],
      list2: [],
      postform: {
        name: null,
        start_time: null,
        end_time: null,
      },
      visible: null,
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
    setRow() {
      this.postform = {
        name: null,
        start_time: null,
        end_time: null,
      }
      this.visible = true
    },
    delRow() {
      if (this.multipleSelection.length > 0) {
        this.multipleSelection.forEach((item) => {
          this.form.product_plan_array[0].plan_time_array.splice(item)
        })
      } else {
        this.$message({
          message: "请选择删除项",
          type: 'error'
        });
      }
    },
    confirmData(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const postForm = {...this.postform}
          if (this.form.product_plan_array[0].plan_time_array.findIndex(item => item.name == postForm.name) == -1) {
            this.form.product_plan_array[0].plan_time_array.push(postForm)
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
