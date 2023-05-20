<template>
  <div class="app-list">
   <!-- <el-form :model="form" :rules="rules" ref="form" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'接入名称'" prop="select">
            <el-input v-model="form.cn"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'appKey'" prop="cn">
            <el-input v-model="form.cn"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'成立日期'" prop="eur">
            <el-date-picker
              v-model="form.eur"
              type="date"
              style="width: auto"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'营业期限'" prop="usm">
            <el-input v-model="form.usm"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="9">
          <el-form-item :label="'secret'" prop="usw">
            <el-input v-model="form.usw"></el-input>

          </el-form-item>
        </el-col>
        <el-col :span="3"><el-button size="mini">重新生成</el-button></el-col>
        <el-col :span="12">
          <el-form-item :label="'接入ip地址'" prop="usw">
            <el-input v-model="form.usw"></el-input>
          </el-form-item>
        </el-col>
      </el-row><el-row :gutter="20">
      <el-col :span="12">
        <el-form-item :label="'接入描述'" prop="usw">
          <el-input v-model="form.usw"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    </el-form>
    <div slot="footer" style="text-align:center;">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
  </div>-->
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @exportData="exportData" @del="delivery" @queryBtn="query" @uploadList="upload"/>
      </div>
      <list ref="list" @uploadList="uploadPage" @showDialog="handlerDialog"/>
    </div>
    <el-dialog
      :visible.sync="visible"
      title="基本信息"
      v-if="visible"
      v-dialogDrag
      :width="'40%'"
      destroy-on-close
    >
      <info @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></info>
    </el-dialog>
  </div>
</template>

<script>import { TabsBar, List } from './components'
import { Info } from './form'

export default {
  components: {
    TabsBar,
    List,
    Info
  },
  data() {
    return {
      form: {
        type: 1,
        cn: null,
        eur: null,
        usm: null,
        usw: null,
        select: []
      },
      rules: {
        cn: [
          {required: true, message: '请输入', trigger: 'blur'}
        ], eur: [
          {required: true, message: '请输入', trigger: 'blur'}
        ], usm: [
          {required: true, message: '请输入', trigger: 'blur'}
        ], usw: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        select: [
          {required: true, message: '请选择', trigger: 'change'}
        ],
      },
      visible: null,
      rid: null,
      listInfo: null,
      floorId: null
    }
  },
  mounted() {
    this.$refs.list.fetchData(this.$refs.tabs.qFilter())
  },
  methods: {
    exportData() {
      this.$refs.list.ExportData()
    },
    delivery(obj) {
      if (obj) {
        this.$refs.list.Delivery(obj)
      }
    },
    hideWindow(val) {
      this.visible = val
    },
    handlerDialog(obj) {
      this.listInfo = null
      if (obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible = true
    },
    // 更新列表
    upload() {
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    },
    uploadPage(val) {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    // 查询
    query() {
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
