<template>
  <div class="qr-wrapper" v-if="qrCodeUrl" @click.stop="onClickMask">
    <div class="qr" >
      <div class="title">长按识别二维码领取红包</div>
      <img :src="qrCodeUrl" class="qrCode" alt="红包二维码" @click.stop="onClickQr"/>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'

export default {
  name: 'qrToast',
  data () {
    return {
      qrCodeUrl: null,
      content: null
    }
  },
  created() {
    console.log('qrToast created:')
  },
  mounted() {
    console.log('qrToast mounted')
  },
  updated() {
    console.log('qrToast updated')
  },
  destroyed() {
    console.log('qrToast destroyed')
  },
  methods: {
    setProps(param) {
      this.content = param
      this.getQrCode()
    },
    success (param) {
      this.content.success && this.content.success(param)
    },
    fail (param) {
      this.content.fail && this.content.fail(param)
    },
    complete (param) {
      this.content.complete && this.content.complete(param)
    },
    async getQrCode() {
      let url = await QRCode.toDataURL(this.content.qrUrl)
      this.qrCodeUrl = url
    },
    onClickMask() {
      console.log('onClickMask')
      this.qrCodeUrl = null
      this.fail()
      this.complete()
    },
    onClickQr() {
      console.log('onClickQr')
      this.success()
      this.complete()
    }
  }
}
</script>

<style scoped lang="scss">
.qr-wrapper {
  position: fixed;
  top: 0;
  width: 375px;
  height: 100%;
  background: rgba(0,0,0,0.7);
  .qr {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    height: 375px;
    margin: 154px auto;
    background: url("../../assets/images/qrbg.png") no-repeat;
    -webkit-background-size: contain;
    background-size: contain;
    .title {
      margin: 40px 0 43px;
      color: #FFFEBE;
      font-size: 18px;
    }
    .qrCode {
      width: 230px;
      height: 230px;
      margin-right: 5px;
    }
  }
}
</style>
