<template>
  <div class="login-container">
    <div class="logo">
      <img src="@/assets/images/bg-logo.jpeg">
    </div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
             label-position="left">
      <div class="title-container">
        <!--<img src="@/assets/logo/logo.png" class="sidebar-logo">-->
        <h3 class="title">后台管理系统</h3><!--（测试）-->
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
        </span>
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
                 @click.native.prevent="handleLogin">Login
      </el-button>
    </el-form>
    <!--<div class="footer">
      <div class="filings">
        <el-link type="primary">备案号：粤ICP备15064698</el-link>
      </div>
      <div class="information">
        <div>联系我们</div>
        <div>地址：广州市番禺区钟村街雄峰南大街38号2508</div>
        <div>研发中心：广州市白云区太和镇丰福三路1号（恩创商务中心）二楼2016室</div>
        <div>电话：020-84898897</div>
        <div>QQ：27099652@qq.com</div>
      </div>
    </div>-->
  </div>
</template>

<script>import {validUsername} from '@/utils/validate'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        //校验
        //callback(new Error('Please enter the correct user name'))
        callback()
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{required: true, trigger: 'blur', validator: validateUsername}],
        password: [{required: true, trigger: 'blur', validator: validatePassword}]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    var _this = this;
    document.onkeypress = function (e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        _this.handleLogin();// 登录方法名
        return false;
      }
    };
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then((res) => {
            console.log(res)
            if (res.success) {
              this.$router.push({path: this.redirect || '/'})
              this.loading = false
            } else {
              this.loading = false
              this.$message({
                message: res.msg,
                type: "error"
              });
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
}
</script>

<style lang="scss">

  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg: #283443;
  $light_gray: #fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {

    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>

  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  .sidebar-logo {
    width: 60px;
    height: 60px;
    margin: 10px 0 10px 0;
    vertical-align: middle;
  }

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .logo {
      display: inline-block;
      float: left;
      height: 300px;
      margin: 160px 50px 0 50px;
      width: calc(100% - 600px);

      img {
        width: 100%;
        height: 100%;
      }
    }

    .footer {
      display: flex;
      position: absolute;
      width: 100%;
      bottom: 30px;
      justify-content: space-around;
      align-items: flex-end;

      .filings {

      }

      .information {
        color: #fff;
      }
    }

    .login-form {
      position: relative;
      width: 380px;
      max-width: 100%;
      padding: 0 35px 0;
      margin-top: 160px;
      overflow: hidden;
      box-shadow: 1px 1px 3px 3px #2b2f3a;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;
      text-align: center;

      .title {
        font-size: 26px;
        color: $light_gray;
        padding-top: 20px;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
