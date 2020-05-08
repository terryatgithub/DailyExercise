import { Request } from '@/core/services/http/request'
import { HomeIntUrl, HomeDrawUrl } from '@/constants/http/index'

const header = { 'content-type': 'application/x-www-form-urlencoded' }

class HomeApiControl {
  service
  constructor(service) {
    this.service = service
  }
  // 初始化
  init(data) {
    console.log('HomeApiControl init()')
    console.log('process.env.NODE_ENV='+process.env.NODE_ENV)
    console.log('process.env=',process.env)
    // let homeIntUrl = 'https://beta-restful.coocaa.com/light/v2/web/init'
    return this.service.post(HomeIntUrl, {}, header, data)
  }
  // 抽奖
  draw(data) {
    return this.service.post(HomeDrawUrl, {}, header, data)
  }
}

const homeApiControl = new HomeApiControl(Request.getInstance())

export default homeApiControl
