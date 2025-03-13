<template>
  <div>
    <list
      class="list-main"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      selfAdaption
      @handle-size="handleSize"
      @handle-current="handleCurrent"
      @row-click="rowClick"
    />
  </div>
</template>

<script>import {mapGetters} from 'vuex'
import {getUsersList, delUsers} from '@/api/system/index';
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
      checkDate: null,
      columns: [
        { text: '用户名', name: 'username' },
        { text: '账号类型', name: 'type', formatt: 'checkUserType' },
        { text: '账号', name: 'account' },
        { text: '创建人', name: 'createName' },
        { text: '创建日期', name: 'createDate' },
        { text: '状态', name: 'status', formatt: 'checkStatus' },
        { text: '权限', name: 'type', formatt: 'checkAuthority' }
      ]
    };
  },

  methods: {
    // 监听每页显示几条
    handleSize(val) {
      this.list.size = val
      this.fetchData()
    },
    //监听当前页
    handleCurrent(val) {
      this.list.current = val
      this.fetchData()
    },
    // 弹窗拖拽
    handleDrag() {
      this.$refs.select.blur()
    },
    Delivery(val) {
      delUsers(val).then(res => {
        if (res.success) {
          this.$store.dispatch('list/setClickData', '');
          this.fetchData()
        }
      })
    },
    dblclick(obj) {
      this.$emit('showDialog', obj.row)
    },
    getClickRow() {
      return this.checkDate
    },
    // 监听单击某一行
    rowClick(obj) {
      this.$store.dispatch('list/setClickData', obj.row);
    },
    uploadPr(val) {
      this.fetchData(val, {
        pageNum: 1,
        pageSize: this.list.size || 50
      })
    },
    fetchData(val, data = {
      /*  fid: fid,
        type: type,*/
      pageNum: this.list.current || 1,
      pageSize: this.list.size || 50
    }) {
      this.loading = true;
      getUsersList(data).then(res => {
        this.loading = false;
        this.list = {list: res.data};
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .list-main {
    height: calc(100vh - 250px);
  }
</style>
