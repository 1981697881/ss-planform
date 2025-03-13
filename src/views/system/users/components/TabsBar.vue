<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'">
      <el-button-group style="float:right">
        <!--<el-button :size="'mini'" type="primary" icon="el-icon-error" @click="disable" >禁用</el-button>
        <el-button :size="'mini'" type="primary" icon="el-icon-success" @click="enable" >启用</el-button>-->
        <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handlerAdd">新增</el-button>
        <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handlerAlter">修改</el-button>
        <el-button :size="'mini'" type="primary" icon="el-icon-delete" @click="Delivery">删除</el-button>
        <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
      </el-button-group>
    </el-form>
  </div>
</template>

<script>import { mapGetters } from 'vuex'
import { alterUsers } from '@/api/system/index'
import { getByUserAndPrId } from '@/api/system/index'

export default {
  data() {
    return {
      btnList: [],
      search: {
        name: ''
      }
    }
  },
  computed: {
    ...mapGetters(['node', 'clickData'])
  },
  mounted() {
    /*let path = this.$route.meta.id
    getByUserAndPrId(path).then(res => {
      this.btnList = res.data
      this.$forceUpdate()
    })*/
  },
  methods: {
    onFun(method, event) {
      this[method](event)
    },
    handlerAdd() {
      this.$emit('showDialog')
    },
    handlerAlter() {
      if (this.clickData.id) {
        this.$emit('showDialog', this.clickData)
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        })
      }
    },
    upload() {
      this.$emit('uploadAll')
    },
    disable() {
      if (this.clickData.uid) {
        this.clickData.disable = true
        this.clickData.status = 2
        alterUsers(this.clickData).then(res => {
          if (res.success) {
            this.$emit('uploadAll')
          }
        })
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        })
      }
    },
    enable() {
      if (this.clickData.uid) {
        this.clickData.disable = false
        this.clickData.status = 0
        alterUsers(this.clickData).then(res => {
          if (res.success) {
            this.$emit('uploadAll')
          }
        })
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        })
      }
    },
    Delivery() {
      if (this.clickData.id) {
        this.$confirm('是否删除（' + this.clickData.username + '），删除后将无法恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('delList', this.clickData.id)
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
    }
  }
}
</script>

<style>
</style>
