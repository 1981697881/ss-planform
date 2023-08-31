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
        <!--<el-button :size="'mini'" type="primary" icon="el-icon-edit">费用支付导入</el-button>-->
        <el-button :size="'mini'" type="primary" icon="el-icon-upload2" @click="detailsImport">明细导入</el-button>
        <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
      </el-button-group>
    </el-form>
    <el-dialog
      :visible.sync="visible"
      title="文件"
      v-if="visible"
      :width="'30%'"
      destroy-on-close
      append-to-body
    >
      <el-form :size="'mini'">
        <el-row :span="20">
          <el-radio-group v-model="radio">
            <el-radio label="/web/toutsourceProject/input">外包项目费用明细</el-radio>
            <el-radio label="/web/toutsourcingCustomerService/input">外包客服明细</el-radio>
            <el-radio label="/web/toutsourcingRecruitmentFee/input">外包外聘费用明细</el-radio>
          </el-radio-group>
        </el-row>
        <el-row :gutter="20" style="padding-top: 20px;">
          <el-col :span="24">
            <el-form-item :label="'上传文件'">
              <div style="min-height: 28px">
                <el-upload
                  class="upload-demo"
                  accept=".doc,.docx,.pdf,.xls,.xlsx"
                  :action="radio"
                  :headers="headers"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="handleAvatarSuccess"
                  :on-error="uploadError"
                  :before-remove="beforeRemove"
                  multiple
                  :name="radio=='/web/toutsourceProject/input'?'tOutsourceProjects':(radio=='/web/toutsourcingCustomerService/input'?'tOutsourcingCustomerServiceList':'tOutsourcingRecruitmentFees')"
                  :data="fileData"
                  :limit="1"
                  ref="upload"
                  :auto-upload="false"
                  :on-change="handleUpload"
                  :on-exceed="handleExceed"
                  :file-list="fileList">
                  <el-button>选择</el-button>
                </el-upload>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" style="text-align:center;">
        <el-button type="primary" @click="submitUpload('form')">上传</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>import {mapGetters} from 'vuex'
import {getByUserAndPrId} from '@/api/system/index'
import {getToken} from '@/utils/auth'

export default {
  components: {},
  data() {
    return {
      fileUrl1: '/web/toutsourceProject/input',
      fileUrl2: '/web/toutsourcingCustomerService/input',
      fileUrl3: '/web/toutsourcingRecruitmentFee/input',
      btnList: [],
      headers: {
        'authorization': getToken('ssrx')
      },
      fileData: {},
      fileList: [],
      fileUrl: '',
      fullscreenLoading: false,
      visible: null,
      radio: '/web/toutsourceProject/input',
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
    /*this.fileUrl = `/baoli/inputData/inputProductMessage`*/
    /*this.fileUrl = `/baoli/inputData/input`
    let path = this.$route.meta.id
    getByUserAndPrId(path).then(res => {
      this.btnList = res.data
      this.$forceUpdate()
    })*/
  },
  methods: {
    detailsImport() {
      this.visible = true
    },
    query() {
      this.$emit('queryBtn', this.qFilter())
    },
    handleUpload(file, fileList) {
      if (file.status == 'ready') {
        this.isUpload = true
      }
    },
    submitUpload(form) {
      if (this.isUpload) {
        this.fullscreenLoading = true
        this.$refs.upload.submit()
      } else {
        this.$message({
          message: '请选择文件',
          type: 'warning'
        });
      }
    },
    uploadError(res) {
      this.$message({
        message: '导入失败',
        type: 'warning'
      });
      this.fullscreenLoading = false
    },
    handleAvatarSuccess(res, file) {
      console.log(res)
      if (res.flag) {
        this.$message({
          message: '上传成功',
          type: 'success'
        });
        this.fullscreenLoading = false
        this.visible = false
      } else {
        this.$message({
          message: res.msg,
          type: 'warning'
        });
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 导出
    exportData() {
      this.$emit('exportData')
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.cinemaName != null && this.search.cinemaName != '' ? obj.cinemaName = this.search.cinemaName : null
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
    text-align: center;
  }
</style>
