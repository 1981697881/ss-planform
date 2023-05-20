<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'提成方案名称'" prop="fcommissionplanname">
            <el-input v-model="form.fcommissionplanname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'日期'">
            <el-date-picker
              v-model="form.fdate"
              type="date"
              style="width: 100%"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'适用计算表'">
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
          <el-form-item :label="'提成方式'">
            <el-select style="width: 100%" v-model="form.fcommissionmethod" placeholder="请选择">
              <el-option
                v-for="(item,index) in levelFormat1"
                :key="index"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'固定提成方式'">
            <el-select style="width: 100%" v-model="form.fregularcommissionmethod" placeholder="请选择">
              <el-option
                v-for="(item,index) in levelFormat2"
                :key="index"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'固定提成值'">
            <el-input v-model="form.fregularcommissionvalue"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'适用部门'">
            <el-select style="width: 100%" multiple v-model="form.fapplicabledepartment" placeholder="请选择">
              <el-option
                v-for="(item,index) in deptArray"
                :key="index"
                :label="item.fdeptname"
                :value="item.fid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'适用岗位'">
            <el-select style="width: 100%" multiple v-model="form.fapplicablepositions" placeholder="请选择">
              <el-option
                v-for="(item,index) in dutiesArray"
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
          <el-form-item :label="'适用人员'" prop="fvalue">
            <el-select style="width: 100%" multiple v-model="form.fapplicablepersonnel" placeholder="请选择">
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
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'生效日期'">
            <el-date-picker
              v-model="form.feffectivedate"
              type="date"
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
              style="width: 100%"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'提成设定'">
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
            <el-form-item :label="'提成类型'">
              <el-input v-model="postform.gpName1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'开始金额'">
              <el-input v-model="postform.gpName2"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'结束金额'">
              <el-input v-model="postform.gpName3"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'提成比例%'">
              <el-input v-model="postform.gpName4"></el-input>
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

<script>import {addTcommission, getTuserList, getDutyList, getOrganizationsList} from '@/api/basic/index'

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
        fcommissionplanname: null,
        fdate: null,
        fcommissionmethod: null,
        fregularcommissionmethod: null,
        fregularcommissionvalue: null,
        fapplicabledepartment: null,
        fapplicablepositions: null,
        fapplicablepersonnel: null,
        feffectivedate: null,
        fexpiringdate: null,
      },
      columns: [
        {text: '提成类型', name: 'gpName1'},
        {text: '开始金额', name: 'gpName2'},
        {text: '结束金额', name: 'gpName3'},
        {text: '提成比例%', name: 'gpName4'}
      ],
      list: [],
      deptArray: [],
      dutiesArray: [],
      usersArray: [],
      levelFormat1: [
        {name: '固定', value: '固定'},
        {name: '阶梯式', value: '阶梯式'}
      ],
      levelFormat2: [
        {name: '比例', value: '比例'},
        {name: '金额', value: '金额'}
      ],
      postform: {
        gpName1: null,
        gpName2: null,
        gpName3: null,
        gpName4: null,
      },
      visible: null,
      rules: {
        fcommissionplanname: [
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
    this.getDutiesList();
    this.getDeptList();
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
    getDutiesList() {
      const data = {
        pageNum: 1,
        pageSize: 1000
      }
      getDutyList(data, {}).then(res => {
        this.dutiesArray = res.data.records
      })
    },
    getDeptList() {
      const data = {
        pageNum: 1,
        pageSize: 1000
      }
      getOrganizationsList(data, {}).then(res => {
        this.deptArray = res.data.records
      })
    },
    setRow() {
      this.postform = {
        gpName1: null,
        gpName2: null,
        gpName3: null,
        gpName4: null,
      }
      this.visible = true
    },
    delRow() {
      if (this.multipleSelection.length > 0) {
        this.multipleSelection.forEach((item) => {
          this.form.list.splice(item)
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
          if (this.form.list.findIndex(item => item.gpName1 == postForm.gpName1) == -1) {
            this.form.list.push(postForm)
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
          addTcommission(this.form).then(res => {
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
