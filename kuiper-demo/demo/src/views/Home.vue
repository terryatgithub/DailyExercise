<template>
  <div class="home">
    <van-cell :value="time|timeFilter" center/>
    <van-button class='vant-btn' type="primary" @click="getUserInfo">获取用户信息</van-button>
    <van-button class='vant-btn' type="primary" @click="setLocalStorage">设置LocalStorage</van-button>
    <van-button class='vant-btn' type="primary" @click="getLocalStorage">获取LocalStorage</van-button>
    <van-button class='vant-btn' type="primary" @click="showNoticeToast">显示Notice弹窗</van-button>
    <van-button class='vant-btn' type="primary" @click="showQRCodeToast">显示二维码弹窗</van-button>
    <van-button class='vant-btn' type="primary" @click="handleVConsole">打开/关闭console</van-button>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { homeApiControl, userApiControl } from '@/core'
import initMixin from '@/mixins/initMixin'
import commonUtil from '@/utils/index'
import cacheUtil from '@/utils/cache'
import Vue from 'vue'
import { Button, Cell } from 'vant'
Vue.use(Button).use(Cell)

export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  data() {
    return {
      time: (new Date()).getTime()
    }
  },
  mixins: [initMixin],
  async mounted() {
    console.log('Home mounted()')
    await this.init()
    // try {
    //   const data = await homeApiControl.init()
    //   console.log(data)
    // } catch (err) {
    //   console.log('111', err)
    // }

    // const data2 = await userApiControl.getUserInfo()
    // console.log(data2)
  },
  methods: {
    getUserInfo() {
      console.log(this.$store.state.user.jsSdkInfo)
      console.log(this.$store.state.user.wxUserInfo)
    },
    setLocalStorage() {
      const _value = commonUtil.createUniqueString()
      console.log(_value)
      cacheUtil.setLocalStorage('fyb_test', _value)
    },
    getLocalStorage() {
      console.log(cacheUtil.getLocalStorage('fyb_test'))
    },
    showNoticeToast() {
      this.$Notice.info({ content: '这是提示弹窗', duration: 3 })
    },
    async showQRCodeToast() {
      await this.$showQRCodeToast({ qrUrl: 'adfadsfdsfdsf' })
    },
    handleVConsole() {
      if(document.getElementById('__vconsole').style.display === 'none')
        document.getElementById('__vconsole').style.display = 'block'
      else {
        document.getElementById('__vconsole').style.display = 'none'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .home {
     @include flex(columns, wrap);
     .vant-btn {
       width: 355px;
       margin: 10px;
     }
  }
</style>
