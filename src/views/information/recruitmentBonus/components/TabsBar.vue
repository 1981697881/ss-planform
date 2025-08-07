<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'">
      <el-col :span="2">
        <el-form-item :label="''">
          <el-date-picker
            v-model="search.fannual"
            type="year"
            value-format="yyyy"
            placeholder="年度">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item :label="''">
          <el-date-picker
            v-model="search.name"
            type="month"
            value-format="yyyy-MM"
            placeholder="月份">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item :label="''">
          <el-input v-model="search.fposition" placeholder="负责人"/>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
      </el-col>
      <el-button-group style="float:right">
        <!-- <el-button v-for="(t,i) in btnList" :key="i" v-if="t.category == 'default'" :size="'mini'" type="primary"
                    :icon="t.cuicon" @click="onFun(t.path)">{{t.menuName}}
         </el-button>-->
        <!--@click="printer"-->
        <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handlerAdd">新增</el-button>
        <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handlerAlter">修改</el-button>
        <el-button :size="'mini'" type="primary" icon="el-icon-s-operation" @click="batchCalculation">批量计算</el-button>
        <el-button :size="'mini'" type="primary" icon="el-icon-delete" @click="del">删除</el-button>
        <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handlerInventory">支付清单</el-button>
        <el-upload
          name="payment"
          :on-success="uploadSuccess2"
          :on-error="uploadError2"
          accept="xlsx,xls"
          ref="upload2"
          :headers="headers"
          :show-file-list="false"
          :action="fileUrl2"
          class="upload-demo"
          multiple
          :auto-upload="false"
          :on-change="handleUpload2"
          :limit="1"
        >
          <el-button size="mini" type="primary" icon="el-icon-upload2">费用支付导入</el-button>
          <el-button style="margin-left: 10px;display: none" size="mini" type="success" @click="submitUpload">上传到服务器
          </el-button>
        </el-upload>
        <el-upload
          name="tExpenseDetails"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          accept="xlsx,xls"
          ref="upload"
          :headers="headers"
          :show-file-list="false"
          :action="fileUrl"
          class="upload-demo"
          multiple
          :auto-upload="false"
          :on-change="handleUpload"
          :limit="1"
        >
          <el-button size="mini" type="primary" icon="el-icon-upload2">明细数据导入</el-button>
          <el-button style="margin-left: 10px;display: none" size="mini" type="success" @click="submitUpload">上传到服务器
          </el-button>
        </el-upload>
        <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
      </el-button-group>
    </el-form>
    <el-dialog
      :visible.sync="visible"
      title="选择职员"
      v-if="visible"
      :width="'50%'"
      destroy-on-close
      append-to-body
    >
      <el-form ref="postform" :size="'mini'">
        <!-- <el-row :gutter="20">
           <el-col :span="12">
             <el-form-item label-width="0">
               <el-input v-model="username" placeholder="名称">
                 <el-button slot="append" icon="el-icon-search" @click="fetchFormat"></el-button>
               </el-input>
             </el-form-item>
           </el-col>
         </el-row>-->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'部门'">
              <el-select size="mini"
                         filterable
                         remote
                         :remote-method="remoteMethod2"
                         :loading="loading"
                         @change="changeDept"
                         style="width: 100%"
                         v-model="fdept" placeholder="请选择">
                <el-option
                  v-for="(item,index) in deptArray"
                  :key="index"
                  :label="item.fdeptname"
                  :value="item.fdeptname">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'计算年度'">
              <el-date-picker
                v-model="fannual"
                type="month"
                style="width: 100%"
                value-format="yyyy-MM"
                placeholder="年度">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="20">
          <el-col :span="24">
            <el-table
              class="list-main"
              height="200px"
              :data="list.records"
              border
              size="mini"
              :highlight-current-row="true"
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                v-for="(t,i) in columns"
                :key="i"
                align="center"
                :prop="t.name"
                :label="t.text"
                :width="t.width?t.width:''"
              ></el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" style="text-align:center">
        <el-button type="primary" @click="saveData()" v-loading.fullscreen.lock="fullscreenLoading">计算</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>import {mapGetters} from 'vuex'
import {getByUserAndPrId} from '@/api/system/index'
import {getToken} from '@/utils/auth'
import {getTuserList, getOrganizationsList} from '@/api/basic/index'
import {BatchCount} from '@/api/information/index'

