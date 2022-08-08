import axios from 'axios';
//基本配置
const request = axios.create({
  timeout: 5000,
  //请求头配置
  headers: { 'X-Requested-With': 'XMLHttpRequest', 'token': localStorage.getItem('token') as string },
  //允许携带coookie
  withCredentials: true,
  //配置放行的状态码
  validateStatus: function (status) {
    return status >= 200 && status < 500; // default
  }
});
//请求拦截器
request.interceptors.request.use(config => {
  console.log('request', config);
  return config;
}, (err: Error) => {
  return Promise.reject(err);
})
//响应拦截器
request.interceptors.response.use(config => {
  console.log('response', config);
  return config;
}, (err: Error) => {
  return Promise.reject(err);
})
export default request;