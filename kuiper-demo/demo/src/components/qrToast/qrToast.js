import qrToast from './qrToast.vue'
import Vue from 'vue'

qrToast.newInstance = properties => {
  const props = properties || {}

  const Instance = new Vue({
    data: props,
    render(h) {
      return h(qrToast, {
        props: props
      })
    }
  })

  const component = Instance.$mount()
  document.body.appendChild(component.$el)
  const qrVue = Instance.$children[0]

  return {
    setProps(prop) {
      qrVue.setProps(prop)
    }
  }
}

export default qrToast