export default {
  components: {},
  data() {
    return {
      btnList: [],
      headers: {
        'authorization': getToken('ssrx')
      },
      fileUrl: '',
      fileUrl2: '',
      visible: null,
      loading: false,
      fullscreenLoading: false,
      fdept: null,
      list: [],
      deptArray: [],
      columns: [
        {text: '工号', name: 'fnumber'},
        {text: '姓名', name: 'fname'},
        {text: '英文名', name: 'fenglishname'},
        {text: '性别', name: 'fgender'},
        {text: '联系电话', name: 'fphone'},
        {text: '邮箱', name: ''},
        {text: '职位', name: 'fduty'},
        {text: '角色', name: 'ftype', width: '130'},
        {text: '部门', name: 'fdept'},
        {text: '最近调职日期', name: '', width: '130'},
        {text: '入职日期', name: 'fjoindate', width: '130'},
        {text: '过渡截止日期', name: 'fcutoffdate', width: '130'},
        {text: '离职日期', name: 'fdeparturedate', width: '130'},
      ],
      username: '',
      fannual: null,
      multipleSelection: [],
      search: {
        fannual: '',
        fposition: '',
        name: '',
        type: 1
      }
    }
  },
  computed: {
    ...mapGetters(['node', 'clickData', 'selections'])
  },
  mounted() {
    this.fileUrl = `/web/expenseDetails/input`
    this.fileUrl2 = `/web/paymentList/input`
    this.getDeptList();
    /*let path = this.$route.meta.id
    getByUserAndPrId(path).then(res => {
      this.btnList = res.data
      this.$forceUpdate()
    })*/
  },
  methods: {
    saveData() {
      if (this.fannual == null) {
        return this.$message({
          message: '请选择年度月份',
          type: 'warning'
        })
      }
      if (this.multipleSelection == 0) {
        return this.$message({
          message: '请选择员工',
          type: 'warning'
        })
      }
      this.fullscreenLoading = true;
      let params = []
      this.multipleSelection.forEach((item)=>{
        params.push({
          fannual: this.fannual.split('-')[0],
          femp: item.fenglishname,
          month: this.fannual.split('-')[1],
          ftype: 0,
          fmonthcost: 0,
          foutmonthcost: 0
        })
      })
      BatchCount(params).then(res => {
        if (res.flag) {
          this.fullscreenLoading = false
          this.$emit('uploadList')
          this.visible = false
        }
      })
    },
    changeDept(val) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.fetchData({fdept: val}, loading);
    },
    remoteMethod2(query) {
      if (query !== '') {
        this.loading = true;
        this.getDeptList({fdeptname: query});
      } else {
        this.deptArray = [];
      }
    },
    getDeptList(val = {}) {
      const data = {
        pageNum: 1,
        pageSize: 10
      }
      getOrganizationsList(data, val).then(res => {
        this.loading = false
        this.deptArray = res.data.records
      })
    },
    fetchFormat() {
      this.fetchData({name: this.username})
    },
    fetchData(val,loading, data = {
      pageNum: 1,
      pageSize: 100
    }) {
      this.loading = true
      getTuserList(data, val).then(res => {
        this.loading = false
        loading.close();
        this.list = res.data
      })
    },
    batchCalculation() {
      this.visible = true
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    query() {
      this.$emit('queryBtn', this.qFilter())
    },
    // 导出
    exportData() {
      this.$emit('exportData')
    },
    submitUpload2() {
      this.$refs.upload2.submit()
    },
    uploadError2(res) {
      this.$message({
        message: res.msg,
        type: 'warning'
      })
      this.$emit('uploadList')
    },
    uploadSuccess2(res) {
      if (res.flag) {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.$emit('uploadList')
        this.$refs.upload2.clearFiles()
      } else {
        this.$message({
          message: res.msg,
          type: 'warning'
        })
      }
    },
    handleUpload2(file, fileList) {
      if (file.status == 'ready') {
        this.submitUpload2()
      }
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    uploadError(res) {
      this.$message({
        message: res.msg,
        type: 'warning'
      })
      this.$emit('uploadList')
    },
    uploadSuccess(res) {
      if (res.flag) {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.$emit('uploadList')
        this.$refs.upload.clearFiles()
      } else {
        this.$message({
          message: res.msg,
          type: 'warning'
        })
      }
    },
    handleUpload(file, fileList) {
      if (file.status == 'ready') {
        this.submitUpload()
      }
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.fposition != null && this.search.fposition != '' ? obj.fposition = this.search.fposition : null
      this.search.fannual != null && this.search.fannual != '' ? obj.fannual = this.search.fannual : null
      obj.ftype = 0
      return obj
    },
    onFun(method, event) {
      this[method](event)
    },
    handlerAdd() {
      this.$emit('showDialog')
    },
    upload() {
      this.search.fposition = ''
      this.search.fannual = ''
      this.$emit('uploadList')
    },
    del() {
      if (this.clickData.fid) {
        this.$confirm('是否删除，删除后将无法恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('del', {fid: this.clickData.fid})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        })
      }
    },
    handlerAlter() {
      if (this.clickData.fid) {
        this.$emit('showDialog', this.clickData)
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        })
      }
    }, handlerInventory() {
      /*this.$emit('showInventory')*/
      if (this.clickData.fid) {
        this.$emit('showInventory', this.clickData)
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        })
      }
    },
  }
}
</script>

<style>
  .upload-demo {
    float: right;
  }
</style>
