<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'年度'" prop="fannual">
            <el-date-picker
              v-model="form.fannual"
              type="year"
              value-format="yyyy"
              style="width: 100%"
              placeholder="年度">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'项目负责人'" prop="fprojectleader">
            <el-select filterable
                       remote
                       :remote-method="remoteMethod"
                       :loading="loading" style="width: 100%" v-model="form.fprojectleader" placeholder="请选择">
              <el-option
                v-for="(item,index) in userList"
                :key="index"
                :label="item.fenglishname"
                :value="item.fenglishname">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item :label="'本年度项目GP'">
            <el-input v-model="form.fthisyeargp"></el-input>
          </el-form-item>
        </el-col><el-col :span="8">
          <el-form-item :label="'上年度项目GP'">
            <el-input v-model="form.flastyeargp"></el-input>
          </el-form-item>
        </el-col><el-col :span="8">
          <el-form-item :label="'年度目标GP'">
            <el-input v-model="form.fannualgoalgp"></el-input>
          </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20">
        <el-col :span="8">
          <el-form-item :label="'存量GP管理奖金3%'">
            <el-input v-model="form.fstockbonus"></el-input>
          </el-form-item>
        </el-col><el-col :span="8">
          <el-form-item :label="'新增GP管理奖金5%'">
            <el-input v-model="form.faddbonus"></el-input>
          </el-form-item>
        </el-col><el-col :span="8">
          <el-form-item :label="'达标奖金1%'">
            <el-input v-model="form.fcompliancebonus"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
    <el-col :span="12">
      <el-form-item :label="'负责项目'">
        <el-button @click="setRow">增加</el-button>
        <el-button @click="delRow">删除</el-button>
      </el-form-item>
    </el-col>
  </el-row>
    <el-row :gutter="20">
      <el-table class="tableBox" ref="multipleTable"  @selection-change="handleSelectionChange" border height="250px" stripe size="mini" :highlight-current-row="true" :data="form.fresponsibleproject" align="center" :cell-style="myclass" highlight-current-row>
        <el-table-column align="center" type="selection"></el-table-column>
        <el-table-column prop="date" label="序号" type="index" align="center" sortable></el-table-column>
        <template
          v-for="(t,i) in columns"
        >
          <el-table-column
            :key="i"
            align="center"
            :prop="t.name"
            v-if="t.name == 'gpName2'"
            :label="t.text"
          >
            <template slot-scope="scope">
              <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 //-->
              <el-select size="mini" filterable
                         remote
                         @change="checkProject($event,scope.row)"
                         :remote-method="remoteMethod4"
                         :loading="loading" style="width: 100%" v-if="!t.sfkgg" v-model="scope.row[t.name]"
                         placeholder="请选择">
                <el-option
                  v-for="item in projectList"
                  :key="item.fid"
                  :label="item.fprojectname"
                  :value="item.fprojectname">
                </el-option>
              </el-select>
              <span>{{scope.row[t.name]}}</span>
            </template>
          </el-table-column>
          <el-table-column
            :key="i"
            align="center"
            :prop="t.name"
            v-else
            :label="t.text"
          >
            <template slot-scope="scope">
              <!--// 通过 v-if="!item.sfkgg" 控制是否可编辑单元格 frecamt fpayamt//-->
             <!-- <el-input size="mini" v-if="!t.sfkgg" v-model="scope.row[t.name]" clearable/>-->
              <span>{{scope.row[t.name]}}</span>
            </template>
          </el-table-column>
        </template>
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

<script>import {getTuserList, getDutyList, getOrganizationsList} from '@/api/basic/index'
import {addTbonus, getTprojectList} from '@/api/information/index'

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
        fprojectleader: null,
        fannual: null,
        fcommissionplanname: null,
        flastyeargp: null,
        fannualgoalgp: null,
        fstockbonus: null,
        faddbonus: null,
        fresponsibleproject: []
      },
      columns: [
        {text: '项目编码', name: 'gpName1'},
        {text: '项目名称', name: 'gpName2'},
      ],
      list: [],
      loading: false,
      userList: [],
      dutyList: [],
      organizationsList: [],
      multipleSelection: [],
      projectList: [],
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
        fannual: [
          {required: true, message: '请选择', trigger: 'change'}
        ], fprojectleader: [
          {required: true, message: '请选择', trigger: 'change'}
        ],
      }
    }
  },
  mounted() {
    this.getUsersArray()
    this.getDutyArray()
    this.getOrganizationsArray()
    this.getProjectArray()
    if (this.listInfo) {
      this.form = this.listInfo
      this.form.fresponsibleproject = JSON.parse(this.form.fresponsibleproject)
    }
  },
  methods: {
    checkProject(val, row) {
      this.projectList.forEach((item) => {
        if (item.fprojectname == val) {
          row.gpName1 = item.fprojectnumber
        }
      })
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        this.getUsersArray({fname: query});
      } else {
        this.userList = [];
      }
    },
    remoteMethod2(query) {
      if (query !== '') {
        this.loading = true;
        this.getDutyArray({fdutyname: query});
      } else {
        this.dutyList = [];
      }
    },
    remoteMethod3(query) {
      if (query !== '') {
        this.loading = true;
        this.getOrganizationsArray({fdeptname: query});
      } else {
        this.organizationsList = [];
      }
    }, remoteMethod4(query) {
      if (query !== '') {
        this.loading = true;
        this.getProjectArray({fprojectname: query});
      } else {
        this.projectList = [];
      }
    },
    getProjectArray(val = {}, data = {
      pageNum: 1,
      pageSize: 10
    }) {
      getTprojectList(data, val).then(res => {
        if (res.flag) {
          this.loading = false;
          this.projectList = res.data.records
        }
      });
    },
    myclass({ row, columnIndex }) {
      if (row[columnIndex] && !row[columnIndex].sfcb && row[columnIndex].sfcb != null ) {
        return "color: red";
      }
    },
    setRow() {
      var obj ={}
      for(var i = 1;i<2;i++){
        obj['gpName'+i] = "";
      }
      var itemObj = Object.assign({
        sfkgg: true,
        sfcb: null,
      }, obj)
      console.log(itemObj)
      if(this.form.fresponsibleproject == null){
        this.form.fresponsibleproject = []
      }
      this.form.fresponsibleproject.push(itemObj)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    delRow() {
      if(this.multipleSelection.length>0){
        this.multipleSelection.forEach((item)=>{
          this.form.fresponsibleproject.splice(item)
        })
      }else{
        this.$message({
          message: "请选择删除项",
          type: 'error'
        });
      }
    },
    getUsersArray(val={}, data = {
      pageNum: 1,
      pageSize: 10
    }) {
      getTuserList(data, val).then(res => {
        if(res.flag) {
          this.loading = false;
          this.userList = res.data.records
        }
      });
    },
    getDutyArray(val={}, data = {
      pageNum: 1,
      pageSize: 10
    }) {
      getDutyList(data, val).then(res => {
        if(res.flag) {
          this.loading = false;
          this.dutyList = res.data.records
        }
      });
    },
    getOrganizationsArray(val={}, data = {
      pageNum: 1,
      pageSize: 10
    }) {
      getOrganizationsList(data, val).then(res => {
        if(res.flag) {
          this.loading = false;
          this.organizationsList = res.data.records
        }
      });
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
          let params = {...this.form}
          params.fresponsibleproject = JSON.stringify(params.fresponsibleproject);
          addTbonus(params).then(res => {
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
