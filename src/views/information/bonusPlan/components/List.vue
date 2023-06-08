<template>
  <div>

    <list
      class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      @handle-size="handleSize"
      @handle-current="handleCurrent"
      @row-click="rowClick"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getTbonusList, deleteTbonus } from '@/api/information/index'
import List from '@/components/List'

export default {
  components: {
    List
  },
  computed: {
    ...mapGetters(['node'])
  },
  data() {
    return {
      loading: false,
      visible: false,
      list: {},
      fid: null,
      type: null,
      columns: [
        { text: '年度', name: 'fannual' },
        { text: '项目负责人', name: 'fprojectleader', width: '130'  },
        { text: '本年度项目GP', name: 'fthisyeargp', width: '130' },
        { text: '上年度项目GP', name: 'flastyeargp', width: '130' },
        { text: '年度目标GP', name: 'fthisyeargp', width: '130'  },
        { text: '存量GP管理奖金3%', name: 'fstockbonus', width: '130'  },
        { text: '新增GP管理奖金5%', name: 'faddbonus', width: '130'  },
        { text: '达标奖金1%', name: 'fcompliancebonus', width: '130'  },
        { text: '卓越奖金1%', name: 'foutstandingbonus', width: '130'  },
        { text: '年度应发奖金', name: 'fannualbonus', width: '130'  },
        { text: '累计已发放奖金', name: 'faccumulatebonus', width: '130'  },
        { text: '年度实发奖金', name: 'fannualpaidbonus', width: '130'  },
        { text: '备注', name: 'remark' },
      ]
    }
  },
  methods: {
    ExportData() {
      import('@/vendor/Export2Excel').then(excel => {
        // 表格的表头列表
        const columns = this.columns
        const tHeader = []
        // 与表头相对应的数据里边的字段
        const filterVal = []
        columns.forEach((item, index) => {
          tHeader.push(item.text)
          filterVal.push(item.name)
        })
        const list = this.list.records
        const data = this.formatJson(filterVal, list);
        // 这里还是使用export_json_to_excel方法比较好，方便操作数据
        excel.export_json_to_excel(tHeader,data,'产品信息')
      })
    },
    formatJson(filter, jsonDate){
      return jsonDate.map(v =>
        filter.map(j => {
          return v[j]
        })
      )
    },
    // 监听每页显示几条
    handleSize(val) {
      this.list.size = val
      this.$emit('uploadList')
    },
    // 监听当前页
    handleCurrent(val) {
      this.list.current = val
      this.$emit('uploadList')
    },
    Delivery(val) {
      deleteTbonus(val).then(res => {
        if(res.flag) {
          this.$store.dispatch('list/setClickData', '');
          this.$emit('uploadList')
        }
      });
    },
    uploadPr(val) {
      this.fetchData(val, {
        pageNum: 1,
        pageSize: this.list.size || 50
      })
    },
    dblclick(obj) {
      this.$emit('showDialog', obj.row)
    },
    // 监听单击某一行
    rowClick(obj) {
      this.$store.dispatch('list/setClickData', obj.row)
    },
    fetchData(val, data = {
      pageNum: this.list.current || 1,
      pageSize: this.list.size || 50
    }) {
      this.loading = true
      getTbonusList(data, val).then(res => {
        this.loading = false
        this.list = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.list-main {
  height: calc(100vh - 250px);
}
</style>
