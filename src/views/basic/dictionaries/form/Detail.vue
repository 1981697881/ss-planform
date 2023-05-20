<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="80px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'类型'" prop="ftypeid">
            <el-select v-model="form.ftypeid" placeholder="请选择">
              <el-option
                v-for="(item,index) in tyepArray"
                :key="index"
                :label="item.fname"
                :value="item.fid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'编码'" prop="fnumber">
            <el-input v-model="form.fnumber" ></el-input>
          </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'名称'" prop="fname">
            <el-input v-model="form.fname" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'描述'" prop="fdesc">
            <el-input v-model="form.fdesc" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;padding-top: 15px">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>
<script>
import { getDictTypeList ,addDict} from '@/api/basic/index'

export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    },
    // 是否自适应宽度，不自适应宽度默认为120px
    selfAdaption: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      form: {
        ftypeid: null,
        fname: null, // 名称
        fnumber: null,
        fdesc: null
      },
      visible: false,
      tyepArray: [],
      rules: {
        fname: [
          { required: true, message: '请输入名稱', trigger: 'blur' }
        ],
        fnumber: [
          { required: true, message: '请输入编码', trigger: 'blur' }
        ],
        ftypeid: [
          { required: true, message: '请选择', trigger: 'change' }
        ]

      },
    }
  },
  created() {

  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData(val={}, data = {
      pageNum: 1,
      pageSize:  50
    }) {
      getDictTypeList(data, val).then(res => {
        this.tyepArray = res.data.records
      });
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        //判断必填项
        if (valid) {
          let obj = this.form
            addDict(obj).then(res => {
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
