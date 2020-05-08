import qrToast from './qrToast.js'

let instance

function getInstance() {
  instance = instance || qrToast.newInstance()
  return instance
}

function show(param) {
  let inst = getInstance()
  inst.setProps(param)
}

function showP(param) {
  return new Promise(resolve => {
    show({
      ...param,
      success() {
        resolve({ confirm: true })
      },
      fail() {
        resolve({ cancel: true })
      }
    })
  })
}

export default showP
