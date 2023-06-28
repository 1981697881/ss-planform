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

<script>import { mapGetters } from 'vuex'
import { tprojectOutsourcingBonus, deleteCompany } from '@/api/reportForm/index'
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
      list: {},
      columns: [
        { text: '所属团队', name: 'fposition' },
        { text: '顾问', name: 'telephone' },
        { text: '岗位', name: '' },
        { text: '所属年度', name: 'fannual' },
        { text: '应发外包项目佣金', name: 'recruit.foutmonthcost', width: '150' },
        { text: '应发客服佣金', name: 'recruit.fmonthcost', width: '150' },
        { text: '应发外包招聘佣金', name: 'recruit.fpayablesummary', width: '150' },
        { text: '累计已发放外包项目佣金', name: 'recruit.faccumulatenocost', width: '160' },
        { text: '累计已发放外包招聘佣金', name: 'recruit.foutsourcecommission', width: '160' },
        { text: '累计未发外包佣金', name: 'recruit.fnotsentsummary', width: '150' },
        { text: '备注', name: 'status' },
      ]
    }
  },
  methods: {
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
    dblclick(obj) {
      this.$emit('showDialog', obj.row)
    },
    Delivery(val) {
      deleteCompany(val).then(res => {
        if (res.flag) {
          this.$store.dispatch('list/setClickData', '')
          this.$emit('uploadList')
        }
      })
    },
    // 监听单击某一行
    rowClick(obj) {
      this.$store.dispatch('list/setClickData', obj.row)
    },
    uploadPr(val) {
      this.fetchData(val, {
        pageNum: 1,
        pageSize: this.list.size || 50
      })
    },
    fetchData(val, data = {
      pageNum: this.list.current || 1,
      pageSize: this.list.size || 50
    }) {
      this.loading = true
      tprojectOutsourcingBonus(data, val).then(res => {
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
