import { loginByPhone } from '@/servies/api'
import { homeNavigation } from '@/servies/api/mock'
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
      //一开始就是加载状态，如果加载成功，就改为false
      loginLoading: true,
      isLogin: false,
      //用户homeNavigation相关
      userHomeNavigation: {} as userHomeNavigationType,
      //一开始就是加载状态，如果加载成功，就改为false
      homeNavigationLoading: true,
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
      // 开始加载，进入加载状态
      this.loginLoading = true
      try {
        //进行用户登陆请求
        await loginByPhone({ phone, password }).then(res => {
          if (res.status === 200) {
            if (res.data.code === 200) {
              //登陆成功，标记用户登陆成功
              this.isLogin = true
              //登陆成功，更新用户信息
              this.userMessage = res.data.profile
              //保存token
              localStorage.setItem('token', res.data.token)
              //登陆成功，提示用户
              ElMessage.success('登陆成功')
              // 加载完成，退出加载状态
              this.loginLoading = false
            } else {
              //登陆失败，提示用户
              ElMessage.error(res.data.msg)
            }
          } else {
            this.loginLoading = false
            throw new Error(res.data.message || '请检查网络')
          }
        })
      } catch (error: any) {
        ElMessage({
          message: error?.message || '登陆失败',
          type: 'warning',
        });
      }
    },
    //进入页面时，获取用户登陆状态
    getLoginStatus(res: any) {
      if (res.data.code === 200) {
        this.isLogin = true
        this.loginLoading = false
        this.userMessage = res.data.profile
      }
    },
    //mock模拟获取用户navigation数据
    async homeNavigation() {
      // 开始加载，进入加载状态
      this.homeNavigationLoading = true
      try {
        await homeNavigation().then(res => {
          if (res.status === 200) {
            if (res.data.code === 200) {
              //获取navigation成功，更新用户信息
              this.userHomeNavigation = res.data.homeNavigation
              // 加载完成，退出加载状态
              this.homeNavigationLoading = false
            } else {
              //登陆失败，提示用户
              ElMessage.error('获取navigation失败')
            }
          } else {
            throw new Error('请检查网络')
          }
        })
      } catch (error: any) {
        ElMessage({
          message: error?.message || '获取用户导航栏失败',
          type: 'warning',
        });
      }
    }
  }
})