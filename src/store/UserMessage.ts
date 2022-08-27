import { getUserDetail, loginByPhone } from '@/servies/api'
import { API } from '@/servies/api/API'
import { homeNavigation } from '@/servies/api/mock'
import { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'

type userMessageType = {
  avatarUrl: string
  nickname: string
  userId: number
}
type userHomeNavigationType = {
  findMusic: { content: string; key: string; path: string }[]
  myMusic: { content: string; key: string; path: string }[]
  other: { content: string; key: string; path: string }[]
}
export const useUserMessage = defineStore('UserMessage', {
  state: () => {
    return {
      //用户登陆相关
      userMessage: {} as userMessageType | null,
      //默认没有开始登录请求为false
      loginLoading: false,
      //用户homeNavigation相关
      userHomeNavigation: {} as userHomeNavigationType,
      //默认没有开始请求home左侧navigate为false
      homeNavigationLoading: false,
      userDetail: {} as API.getUserDetailTypes,
      getUserDetailLoading: false,
    }
  },
  actions: {
    //手机号密码登陆
    async loginByPhone(phone: string, password: string) {
      //开始进行登录请求，那么loginLoading为true
      this.loginLoading = true
      //进行用户登陆请求
      const res = await loginByPhone({ phone, password })
      // //登陆成功，更新用户信息
      this.userMessage = res.data.profile
      this.getUserDetailLoading = true
      const userDetail = await getUserDetail()
      this.userDetail = userDetail.data
      this.getUserDetailLoading = false
      // //保存token
      localStorage.setItem('token', res.data.token)
      // //登陆成功，提示用户
      ElMessage.success('登陆成功')
      // 加载完成，退出加载状态
      this.loginLoading = false
    },
    //进入页面时，获取用户登陆状态
    async getLoginStatus(res: AxiosResponse<API.getLoginStatusTypes, any>) {
      //如果用户登陆状态正常，则将用户登陆状态改为true
      // this.loginLoading = true
      if (res.data.profile !== null) {
        console.log('登陆了')
        //保存用户的个人信息
        this.userMessage = res.data.profile
        this.getUserDetailLoading = true
        const userDetail = await getUserDetail()
        this.userDetail = userDetail.data
        this.getUserDetailLoading = false
        //加载完成，退出加载状态
        this.loginLoading = false
      } else {
        console.log('没有登陆')
        //加载完成，退出加载状态
        this.loginLoading = false
      }
    },
    //mock模拟获取用户navigation数据
    async homeNavigation() {
      // 开始加载，进入加载状态
      this.homeNavigationLoading = true
      const res = await homeNavigation()
      //获取navigation成功，更新用户信息
      this.userHomeNavigation = res.data.homeNavigation
      // 加载完成，退出加载状态
      this.homeNavigationLoading = false
    },
  },
})
