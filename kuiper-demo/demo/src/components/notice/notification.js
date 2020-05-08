import Notice from './notice.vue'
import Vue from 'vue'

Notice.newInstance = properties => {
  const props = properties || {}

  const Instance = new Vue({
    data: props,
    render(h) {
      return h(Notice, {
        props: props
      })
    }
  })

  const component = Instance.$mount()
  document.body.appendChild(component.$el)
  const notice = Instance.$children[0]

  return {
    setProps(noticeProps) {
      notice.setProps(noticeProps)
    }
  }
}

export default Notice
