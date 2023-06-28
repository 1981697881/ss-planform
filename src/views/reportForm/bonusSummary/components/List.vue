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
import { recruitmentBonus, deleteCompany } from '@/api/reportForm/index'
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
        { text: '岗位', name: 'officialWebsite' },
        { text: '所属年份', name: 'fannual' },
        { text: '累计可提佣金', name: 'remark', width: '150' },
        { text: '担保期内佣金', name: 'status', width: '150' },
        { text: '过担保期可计提部分', name: 'status', width: '150' },
        { text: 'BD奖金', name: 'bd.fmonthcost' },
        { text: '团队奖金', name: 'team.fmonthcost' },
        { text: '已发放佣金', name: 'status' , width: '150'},
        { text: '本月应发佣金', name: 'status', width: '150' },
        { text: '累计未发佣金', name: 'status', width: '150' },
        { text: '备注', name: 'status' },
        { text: '是否确认', name: 'status' },
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
      recruitmentBonus(data, val).then(res => {
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
