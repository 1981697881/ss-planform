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
          <el-form-item :label="'业绩目标'">
            <el-input v-model="form.fteamkpi"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'权重占比'">
            <el-input v-model="form.fbonusweight"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'奖金系数'">
            <el-input v-model="form.fteambonuscoefficient"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'团队状态'">
            <el-radio-group style="width: 100%" v-model="form.fteamstatus">
              <el-radio :label="'启用'">启用</el-radio>
              <el-radio :label="'禁用'">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'所属年度'">
            <el-date-picker
              v-model="form.fbelongannual"
              type="year"
              value-format="yyyy"
              style="width: 100%"
              placeholder="年度">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'团队负责人'">
            <el-select
              filterable
              remote
              :remote-method="remoteMethod"
              :loading="loading"
              style="width: 100%"
              v-model="form.fteamleader"
              placeholder="请选择">
              <el-option
                v-for="item in userList"
                :key="item.fid"
                :label="item.fenglishname +'-'+item.fname"
                :value="item.fenglishname">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'团队成员'">
            <el-button @click="setRow">增加</el-button>
            <el-button @click="delRow">删除</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-table class="tableBox" ref="multipleTable" @selection-change="handleSelectionChange" border height="250px"
                  stripe size="mini" :highlight-current-row="true" :data="form.fteammembers" align="center"
                  :cell-style="myclass" highlight-current-row>
          <el-table-column align="center" type="selection"></el-table-column>
          <el-table-column prop="date" label="序号" type="index" align="center" sortable></el-table-column>
          <el-table-column
            v-for="(t,i) in columns"
            :key="i"
            align="center"
            :prop="t.name"
            :label="t.text"
          >
            <template slot-scope="scope">
              <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
              <el-select filterable
                         remote
                         :remote-method="remoteMethod"
                         :loading="loading" style="width: 100%" v-if="!t.sfkgg" v-model="scope.row[t.name]"
                         placeholder="请选择">
                <el-option
                  v-for="item in userList"
                  :key="item.fid"
                  :label="item.fenglishname +'-'+item.fname"
                  :value="item.fenglishname">
                </el-option>
              </el-select>
              <span>{{scope.row[t.name]}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {addTteam} from '@/api/information/index'
import {getTuserList} from '@/api/basic/index'

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
        fteamkpi: null,
        fbonusweight: null,
        fteambonuscoefficient: null,
        fteamstatus: '启用',
        fbelongannual: null,
        fteamleader: null,
        fteammembers: [],
      },
      loading: false,
      columns: [
        {text: '成员名称', name: 'gpName'}
      ],
      userList: [],
      multipleSelection: [],
      rules: {
        fteamleader: [
          {required: true, message: '请选择', trigger: 'change'}
        ], fkey: [
          {required: true, message: '请输入', trigger: 'blur'}
        ], fname: [
          {required: true, message: '请输入', trigger: 'blur'}
        ]
      }
    }
  },
  mounted() {
    this.getUsersArray()
    if (this.listInfo) {
      this.form = this.listInfo
      this.form.fteammembers = JSON.parse(this.form.fteammembers)
    }
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        this.getUsersArray({fenglishname: query});
      } else {
        this.userList = [];
      }
    },
    myclass({row, columnIndex}) {
      if (row[columnIndex] && !row[columnIndex].sfcb && row[columnIndex].sfcb != null) {
        return "color: red";
      }
    },
    setRow() {
      var obj = {"gpName": ""}
      var itemObj = Object.assign({
        sfkgg: true,
        sfcb: null,
      }, obj)
      console.log(itemObj)
      if(this.form.fteammembers == null){
        this.form.fteammembers = []
      }
      this.form.fteammembers.push(itemObj)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    delRow() {
      if (this.multipleSelection.length > 0) {
        this.multipleSelection.forEach((item) => {
          this.form.fteammembers.splice(item)
        })
      } else {
        this.$message({
          message: "请选择删除项",
          type: 'error'
        });
      }
    },
    getUsersArray(val = {}, data = {
      pageNum: 1,
      pageSize: 10
    }) {
      getTuserList(data, val).then(res => {
        if (res.flag) {
          this.loading = false;
          this.userList = res.data.records
        }
      });
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          let params = {...this.form}
          params.fteammembers = JSON.stringify(params.fteammembers);
          addTteam(params).then(res => {
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
<style scoped>
  .tableBox {
    margin-bottom: 20px;
  }

  /* 通过显隐控制input框的状态 */
  .tableBox .el-input {
    display: none;
  }

  .tableBox .current-row .el-input {
    display: block;
  }

  .tableBox .current-row .el-input + span {
    display: none;
  }

  /* 通过显隐控制input框的状态 */
  .tableBox .el-select {
    display: none;
  }

  .tableBox .current-row .el-select {
    display: block;
  }

  .tableBox .current-row .el-select + span {
    display: none;
  }
</style>
