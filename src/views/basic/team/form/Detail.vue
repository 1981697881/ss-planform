<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'团队名称'" prop="fteamname">
            <el-input v-model="form.fteamname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'团队描述'" prop="fteamdescribe">
            <el-input v-model="form.fteamdescribe"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'团队业绩目标'">
            <el-input-number style="width: 100%" :min="0" v-model="form.fteamkpi"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'奖金权重占比'">
            <el-input v-model="form.fbonusweight"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'团队禁用状态'">
            <el-input v-model="form.fteamstatus"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'团队个人达标率'">
            <el-input v-model="form.fteamcompliance"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'团队奖金系数'">
            <el-input v-model="form.fteambonuscoefficient"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'人员'">
            <el-select style="width: 100%" multiple v-model="form.fteamname" placeholder="请选择">
              <el-option
                v-for="(item,index) in usersArray"
                :key="index"
                :label="item.fname"
                :value="item.fid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'团队成员'">
            <el-button @click="setRow">增加</el-button>
            <el-button @click="delRow">删除</el-button>
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
      </el-row>-->
    </el-form>
    <!--<el-dialog
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
    </el-dialog>-->
    <div slot="footer" style="text-align:center;">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {addTTeam,getTuserList} from '@/api/basic/index'

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
        fteamname: null,
        fteamdescribe: null,
        fteamkpi: 0,
        fbonusweight: null,
        fteamstatus: null,
        fteamcompliance: null,
        fteambonuscoefficient: null,
        fteammembers: [],
      },
      columns: [
        { text: '职员姓名', name: 'gpName' }
      ],
      list: [],
      usersArray: [],
      postform: {
        name: null,
        start_time: null,
        end_time: null,
      },
      visible: null,
      rules: {
        fteamname: [
          {required: true, message: '请输入', trigger: 'blur'}
        ]
      }
    }
  },
  mounted() {
    this.getUsersList();
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    getUsersList() {
      const data = {
        pageNum: 1,
        pageSize: 1000
      }
      getTuserList(data, {}).then(res => {
        this.usersArray = res.data.records
      })
    },
    setRow() {
      this.postform = {
        name: null,
        start_time: null,
        end_time: null,
      }
      this.visible = true
    },
    delRow() {
      if(this.multipleSelection.length>0){
        this.multipleSelection.forEach((item)=>{
          this.form.product_plan_array[0].plan_time_array.splice(item)
        })
      }else{
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
          if(this.form.product_plan_array[0].plan_time_array.findIndex(item =>item.name == postForm.name) == -1){
            this.form.product_plan_array[0].plan_time_array.push(postForm)
            this.visible = false
          }else{
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
          addTTeam(this.form).then(res => {
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
