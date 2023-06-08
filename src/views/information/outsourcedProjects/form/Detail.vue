<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item :label="'公司名称'" prop="fcompanyname">
            <el-input v-model="form.fcompanyname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'项目编码'" prop="fprojectnumber">
            <el-input v-model="form.fprojectnumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'项目名称'" prop="fprojectname">
            <el-input v-model="form.fprojectname"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item :label="'部门名称'">
            <el-select filterable
                       remote
                       @change="changeDept"
                       :remote-method="remoteMethod3"
                       :loading="loading" style="width: 100%" v-model="form.fdeptname" placeholder="请选择">
              <el-option
                v-for="(item,index) in organizationsList"
                :key="index"
                :label="item.fdeptname"
                :value="item.fdeptname">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'部门编码'">
            <el-input v-model="form.fdeptcode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'负责人名称'">
            <el-select filterable
                       remote
                       :remote-method="remoteMethod"
                       :loading="loading" @change="checkUser" style="width: 100%" v-model="form.fname"
                       placeholder="请选择">
              <el-option
                v-for="(item,index) in userList"
                :key="index"
                :label="item.fname"
                :value="item.fname">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item :label="'负责人编码'">
            <el-input v-model="form.fnumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'英文名'">
            <el-input v-model="form.fenglishname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'客户编码'">
            <el-input v-model="form.fcustomnumber"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item :label="'客户简称'">
            <el-input v-model="form.fcustomabbreviation"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="'客户全称'">
            <el-input v-model="form.fcustomfullname"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>import {addTproject} from '@/api/information/index'
import {getTuserList, getOrganizationsList} from '@/api/basic/index'

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
        fcommissioncategory: null,
        fcommissioncategorynumber: null,
        fcompanyname: null,
        fcustomabbreviation: null,
        fcustomfullname: null,
        fcustomnumber: null,
        fdeptcode: null,
        fdeptname: null,
        fenglishname: null,
        fname: null,
        fnumber: null,
        fprojectname: null,
        fprojectnumber: null,
      },
      loading: false,
      userList: [],
      organizationsList: [],
      rules: {
        fcompanyname: [
          {required: true, message: '请输入', trigger: 'blur'}
        ], fprojectname: [
          {required: true, message: '请输入', trigger: 'blur'}
        ], fprojectnumber: [
          {required: true, message: '请输入', trigger: 'blur'}
        ], fdeptname: [
          {required: true, message: '请选择', trigger: 'change'}
        ]
      }
    }
  },
  mounted() {
    this.getUsersArray()
    this.getOrganizationsArray()
    if (this.listInfo) {
      this.form = this.listInfo
    }
  },
  methods: {
    changeDept(val) {
      this.organizationsList.forEach((item) => {
        if (item.fdeptname == val) {
          this.form.fdeptcode = item.fid
        }
      })
    },
    checkUser(val) {
      this.userList.forEach((item) => {
        console.log(item)
        if (val == item.fname) {
          this.form.fnumber = item.fnumber
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
    remoteMethod3(query) {
      if (query !== '') {
        this.loading = true;
        this.getOrganizationsArray({fdeptname: query});
      } else {
        this.organizationsList = [];
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
    getOrganizationsArray(val = {}, data = {
      pageNum: 1,
      pageSize: 10
    }) {
      getOrganizationsList(data, val).then(res => {
        if (res.flag) {
          this.loading = false;
          this.organizationsList = res.data.records
        }
      });
    },
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          addTproject(this.form).then(res => {
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
