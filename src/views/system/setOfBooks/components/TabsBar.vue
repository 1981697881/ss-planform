<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'">
      <el-row :gutter="10">
        <el-button-group style="float:right">
          <el-button :size="'mini'" type="primary" icon="el-icon-printer" @click="print">打印</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { alterClerk } from '@/api/basic/index'
import { PrintAccount } from '@/tools/doPrint'
import { getByUserAndPrId } from '@/api/system/index'
export default {
  components: {},
  computed: {
    ...mapGetters(['node','clickData','selections'])
  },
  data() {
    return {
      btnList: [],
      search: {
        name: null
      }
    };
  },
  mounted() {
    /*let path = this.$route.meta.id
    getByUserAndPrId(path).then(res => {
      this.btnList = res.data
      this.$forceUpdate();
    });*/
  },
  methods: {
    print() {
      if (this.selections.length > 0) {
        PrintAccount(this.selections)
        LODOP.PREVIEW()
      } else {
        this.$message({
          message: '无选中行',
          type: 'warning'
        });
      }
    },
    onFun(method) {
      console.log(method)
      this[method]()
    },
    Delivery() {
      if (this.clickData.fid) {
        this.$confirm('是否删除（' + this.clickData.name + '），删除后将无法恢复?', '提示', {
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
    },
    disable() {
      if (this.clickData.fid) {
        this.clickData.disable = true
        alterClerk(this.clickData).then(res => {
          if(res.success) {
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
      if (this.clickData.fid) {
        this.clickData.disable = false
        alterClerk(this.clickData).then(res => {
          if(res.success){
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
      this.search.name != null && this.search.name != '' ? obj.fdeptname = this.search.name : null
      return obj
    },
    handlerAdd(){
      this.$emit('showDialog')
    }
  }
};
</script>

<style>
</style>
