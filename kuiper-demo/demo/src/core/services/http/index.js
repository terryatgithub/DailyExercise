import axios from 'axios'
import qs from 'qs'

const DEFAULT_OPTIONS = {
  // baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000,
  // headers: {
  //   timestamp: new Date().getTime(),
  //   'Content-Type': 'application/json;chareset=UTF-8'
  // }
}

const responseLog = (response) => {
  if (process.env.NODE_ENV === 'development') {
    const randomColor = `rgba(${Math.round(Math.random() * 255)},${Math.round(
      Math.random() * 255
    )},${Math.round(Math.random() * 255)})`
    console.log(
      '%c┍------------------------------------------------------------------┑',
      `color:${randomColor};`
    )
    console.log('| 请求地址：', response.config.url)
    console.log('| 请求参数：', response.config.data ? JSON.parse(response.config.data) : {})
    console.log('| 返回数据：', response.data)
    console.log(
      '%c┕------------------------------------------------------------------┙',
      `color:${randomColor};`
    )
  }
}

const instance = axios.create(DEFAULT_OPTIONS)

// 设置 post、put 默认 Content-Type
instance.defaults.headers.post['Content-Type'] = 'application/json'
instance.defaults.headers.put['Content-Type'] = 'application/json'

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    if (config.method === 'post' || config.method === 'put') {
      // post、put 提交时，将对象转换为string, 为处理Java后台解析问题
      config.data = qs.stringify(config.data)
    }
    // 请求发送前进行处理
    return config
  },
  (error) => {
    // 请求错误处理
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default function() {
  return instance  
}
