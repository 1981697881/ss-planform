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
import { getRecruitmentBonusList, deleteRecruitmentBonus } from '@/api/information/index'
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
        { text: '职员', name: 'fposition' },
        { text: '结清标记', name: 'fcompletesign' },
        { text: '基本工资', name: 'fbasicsalary' },
        { text: '基本工资成本', name: 'fbasicsalarycost',width: '130' },
        { text: '累计Invoiced Amount', name: 'faccumulateia',width: '150' },
        { text: '累计Invoiced GP', name: 'finvoicedgp',width: '150' },
        { text: '累计回款GP', name: 'fcollectiongp',width: '130' },
        { text: '累计Base Line', name: 'faccumulatebl',width: '130' },
        { text: '助理成本折算GP', name: 'fassistantcostsgp',width: '150' },
        { text: '累计计提GP', name: 'faccumulategp',width: '130' },
        { text: '累计计提比例', name: 'faccumulatedprovisionratio',width: '130' },
        { text: '累计可提费用', name: 'faccumulatedaccruedexpenses',width: '130' },
        { text: '担保期内费用', name: 'fwarrantycost',width: '130' },
        { text: '累计可提费用', name: 'faccumulatedaccruedexpenses',width: '130' },
        { text: '担保期内费用', name: 'fwarrantycost',width: '130' },
        { text: '担保冻结费用', name: 'fwarrantyfreezecost',width: '130' },
        { text: '过担保期可计提部分', name: 'fwarrantypart',width: '150' },
        { text: '已支付费用', name: 'fpaidfees',width: '130' },
        { text: '本月应计发费用', name: 'fmonthcost',width: '130' },
        { text: '累计未计发费用', name: 'faccumulatenocost',width: '130' },
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
      deleteRecruitmentBonus(val).then(res => {
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
      getRecruitmentBonusList(data, val).then(res => {
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
