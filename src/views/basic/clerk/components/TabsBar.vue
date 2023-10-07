<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" >
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item :label="''">
            <el-input v-model="search.name" placeholder="名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-button-group style="float:right">
          <!--<el-button v-for="(t,i) in btnList" :key="i" v-if="t.category == 'default'" :size="'mini'" type="primary" :icon="t.cuicon" @click="onFun(t.path)">{{t.menuName}}</el-button>-->
         <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handlerAdd">新增</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handlerAlter">修改</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-delete" @click="Delivery">删除</el-button>
          <!--<el-button :size="'mini'" type="primary" icon="el-icon-error" @click="disable" >禁用</el-button>
         <el-button :size="'mini'" type="primary" icon="el-icon-success" @click="enable" >启用</el-button>-->
          <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handlerAdjust">调整</el-button>
          <el-upload
            name="tUsers"
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
            <el-button size="mini" type="primary" icon="el-icon-upload2">导入</el-button>
            <el-button style="margin-left: 10px;display: none" size="mini" type="success" @click="submitUpload">上传到服务器
            </el-button>
          </el-upload>
          <el-upload
            name="tUsers"
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
            <el-button size="mini" type="primary" icon="el-icon-upload2">调整记录导入</el-button>
            <el-button style="margin-left: 10px;display: none" size="mini" type="success" @click="submitUpload2">上传到服务器
            </el-button>
          </el-upload>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { alterClerk } from '@/api/basic/index'
import { getByUserAndPrId } from '@/api/system/index'
import { getToken } from '@/utils/auth'
export default {
  components: {},
  computed: {
    ...mapGetters(['node', 'clickData', 'selections'])
  },
  data() {
    return {
      btnList: [],
      headers: {
        'authorization': getToken('ssrx')
      },
      fileUrl: '',
      fileUrl2: '',
      search: {
        name: null
      }
    };
  },
  mounted() {
    this.fileUrl = `/web/tuser/input`
    this.fileUrl2 = `/web/tuser/inputAddAlter`
    /*let path = this.$route.meta.id
    getByUserAndPrId(path).then(res => {
      this.btnList = res.data
      this.$forceUpdate();
    });*/
  },
  methods: {
    submitUpload2() {
      this.$refs.upload2.submit()
    },
    uploadError2(res) {
      this.$confirm(res.msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('uploadList')
      }).catch(() => {
        this.$emit('uploadList')
      });
    },
    uploadSuccess2(res) {
      this.$confirm(res.msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('uploadList')
        this.$refs.upload2.clearFiles()
      }).catch(() => {
        this.$emit('uploadList')
        this.$refs.upload2.clearFiles()
      });
      /*if (res.flag) {
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
      }*/
    },
    handleUpload2(file, fileList) {
      if (file.status == 'ready') {
        this.submitUpload2()
      }
    },submitUpload() {
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
    onFun(method) {
      console.log(method)
      this[method]()
    },
    Delivery() {
      if (this.clickData.fid) {
        this.$confirm('是否删除（' + this.clickData.fname + '），删除后将无法恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('delList', {
            fid: this.clickData.fid
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
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
    },handlerAdjust() {
      if (this.clickData.fid) {
        this.$emit('showAdjustDialog', this.clickData)
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        })
      }
    },
    disable() {
      if (this.clickData.eid) {
        this.clickData.disable = true
        alterClerk(this.clickData).then(res => {
          if(res.flag) {
            this.$emit('uploadList')
          }
        });
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        });
      }
    },
    enable() {
      if (this.clickData.eid) {
        this.clickData.disable = false
        alterClerk(this.clickData).then(res => {
          if(res.flag){
            this.$emit('uploadList')
          }
        })
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        });
      }
    },
    query() {
      this.$emit('queryBtn', this.qFilter())
    },
    upload() {
      this.search.name = ''
      this.$emit('uploadList')
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.name != null && this.search.name != '' ? obj.name = this.search.name : null
      return obj
    },
    handlerAdd(){
      this.$emit('showDialog')
    }
  }
};
</script>

<style>
  .upload-demo {
    float: right;
  }
</style>
