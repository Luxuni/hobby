import axios, { AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
//给请求带上token
const handleToken = (config: AxiosRequestConfig<any>) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = { 'token': token, 'X-Requested-With': 'XMLHttpRequest', };
  }
  return config;
}
//状态码处理
const handleNetworkError = (errStatus: number, data: { code: number; message: string; msg: string; }) => {
  let errMessage = '未知错误'
  if (errStatus) {
    switch (errStatus) {
      case 250:
        errMessage = data.message
        break;
      case 400:
        errMessage = '错误的请求'
        break
      case 401:
        errMessage = '未授权，请重新登录'
        break
      case 403:
        errMessage = '拒绝访问'
        break
      case 404:
        errMessage = '请求错误,未找到该资源'
        break
      case 405:
        errMessage = '请求方法未允许'
        break
      case 408:
        errMessage = '请求超时'
        break
      case 500:
        errMessage = '服务器端出错'
        break
      case 501:
        errMessage = '网络未实现'
        break
      case 502:
        errMessage = '网络错误'
        break
      case 503:
        errMessage = '服务不可用'
        break
      case 504:
        errMessage = '网络超时'
        break
      case 505:
        errMessage = 'http版本不支持该请求'
        break
      default:
        errMessage = `其他连接错误 --${errStatus}`
    }
  } else {
    errMessage = `无法连接到服务器！`
  }

  ElMessage.error(errMessage)
}
//code处理
const handleCodeError = (data: { code: number; message: string; msg: string; }) => {
  ElMessage.error(data.message || data.msg || '未知错误')
}
//取消请求的方法
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
//基本配置
const request = axios.create({
  timeout: 5000,
  //允许携带coookie
  withCredentials: true,
  //配置放行的状态码
  validateStatus: function (status) {
    return status === 200; // default
  }
});
//请求拦截器
request.interceptors.request.use(config => {
  //处理请求头
  config = handleToken(config);
  config.cancelToken = source.token;
  return config;
}, (err: Error) => {
  return Promise.reject(err);
})
//响应拦截器
request.interceptors.response.use(config => {
  if (config.status !== 200) {
    return Promise.reject(config.data);
  } else {
    if (config.data?.code === 200) {
      return config;
    } else if (config.data?.data.code === 200) {
      return config.data;
    } else {
      handleCodeError(config.data.data || config.data);
      return Promise.reject(config.data)
    }
  }
}, (err: any) => {
  handleNetworkError(err.response.status, err.response.data)
  return Promise.reject(err.response)
})
export default request;