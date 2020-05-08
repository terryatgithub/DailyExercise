import axios from '@/core/services/http/index'

let service = axios()

export class Request {
  instance

  static getInstance() {
    if (!this.instance) {
      this.instance = new Request()
    }
    return this.instance
  }

  post(url, params, headers, data) {
    let options = {}
    if (params) {
      options.params = params
    }
    if (headers) {
      options.headers = headers
    }
    return service.post(url, data, options)
  }

  get(url, params, headers) {
    let options = {}
    if (params) {
      options.params = params
    }
    if (headers) {
      options.headers = headers
    }
    return service.get(url, options)
  }
}
