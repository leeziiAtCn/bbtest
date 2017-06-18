<template>
  <div class='bg'>
    <div class="login-box">
      <div class="title">
        <span>Login</span>
      </div>
      <div class="main">
        <ul>
          <li><input type="text" placeholder="username" v-model="username" @focus="isActive=!isActive"
                     @blur="isActive=!isActive" autocomplete="off"><i class="t" :class="{t1 : isActive}"></i><i
            class="r" :class="{r1 : isActive}"></i><i
            class="b" :class="{b1 : isActive}"></i><i class="l" :class="{l1 : isActive}"></i></li>
          <li><input type="password" placeholder="password" v-model="userpwd" @focus="isActive2=!isActive2"
                     @blur="isActive2=!isActive2" autocomplete="off"><i class="t" :class="{t1 : isActive2}"></i><i
            class="r" :class="{r1 : isActive2}"></i><i
            class="b" :class="{b1 : isActive2}"></i><i class="l" :class="{l1 : isActive2}"></i></li>
        </ul>
      </div>
      <div class="footer">
        <div class="btn" @click="login">登录</div>
        <div class="btn">修改用户</div>
      </div>
    </div>
    <transition name="fade">
      <div class="tips" v-if="errorText" @click="errorText = !errorText">
        <div class="wrap">
          <span>登录失败,请重新登录</span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script type="es6">
  export default {
    data(){
      return {
        username: '',
        userpwd: '',
        errorText: false,
        isActive: true,
        isActive2: true
      }
    },
    methods: {
      login(){
        this.$http.post("/user/login", {
          username: this.username,
          userpwd: this.userpwd
        }).then(res => {
          if (!!!res.data.code) {
            this.errorText = true
            setTimeout(() => {
              this.errorText = false
            }, 1000)
          } else {
            this.$router.push('/index')
          }
        })
      }
    }
  }
</script>
<style rel='stylesheet/less' lang="less" scoped>
  .bg {
    background: url("./bg.jpg") no-repeat center center/100% 100%;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .login-box {
    width: 600px;
    margin: 100px auto 0 auto;
  }

  .title {
    position: relative;
    height: 150px;
    font-size: 60px;
    line-height: 150px;
    text-indent: 1em;
    color: #ddd;
  }

  li {
    position: relative;
    .t {
      position: absolute;
      height: 1px;
      width: 120%;
      background: #ddd;
      left: 0;
      top: 0;
      transition: all 1s;
      transform: translateX(0);
    }
    .t1 {
      transform: translateX(3000px);
    }
    .b {
      position: absolute;
      height: 1px;
      width: 120%;
      background: #ddd;
      right: 0;
      bottom: 0;
      transition: all 1s;
      transform: translateX(0);
    }
    .b1 {
      transform: translateX(-3000px);
    }
    .l {
      position: absolute;
      width: 1px;
      height: 180%;
      background: #ddd;
      bottom: 0;
      left: 0;
      transition: all 1s;
      transform: translateY(0);
    }
    .l1 {
      transform: translateY(-3000px);
    }
    .r {
      position: absolute;
      width: 1px;
      height: 180%;
      background: #ddd;
      top: 0;
      right: 0;
      transition: all 1s;
      transform: translateY(0);
    }
    .r1 {
      transform: translateY(3000px);
    }
  }

  input {
    background: transparent;
    border: 0;
    outline: none;
    display: inline-block;
    height: 100px;
    line-height: 100px;
    font-size: 28px;
    text-indent: 3em;
  }

  .footer {
    margin-top: 50px;
    height: 40px;
    > div {
      float: left;
      margin-right: 100px;
      cursor: pointer;
    }
  }

  .btn {
    width: 150px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #ddd;
    color: #dddddd;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .tips {
    margin-top: 100px;
    height: 150px;
    text-align: center;
    font-size: 30px;
    .wrap {
      margin: 0 auto;
      height: 100px;
      line-height: 100px;
      width: 350px;
      background: rgba(0, 0, 0, .6);
      color: #fff;
      padding: 0 20px;
    }
  }


</style>
