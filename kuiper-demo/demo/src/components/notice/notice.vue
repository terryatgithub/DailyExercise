<template>
  <div class="main-wrap"  v-if="content" >
    <div class="content-wrap">
      <div
        class="content"
        :style="{'text-align': (isCenter ? 'center' : 'left')}"
      >
        {{content}}
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      content: '',
      isCenter: false
    }
  },
  methods: {
    setProps(params) {
      if (this.getContentLen(params.content) < 30) {
        this.isCenter = true
      } else {
        this.isCenter = false
      }
      this.content = params.content
      setTimeout(() => {
        this.content = ''
      }, params.duration * 1000)
    },
    getContentLen(content) {
      let realLength = 0, len = content.length, charCode = -1
      for (var i = 0; i < len; i++) {
        charCode = content.charCodeAt(i)
        if (charCode >= 0 && charCode <= 128) realLength += 1
        else realLength += 2
      }
      return realLength
    }
  }
}
</script>
<style scoped lang="scss">
.main-wrap {
  position: fixed;
  width: 100%;
  top: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}
.content-wrap {
  width: 315px;
  height: 90px;
  background: rgba(17, 17, 17, 1);
  border-radius: 8px;
  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    width: 240px;
    font-size: 16px;
    font-family: NotoSansHans-Medium, NotoSansHans;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 23px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: pre-wrap;
  }
}
</style>
