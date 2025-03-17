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
import { getTuserList, deleteTuser } from '@/api/basic/index'
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
        { text: '工号', name: 'fnumber' },
        { text: '姓名', name: 'fname' },
        { text: '性别', name: 'fgender' },
        { text: '联系电话', name: 'fphone' },
        { text: '邮箱', name: '' },
        { text: '职位', name: 'fduty' },
        { text: '角色', name: 'ftype', width: '130' },
        { text: '部门', name: 'fdept' },
        { text: '最近调职日期', name: '', width: '130' },
        { text: '入职日期', name: 'fjoindate', width: '130' },
        { text: '过渡截止日期', name: 'fcutoffdate', width: '130' },
        { text: '离职日期', name: 'fdeparturedate', width: '130' },
      ]
    }
  },
  methods: {
    //监听每页显示几条
    handleSize(val) {
      this.list.size = val
      this.$emit('uploadList')
    },
    //监听当前页
    handleCurrent(val) {
      this.list.current = val
      this.$emit('uploadList')
    },
    dblclick(obj) {
      this.$emit('showDialog', obj.row)
    },
    Delivery(val) {
      console.log(val)
      deleteTuser(val).then(res => {
        if (res.flag) {
          this.$store.dispatch('list/setClickData', '')
          this.$emit('uploadList')
        }
      })
    },
    //监听单击某一行
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
      getTuserList(data, val).then(res => {
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
