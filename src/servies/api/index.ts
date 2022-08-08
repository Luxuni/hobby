import request from "@/servies/request";

//手机号密码登陆接口
export const loginByPhone = (params: { phone: string; password: string }) => {
  return request({
    url: 'api/login/cellphone',
    method: 'get',
    params: params
  })
}

//获取用户登陆状态接口
export const getLoginStatus = () => {
  return request({
    url: 'api/login/status',
    method: 'get'
  })
}