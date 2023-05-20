<template>
  <div>
    <el-table
      :data="list.records"
      border
      :stripe="timeColor? false : true"
      size="mini"
      :highlight-current-row="highlight"
      @row-dblclick="dblclick"
      @row-click="rowClick"
      :row-class-name="tableRowClassName"
      :row-style="formatRow ? rowClass : null"
      @selection-change="handleSelectionChange"
      :height="height"
      @sort-change="sortChange"
      :show-summary="showSummary"
      :summary-method="getSummaries"
      v-loading="loading"
      row-key="id"
      :tree-props="tree"
    >
      <el-table-column align="center" fixed v-if="type" :type="type?'selection':''"></el-table-column>
      <el-table-column v-if="index" prop="date" label="序号" type="index" align="center" sortable></el-table-column>
      <slot name="title"></slot>
      <template v-for="(t,i) in columns">
        <el-table-column
          :prop="t.name"
          :key="i"
          :fixed="t.fixed"
          :sortable="t.sort"
          :formatter="t.formatt!=undefined?(row, column) => methods[t.formatt](row,column) : null"
          v-if="t.default!=undefined ?(t.default =='img' || t.default =='image'?false:t.default):true"
          :label="t.text"
          :width="t.width?t.width:(selfAdaption?'':'120px')"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          :key="i"
          v-else-if="t.default == 'img'?true:false"
          :label="t.text"
          :width="t.width?t.width:(selfAdaption?'':'120px')"
          show-overflow-tooltip
          align="center"
        >
          <template width="90" slot-scope="scope">
            <img style="width:80px;height:80px;border:none;" :src=" fileUrl+scope.row.posterPhoto">
          </template>
        </el-table-column>
        <el-table-column
          :key="i"
          v-else-if="t.default == 'image'?true:false"
          :label="t.text"
          :width="t.width?t.width:(selfAdaption?'':'120px')"
          show-overflow-tooltip
          align="center"
        >
          <template width="90" v-if="scope.row.picUrl != null" slot-scope="scope">
            <el-image
              style="width: 80px; height: 80px"
              :src="scope.row.picUrl"
              :preview-src-list="[scope.row.picUrl]">
            </el-image>
            <!--<img style="width:80px;height:80px;border:none;" :src="scope.row.picUrl">-->
          </template>
        </el-table-column>
      </template>
      <slot name="after"></slot>
    </el-table>
    <div class="text-center pages" v-if="list.total && list.total!=0" style="padding-top: 15px;">
      <el-pagination
        @size-change="handleSize"
        @current-change="handleCurrent"
        :current-page="list.current"
        :page-sizes="[50, 100, 250, 500, 1000, 2500]"
        :page-size="list.size"
        :page-count="list.pages?list.pages:0"
        layout="total, sizes, prev, pager, next, jumper"
        :total="list.total?list.total:0"
      ></el-pagination>
    </div>
  </div>
</template>

