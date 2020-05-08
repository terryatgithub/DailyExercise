import Notification from './notification.js'

let messageInstance

function getMessageInstance () {
  messageInstance = messageInstance || Notification.newInstance()
  return messageInstance
}

function notice({ duration = 2, content = '' }) {
  let instance = getMessageInstance()

  instance.setProps({
    content: content,
    duration: duration
  })
}

export default {
  info (options) {
    return notice(options)
  }
}
