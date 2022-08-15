import { loginByPhone } from '@/servies/api'
import { API } from '@/servies/api/API'
import { homeNavigation } from '@/servies/api/mock'
import { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'

type userMessageType = {
  avatarUrl: string;
  nickname: string;
}
type userHomeNavigationType = {
  findMusic: { content: string; key: string; path: string }[];
  myMusic: { content: string; key: string; path: string }[];
  other: { content: string; key: string; path: string }[];
}
export const useUserMessage = defineStore('UserMessage', {
  state: () => {
    return {
      //用户登陆相关
      userMessage: {} as userMessageType,
      //默认没有开始登录请求为false
      loginLoading: false,
      isLogin: false,
      //用户homeNavigation相关
      userHomeNavigation: {} as userHomeNavigationType,
      //默认没有开始请求home左侧navigate为false
      homeNavigationLoading: false,
    }
  },
  getters: {
    _userMessage: state => state.userMessage,
    _loginLoading: state => state.loginLoading,
    _isLogin: state => state.isLogin,
    _userHomeNavigation: state => state.userHomeNavigation,
    _homeNavigationLoading: state => state.homeNavigationLoading,
  },
  actions: {
    //手机号密码登陆
    async loginByPhone(phone: string, password: string) {
      //开始进行登录请求，那么loginLoading为true
      this.loginLoading = true
      //进行用户登陆请求
      await loginByPhone({ phone, password }).then(res => {
        //登陆成功，标记用户登陆成功
        this.isLogin = true
        // //登陆成功，更新用户信息
        this.userMessage = res.data.profile
        // //保存token
        localStorage.setItem('token', res.data.token)
        // //登陆成功，提示用户
        ElMessage.success('登陆成功')
        // 加载完成，退出加载状态
        this.loginLoading = false
      }).catch(error => {
        // 加载完成，退出加载状态
        this.loginLoading = false
      })
    },
    //进入页面时，获取用户登陆状态
    getLoginStatus(res: AxiosResponse<API.getLoginStatusTypes, any>) {
      //首次进入页面，获取用户登陆状态，那么loginLoading为true
      this.loginLoading = true
      //如果用户登陆状态正常，则将用户登陆状态改为true
      if (res.data.profile !== null) {
        this.isLogin = true
        //保存用户的个人信息
        this.userMessage = res.data.profile
      }
      //加载完成，退出加载状态
      this.loginLoading = false
    },
    //mock模拟获取用户navigation数据
    async homeNavigation() {
      // 开始加载，进入加载状态
      this.homeNavigationLoading = true
      await homeNavigation().then(res => {
        //获取navigation成功，更新用户信息
        this.userHomeNavigation = res.data.homeNavigation
        // 加载完成，退出加载状态
        this.homeNavigationLoading = false
      }).catch(error => {
        // 加载完成，退出加载状态
        this.homeNavigationLoading = false
      })
    }
  }
})