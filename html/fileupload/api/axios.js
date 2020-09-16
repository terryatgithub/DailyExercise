// axios api汇总
axios(config)
axios(url[, config])

axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.options(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])

axios.all(iterable)
axios.spread(callback)

axios.create([config])

axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 实例方法
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// 拦截器
axios.interceptors.request.use((config)=>{}, error=> Promise.reject(error))
axios.interceptors.response.use((config)=>{}, error=> Promise.reject(error))
const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor); // 移除拦截器
// 实例拦截器 可以为自定义 axios 实例添加拦截器
const instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});


// 文档：

// testcase 1: 执行get请求
axios
  .get("/user?ID=12345")
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// testcase 1-2
axios
  .get("/user", {
    params: {
      ID: 12345,
    },
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// testcase 2: post
axios
  .post("/user", {
    firstName: "Fred",
    lastName: "Yuan",
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// testcase 3 执行多个并发请求
function getUserAccount() {
  return axios.get("/user/12345");
}
function getUserPermissions() {
  return axios.get("/user/12345/permissions");
}
axios
  .all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perm) {}));

// testcase axios API
// 可以通过向axios传递相关配置来创建请求
// case 1: axios(config)
// 发送post请求
axios({
  method: "POST",
  url: "/user/12345",
  data: {
    firstName: "terry",
    lastName: "yuan",
  },
});
// 获取远端图片
axios({
  method: "GET",
  url: "http://bit.ly/2mTM3nY",
  responseType: "stream",
}).then(function (response) {
  response.data.pipe(fs.createWriteStream("ada_lovelace.jpg"));
});
// case 2:
// axios(url[, config])
// 发送get请求（默认）
axios("/user/12345");

// 请求方法的别名
// 为方便起见，为所有支持的请求方法提供了别名，在使用别名方法时，url,method,data这些属性都不必在配置中指定
// axios.request(config)
// axios.get(url[,config])
// axios.delete(url[,config])
// axios.head(url[,config])
// axios.options(url[,config])
// axios.post(url[,config])
// axios.put(url[,config])
// axios.patch(url[,config])

// testcase 并发
// 处理并发请求的助手函数
axios.all(iterable);
axios.spread(callback);

// testcase 创建实例
// 可以使用自定义配置新建一个axios实例
// axios.create([config])
const instance = axios.create({
  baseURL: "https://some-domain.com/api",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

// 实例方法同上面列出的方法别名，指定的配置将与实例的配置合并

// 请求配置
// 这些是创建请求时可以用的配置选项，只有url是必须的，如果没有指定method，默认get

// 响应结构
// 某个请求的响应包含以下信息
// {
//     // data 由服务器提供的响应
//     data: {},

//     // status 来自服务器响应的http状态码
//     status: 200,

//     // statusText 来自服务器响应的http状态信息
//     statusText: 'OK',

//     // headers 服务器响应的头
//     headers: {},

//     // config 是为请求提供的配置信息
//     config: {},

//     // request 是生成这个响应的请求
//     // 在nodejs(in redirects)里是最后一个 ClientRequest 实例
//     // 在浏览器里是 XMLHttpRequest 实例
//     request: {}
// }

// 配置默认值
// 你可以指定将被用在各个请求的配置默认值
// 1. 全局的axios默认值
axios.defaults.baseURL = "https://api.example.com";
axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
// 2. 自定义实例默认值
const instance = axios.create({
  baseURL: "https://api.example.com",
});
instance.defaults.headers.common["Authorization"] = AUTH_TOKEN;

// 配置的优先顺序
// 配置会以一个优先顺序进行合并。这个顺序是：在 lib/defaults.js 找到的库的默认值，然后是实例的 defaults 属性，最后是请求的 config 参数。后者将优先于前者。
// 使用由库提供的配置默认值来创建实例
// 此时超时配置的默认值是 0
var instance = axios.create();

// 覆盖库的超市默认值
// 现在在超时前，所有请求都会等待2.5秒
instance.defaults.timeout = 2000;

// 为已知需要花费很长时间的请求复写超时设置
instance.get("/longRequest", {
  timeout: 5000,
});

// 拦截器
// 在请求或响应被 then 或 catch处理前拦截它们
// 添加拦截请求器
axios.interceptors.request.use(function(config) {
    // 发送请求前做些什么
    return config
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(function(response) {
    // 对响应数据做点什么
    return response
}, function(error){
    // 对响应错误做点什么
    return Promise.reject(error)
})
// 如果想在稍候移除拦截器，可以这样：
const myInterceptor = axios.interceptors.request.use(functiono(){})
axios.interceptors.request.eject(myInterceptor)
// 也可以为自定义axios实例添加拦截器
const instance = axios.create()
instance.interceptors.request.use(function(){})

// 错误处理
axios.get('/user/12345')
    .catch(function(error) {
        if(error.response) {
            // status code falls out of the range of 2xx
            error.response.data
            error.response.status
            error.response.headers
        } else if (error.request){
         // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js   
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
    })
// 也可以使用validateStatus配置选项定义一个自定义HTTP状态码的错误范围
axios.get('/user/12345', {
    validataStatue: function(status){
        return status < 500; // reject only if the status code is greater than or equal to 500
    }
})

// 取消
// 使用 cancel token取消请求
// Axios 的cancel token API基于cancelable promises proposal, 还处于第一阶段
// 可以使用 CancelToken.source 工厂方法创建 cancel token, 像这样
const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios.get('/user/12345', {
    cancelToken: source.token
}).catch(function(thrown) {
    if(axios.isCancel(thrown)) { // 可以判断请求是被cancel了
        console.log('Request Canceled', thrown.message);
    } else {
        // 处理错误
    }
})
axios.post('/user/12345', {
    name: 'new name'
}, {
    cancelToken: source.token
})
// 取消以上请求（message可选）
source.cancel('Operation canceled by the user.')

// 还可以通过传递一个executor函数到 CancelToken 的构造函数来创建 cancel token
const CancelToken = axios.CancelToken
let cancel
axios.get('/user/21345', {
    cancelToken: new CancelToken(function executor(c) {
        // executor函数接受一个cancel函数作为参数
        cancel = c 
    })
})
// cancel 请求
cancel()
