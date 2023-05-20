<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'名称'" prop="fname">
            <el-input v-model="form.fname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'编码'" prop="fnumber">
            <el-input v-model="form.fnumber" ></el-input>
          </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20">
      <el-col :span="12">
        <el-form-item :label="'描述'" prop="fdesc">
          <el-input v-model="form.fdesc"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>
  import {addDictType} from "@/api/basic/index";
  export default {
    props: {
      gpInfo: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        form: {
          fnumber: null,
          fname: null, // 名称
          fdesc: null,
        },
        pidS:[],
        pArray:[],
        rules: {
          fnumber: [
            {required: true, message: '请输入', trigger: 'blur'},
          ],fname: [
            {required: true, message: '请输入', trigger: 'blur'},
          ]
        },
      };
    },
    created() {
      if(this.gpInfo){
        this.form = this.gpInfo
      }
    },
    mounted() {

    },
    methods: {
      saveData(form) {
        this.$refs[form].validate((valid) => {
          //判断必填项
          if (valid) {
            addDictType(this.form).then(res => {
                this.$emit('hideGroupDialog', false)
                this.$emit('uploadGroup')
              })
          }else {
            return false
          }
        })
      },
    }
  };
</script>

<style>
</style>
