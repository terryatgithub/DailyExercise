import { Request } from '@/core/services/http/request'
import { wxBase } from '@/constants/http/base'
import { GET_USER_INFO_URL, GET_JSSDK_INFO_URL, GET_WXUSER_INFO_V2_URL, GET_WXUSER_INFO_V1_URL } from '@/constants/http/index'
import utils from '@/utils/index'

const header = { 'content-type': 'application/x-www-form-urlencoded' }

class UserApiControl {
  service
  constructor(service) {
    this.service = service
  }
  _getCode(appid, callback) {
    let url = `${wxBase}/weixin.htm?appid=${appid}&redirect_uri=${callback}&response_type=code&scope=snsapi_userinfo#wechat_redirect`
    window.location.href = url
  }
  _getWxUserinfo (data) {
    return this.service.post(GET_WXUSER_INFO_V1_URL, {}, { 'content-type': 'application/x-www-form-urlencoded' }, data)
  }
  // 获取用户信息
  async getUserInfo(data) {
    if (!utils.getUrlKey('code')) {
      let href = window.location.href
      href = (href.indexOf('#') > 0) ? href = href.split('#')[0] : href
      href = encodeURIComponent(href)
      this._getCode(data.appid, href)
    } else {
      data = await this._getWxUserinfo({
        param: JSON.stringify({
          getCcUser: true,
          scope: 'snsapi_userinfo',
          appId: data.appid,
          code: utils.getUrlKey('code')
        })
      })
      console.log('getWxUserinfo: ', data)
      if (data.data) {
        return JSON.parse(data.data.userinfo)
      } else { //刷新页CODE失效时更新CODE
        let origin = window.location.origin
        let pathName = window.location.pathname
        let search = window.location.search
        search = search.replace(/([?&]code=).*?([$&])/i, '$1$2')//去掉无效code
        window.location.href = origin + pathName + search
      }
    }
  }
  // 获取jssdk信息
  getJssdkInfo() {
    let href = window.location.href
    href = (href.indexOf('#') > 0) ? href.split('#')[0] : href
    href = encodeURIComponent(href)
    let data = {
      param: `{'url':'${href}'}`
    }
    return this.service.post(GET_JSSDK_INFO_URL, {}, { 'content-type': 'application/x-www-form-urlencoded' }, data)
  }
}

const userApiControl = new UserApiControl(Request.getInstance())

export default userApiControl
