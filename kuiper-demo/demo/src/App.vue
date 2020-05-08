<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  created() {
    this.handleFocusOut()
    this.handleResize()
  },
  methods: {
    handleFocusOut() {
      document.addEventListener('focusout', () => {
        document.body.scrollTop = 0
      })
    },
    handleResize() {
      const clientHeight = document.documentElement.clientHeight
      const resizeHandler = () => {
        const tagName = document.activeElement.tagName
        if (tagName) {
          const inputBox = tagName === 'INPUT' || tagName === 'TEXTAREA'
          if (inputBox) {
            setTimeout(() => {
              document.activeElement.scrollIntoView()
            }, 0)
          }
        }
        const bodyHeight = document.documentElement.clientHeight
        const ele = document.getElementById('fixed-bottom')
        if (ele) {
          if (clientHeight > bodyHeight) ele.style.display = 'none'
          else ele.style.display = 'block'
        }
      }
      window.addEventListener('resize', resizeHandler)
    }
  }
}
</script>

<style lang="scss">
#app {
  width: 375px;
  border: 1PX solid $border-color-base;
  background: $color-disabled;
}
</style>