<script>export default {
  props: {
    list: {
      // 请求返回的json数据
      type: Object,
      default: null
    },
    columns: {
      // 列
      type: Array,
      default: null
    }, tree: {
      // 列
      type: Object,
      default: () => {
      }
    },
    index: {
      // 是否需要序号列
      type: Boolean,
      default: false
    },
    operation: {
      // 是否需要序号列
      type: Boolean,
      default: false
    },
    formatRow: {
      // 是否需要序号列
      type: Boolean,
      default: false
    },
    highlight: {
      // 是否需要序号列
      type: Boolean,
      default: true
    },
    // 是否开启多选
    type: {
      type: Boolean,
      default: false
    },
    // 是否开启多选
    timeColor: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    sort: {
      type: Boolean,
      default: false
    },
    // 是否打开底部合计行
    showSummary: {
      type: Boolean,
      default: false
    },
    // 是否自适应宽度，不自适应宽度默认为120px
    selfAdaption: {
      type: Boolean,
      default: true
    },
    // 是否自定义高度 默认100%
    height: {
      type: String,
      default: '100%'
    },
    // 自定义按钮
    operationName: {
      type: String,
      default: '+'
    }
  },
  data() {
    return {
      methods: this.$options.methods,
      fileUrl: this.$store.state.user.url + '/uploadFiles/image/',
    };
  },
  methods: {
    sortChange(row) {
      return this.$emit('sortChange', {row});
    },
    checkType(row, column) {
      let stau = ''
      if (row.status == 0) {
        stau = '待寄回'
      } else if (row.status == 1) {
        stau = '待检修'
      } else if (row.status == 2) {
        stau = '待确认'
      } else if (row.status == 3) {
        stau = '待维修'
      } else if (row.status == 4) {
        stau = '待发货'
      } else if (row.status == 5) {
        stau = '待收货'
      } else if (row.status == 6) {
        stau = '完成'
      }
      return stau
    },

    checkPay(row, column) {
      let stau = ''
      if (row.payStatus == 0) {
        stau = '未付款'
      } else if (row.payStatus == 1) {
        stau = '已付款'
      }
      return stau
    },
    checkHandleStatus(row, column) {
      let stau = ''
      if (row.status == 0) {
        stau = '未处理'
      } else if (row.status == 1) {
        stau = '已处理'
      }
      return stau
    },checkWarranty(row, column) {
      let stau = ''
      console.log(row)
      if (row.isWarranty == "true") {
        stau = '是'
      } else if (row.isWarranty == "false") {
        stau = '否'
      }
      return stau
    }, checkInternalOrNot(row, column) {
      let stau = ''
      if (row.internalOrNot == 0) {
        stau = '内部员工'
      } else if (row.internalOrNot == 1) {
        stau = '非内部员工'
      }
      return stau
    }, checkStatus(row, column) {
      let stau = ''
      if (row.status == 0) {
        stau = '启用'
      } else if (row.status == 1) {
        stau = '禁用'
      }
      return stau
    },
    tableRowClassName({row, rowIndex}) {
      if (row.judgeStatus) {
        var oDate1 = new Date();
        var oDate2 = new Date(row.editDate);
        var dimDate = parseInt((oDate1.getTime() - oDate2.getTime()) / 3600 / 1000 / 24);
        if (row.status == 3) {
          if (row.payStatus == 0) {
            console.log(dimDate)
            if (oDate1.getTime() > oDate2.getTime() && dimDate >= 2) {
              return 'suspended-row1';
            } else if (oDate1.getTime() > oDate2.getTime() && dimDate >= 1 && dimDate < 2) {
              return 'suspended-row2';
            }
          } else {
            if (oDate1.getTime() > oDate2.getTime() && dimDate > 2) {
              return 'suspended-row1';
            } else if (oDate1.getTime() > oDate2.getTime() && dimDate >= 1 && dimDate < 2) {
              return 'suspended-row2';
            }
          }
        } else if (row.status == 4) {
          if (oDate1.getTime() > oDate2.getTime() && dimDate > 2) {
            return 'suspended-row1';
          } else if (oDate1.getTime() > oDate2.getTime() && dimDate >= 1 && dimDate < 2) {
            return 'suspended-row2';
          }
        }
      }
    },
    rowClass(row, index) {
      if (row.row.evenNum >= row.row.qty) {
        return {'background-color': '#FFDAB9'}
      }
    },
    // 监听多选 参数-所有选中的值
    handleSelectionChange(val) {
      this.$store.dispatch('list/setSelections', val)
    },
    getSummaries({columns, data}) {
      const sums = [];
      columns.forEach((column, index) => {
        if (index == 0) {
          sums[index] = '合计'
        } else {
          const values = data.map(item => Number(item[column.property]))
          const flag = values.every(item => isNaN(item))
          if (column.property == 'productName') {
            sums[index] = values.length;
          }
          /* if(flag){
             return sums[index] = ""
           }else{
             if(column.property == 'num' ||  column.property == 'evenNum'|| column.property == 'adjNum'|| column.property == 'pastNum'|| column.property == 'nowNum') {
               sums[index] = values.reduce((total, item) => total + item);
               sums[index] = Math.round(sums[index] * 100) / 100;
               sums[index] += ""
             }
           }*/
        }
      })
      return sums
    },
    // 表格单击操作
    rowClick(row, column, el) {
      return this.$emit('row-click', {row, column, el});
    },
    // 表格双击操作
    dblclick(row, column, el) {
      return this.$emit('dblclick', {row, column, el});
    },
    // 监听每页显示数量
    handleSize(size) {
      return this.$emit('handle-size', size);
    },
    // 监听当前页码数
    handleCurrent(current) {
      return this.$emit('handle-current', current);
    }
  }
};
</script>

<!--<style>
  .el-table__body tr.current-row>td{
    background-color: #f19944 !important;
    /* color: #f19944; */  /* 设置文字颜色，可以选择不设置 */
  }
  /* 用来设置当前页面element全局table 鼠标移入某行时的背景色*/
  .el-table&#45;&#45;enable-row-hover .el-table__body tr:hover>td {
    background-color: #f19944;
    /* color: #f19944; */ /* 设置文字颜色，可以选择不设置 */
  }

</style>-->
<style>
  .urgent-row {
    color: red;
  }

  .delay-row {
    color: orange;
  }

  .conflict-row {
    color: blue;
  }

  .suspended-row1 {
    color: red;
  }

  .suspended-row2 {
    color: blue;
  }
</style>
