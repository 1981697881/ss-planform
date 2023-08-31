<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'">
      <el-col :span="2">
        <el-form-item :label="''">
          <el-date-picker
            v-model="search.name"
            type="year"
            placeholder="年度">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item :label="''">
          <el-date-picker
            v-model="search.name"
            type="month"
            placeholder="月份">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item :label="''">
          <el-input v-model="search.name" placeholder="职员"/>
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
        <el-button :size="'mini'" type="primary" icon="el-icon-delete" @click="del">删除</el-button>
        <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handlerInventory">支付清单</el-button>
        <el-button :size="'mini'" type="primary" icon="el-icon-edit" >费用支付导入</el-button>
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
  </div>
</template>

<script>import { mapGetters } from 'vuex'
import { getByUserAndPrId } from '@/api/system/index'
import { getToken } from '@/utils/auth'

export default {
  components: {
  },
  data() {
    return {
      btnList: [],
      headers: {
        'authorization': getToken('ssrx')
      },
      fileUrl: '',
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
    /*this.fileUrl = `/baoli/inputData/input`
    let path = this.$route.meta.id
    getByUserAndPrId(path).then(res => {
      this.btnList = res.data
      this.$forceUpdate()
    })*/
  },
  methods: {
    query() {
      this.$emit('queryBtn', this.qFilter())
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
