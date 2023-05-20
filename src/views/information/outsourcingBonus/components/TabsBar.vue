<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'">
      <el-button-group style="float:right">
       <!-- <el-button v-for="(t,i) in btnList" :key="i" v-if="t.category == 'default'" :size="'mini'" type="primary"
                   :icon="t.cuicon" @click="onFun(t.path)">{{t.menuName}}
        </el-button>-->
        <!--@click="printer"-->
       <!-- <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handlerAdd">新增</el-button>-->
        <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handlerAlter">修改</el-button>
        <!--<el-button :size="'mini'" type="primary" icon="el-icon-delete" @click="del">删除</el-button>-->
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
        'authorization': getToken('waprx')
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
    /*this.fileUrl = `${window.location.origin}/baoli/inputData/inputProductMessage`*/
    /*this.fileUrl = `${window.location.origin}/baoli/inputData/input`
    let path = this.$route.meta.id
    getByUserAndPrId(path).then(res => {
      this.btnList = res.data
      this.$forceUpdate()
    })*/
  },
  methods: {
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
      if (this.selections.length > 0) {
        this.$confirm('是否删除，删除后将无法恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var idArray = []
          this.selections.forEach((item) => {
            idArray.push({fid: item.fid})
          })
          this.$emit('del', idArray)
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
  }
}
</script>

<style>
</style>
