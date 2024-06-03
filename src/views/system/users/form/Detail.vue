<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="80px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'账号类型'" prop="type">
            <el-select v-model="form.type" filterable class="width-full" placeholder="请选择">
              <el-option :label="t.name" :value="t.value" v-for="(t,i) in options" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col><el-col :span="12">
          <el-form-item :label="'登录账号'" prop="account">
            <el-select
              size="mini"
              filterable
              remote
              @change="changeUser"
              :remote-method="remoteMethod"
              :loading="loading"
              style="width: 100%"
              v-model="form.account"
              placeholder="请选择">
              <el-option
                v-for="item in userList"
                :key="item.FUserID"
                :label="item.FAccount"
                :value="item.FUserID">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'用户姓名'" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'密码'" prop="password">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="''">
            <el-switch
              v-model="form.status"
              active-text="启用"
              inactive-text="禁用"
              :active-value="1"
              :inactive-value="0">
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-tabs v-if="isAlter" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="菜单权限" name="first">
          <el-row>
            <el-table :data="list" border height="250px" ref="multipleTable" @selection-change="handleSelectionChange"
                      stripe size="mini" :highlight-current-row="true">
              <el-table-column align="center" type="selection"></el-table-column>
              <el-table-column
                v-for="(t,i) in columns"
                :key="i"
                align="center"
                :prop="t.name"
                :label="t.text"
                :width="t.width?t.width:(selfAdaption?'':'120px')"
                v-if="t.default!=undefined?t.default:true"
              ></el-table-column>
            </el-table>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="仓库权限" name="second">
          <el-row  style="height: 250px;overflow: auto;border: 1px solid #EBEEF5;">
            <!--<el-tree
              ref="tree1"
              :props="defaultProps"
              :default-expand-all="false"
              :data="data"
              show-checkbox
              :default-checked-keys="Checkeds"
              node-key="menuId"
              highlight-current
              :expand-on-click-node="false"
            />-->
            <el-table :data="list2" border height="250px" ref="multipleTable2" @selection-change="handleSelectionChange2"
            stripe size="mini" :highlight-current-row="true">
            <el-table-column align="center" type="selection"></el-table-column>
            <el-table-column
              v-for="(t,i) in columns2"
              :key="i"
              align="center"
              :prop="t.name"
              :label="t.text"
              :width="t.width?t.width:(selfAdaption?'':'120px')"
              v-if="t.default!=undefined?t.default:true"
            ></el-table-column>
            </el-table>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <div slot="footer" style="text-align:center;padding-top: 15px">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>
<script>import { addUsers, getMenuList, getSysAuth, getUserStockAuth, getK3User,sysUserEdit, sysUserSave, userStockSave } from '@/api/system/index'
import { getClerkList } from '@/api/basic/index'

export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    },
    // 是否自适应宽度，不自适应宽度默认为120px
    selfAdaption: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'text',
        isLeaf: 'leaf',
        id: 'menuId'
      },
      value: false,
      loading: false,
      isAlter: false,
      Checkeds: [],
      form: {
        type: null,
        account: null, // 名称
        username: null,
        password: null,
        empId: null,
        status: 1
      },
      columns: [
        { text: '菜单名称', name: 'name' },
        { text: '上级菜单', name: 'parentName' }
      ],
      columns2: [
        { text: '仓库名称', name: 'FName' }
      ],
      activeName: 'first',
      userList: [],
      list: [],
      list2: [],
      options: [{
        name: '后台管理员',
        value: 1
      }, {
        name: 'PDA操作员',
        value: 2
      }, {
        name: '后台操作员',
        value: 3
      }],
      visible: false,
      rules: {
        username: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        change: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]

      },
      multipleSelection: [],
      multipleSelection2: [],
      levelFormat: []
    }
  },
  created() {

  },
  mounted() {
    /*this.factchGroup()*/
    // this.fetchFormat()
   /* this.fetchMenu()*/
    this.getUsersArray();
    if (this.listInfo) {
      /*console.log(this.listInfo)
      this.form = {...this.listInfo}*/
      this.fetchFormat(this.listInfo.id)
      this.fetchData(this.listInfo.id)
      this.factchGroup(this.listInfo.id)
      this.isAlter = true
    }
  },
  methods: {
    async remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        await this.getUsersArray({FAccount: query, pageIndex: 1,
          pageSize: 10});
      } else {
        this.userList = [];
      }
    },
    async getUsersArray(val = {
      pageIndex: 1,
      pageSize: 10
    }) {
      await getK3User(val).then(res => {
        console.log(res)
        if (res.success) {
          this.loading = false;
          this.userList = res.data
        }
      });
    },
    async changeUser(val) {
      this.userList.forEach((item)=>{
        if(item.FUserID == val){
          this.form.empId = item.FEmpID
          this.form.account = item.FAccount
          this.form.username = item.FEmpName
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.list.forEach((item)=>{
        if(val == item){
          item.checked = 1
        }
      })
    },
    handleSelectionChange2(val) {
      this.multipleSelection2 = val
      this.list2.forEach((item)=>{
        if(val == item){
          item.checked = 1
        }
      })
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    getChecked() {
      let array = this.$refs.tree1.getCheckedKeys()
      return array
    },
    saveData(form) {
      let that = this
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          let menuList = [];
          let numberList = [];
          that.multipleSelection2.forEach((item)=>{
            menuList.push(item.FNumber);
          })
          userStockSave({uid: that.form.userId, numberList: numberList}).then(reso => {
            if(reso.success){
            }
          })
          addUsers(this.form).then(res => {
            if(res.success){
              if(that.isAlter){
                that.multipleSelection.forEach((item)=>{
                  menuList.push(item.id);
                })

                sysUserSave({uid: that.form.userId, menuList: menuList}).then(reso => {
                  if(reso.success){
                  }
                })
                let numberList = [];
                that.multipleSelection2.forEach((item)=>{
                  menuList.push(item.FNumber);
                })
                userStockSave({uid: that.form.userId, numberList: numberList}).then(reso => {
                  if(reso.success){
                  }
                })
                that.$emit('hideDialog', false)
                that.$emit('uploadList')
              }else{
                that.$emit('hideDialog', false)
                that.$emit('uploadList')
              }
            }
          })
        } else {
          return false
        }
      })
    },
    factchGroup(val) {
      let that = this
      that.loading = true
      getSysAuth(val).then(res => {
        if (res.success) {
          that.list = res.data.data.data
          let rows = that.list
          if (rows) {
            that.$nextTick(() => {
              rows.forEach(row => {
                if (row.checked == 1) {
                  that.$refs.multipleTable.toggleRowSelection(row)
                }
              })
            })
          } else {
            that.$nextTick(() => {
              this.$refs.multipleTable.clearSelection()
            })
          }
        }
      })
    },
    fetchData(val) {
      let that = this
      getUserStockAuth(val).then(res => {
        if (res.success) {
          that.list2 = res.data.data.data
          let rows = that.list2
          if (rows) {
            that.$nextTick(() => {
              rows.forEach(row => {
                if (row.checked == 1) {
                  that.$refs.multipleTable2.toggleRowSelection(row)
                }
              })
            })
          } else {
            that.$nextTick(() => {
              this.$refs.multipleTable2.clearSelection()
            })
          }
        }
      })
    },
    fetchFormat(val) {
      sysUserEdit(val).then(res => {
        if (res.success) {
          this.form = res.data
        }
      })
    },
    fetchMenu() {
      getMenuList().then(res => {
        this.data = res.data.treeVoList
      })
    }

  }
}
</script>

<style>
</style>
