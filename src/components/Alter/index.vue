<template>
  <div >
    <el-form ref="form" :rules="loginRules" :model="form" :size="'mini'">
      <el-row :gutter="20" type="flex"  justify="center">
        <el-col :span="12">
          <el-form-item :label="'原密码'" prop="oldPassword">
            <el-input type="password" v-model="form.oldPassword"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20"  type="flex"  justify="center">
        <el-col :span="12">
          <el-form-item :label="'新密码'" prop="newPassword">
            <el-input  type="password" v-model="form.newPassword"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex"  justify="center">
        <el-col :span="12">
          <el-form-item :label="'确认密码'" prop="conPassword">
            <el-input type="password" v-model="form.conPassword"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button @click.native="visible= false">取 消</el-button>
      <el-button type="primary" @click="handleAlter('form')">保存</el-button>
    </div>
  </div>
</template>
<script>
    import Cookies from 'js-cookie'
    export default {
        data() {
            const validateOld = (rule, value, callback) => {
                var sspx=Cookies.get('sspx');
                if (value == sspx) {
                    callback()
                } else {
                    callback(new Error('原密码不对'))
                }
            }
            const validateNew = (rule, value, callback) => {
                if (value == this.form.newPassword) {
                    callback()
                } else {
                    callback(new Error('两次密码必须一致'))
                }
            }
            return {
                form: {
                    oldPassword: null,
                    newPassword: null,
                    conPassword: null,
                },
                loginRules: {
                    oldPassword: [{ required: true, trigger: 'blur', validator: validateOld }],
                    newPassword: [{ required: true, trigger: 'blur', message: '请输入新密码' },{ min: 5, message: '长度在6个字符', trigger: 'blur' }],
                    conPassword: [{ required: true, trigger: 'blur', validator: validateNew },{ min: 5, message: '长度在6个字符', trigger: 'blur' }]
                },
                loading: false,
                passwordType: 'password',
                redirect: undefined
            }
        },
        methods: {
            handleAlter(form) {
                this.$refs[form].validate((valid) => {
                    //判断必填项
                    if (valid) {
                        this.loading = true
                        this.$store.dispatch('user/changePassword', this.form).then(res => {
                            if(res.success){
                              setTimeout(() =>{
                                location.reload()
                              },1000);
                            }
                            this.loading = false
                        }).catch(() => {
                            this.loading = false
                        })
                    }
                })

            }
        },
    }
</script>

<style scoped>

</style>
