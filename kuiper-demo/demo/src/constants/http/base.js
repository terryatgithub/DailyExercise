let wxBase = '' //微信后台服务器
let actiBase = '' //活动后台服务器

switch (process.env.NODE_ENV) {
  case 'mock':
    wxBase = 'https://beta-wx.coocaa.com'
    actiBase = 'http://172.20.155.103:3000/mock/371'
    break
  case 'development':
    wxBase = 'https://beta-wx.coocaa.com'
    actiBase = 'https://beta-restful.coocaa.com'
    break
  case 'production':
    wxBase = 'https://wx.coocaa.com'
    actiBase = 'https://restful.skysrt.com'
    break
}

export {
    wxBase,
    actiBase
}