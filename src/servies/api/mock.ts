import request from "@/servies/request";

//mock模拟获取用户navigation数据
export const homeNavigation = () => {
  return request({
    url: '/mock/navigation',
    method: 'get',
  })
}