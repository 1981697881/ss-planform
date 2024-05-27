<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'">
      <el-col :span="4">
        <el-form-item :label="''">
          <el-input v-model="search.name" placeholder="关键字"/>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
      </el-col>
      <el-button-group style="float:right">
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
          <el-button size="mini" type="primary" icon="el-icon-upload2">导入</el-button>
          <el-button style="margin-left: 10px;display: none" size="mini" type="success" @click="submitUpload">上传到服务器
          </el-button>
        </el-upload>
        <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
      </el-button-group>
    </el-form>
  </div>
</template>

<script>import { mapGetters } from 'vuex'
import { getByUserAndPrId } from '@/api/system/index'
import { getToken } from '@/utils/auth'
import {getTuserBatchList, getOrganizationsList} from '@/api/basic/index'
import {BatchCount} from '@/api/information/index'
export default {
  components: {
  },
  data() {
    return {
      btnList: [],
      headers: {
        'authorization': getToken('hlrx')
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
  },
  methods: {
    fetchFormat() {
      this.fetchData({name: this.username})
    },
    fetchData(val,loading, data = {
      pageNum: 1,
      pageSize: 100
    }) {
      this.loading = true
      getTuserBatchList(data, val).then(res => {
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
      if (res.success) {
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
    // 导出
    exportData() {
      this.$emit('exportData')
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
      if (res.success) {
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
      this.search.cinemaName != null && this.search.cinemaName != '' ? obj.cinemaName = this.search.cinemaName : null
      obj.ftype = 1
      return obj
    },
    onFun(method, event) {
      this[method](event)
    },
    handlerAdd() {
      this.$emit('showDialog')
    },
    upload() {
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
    },
    handlerInventory() {
     // this.$emit('showInventory')
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
