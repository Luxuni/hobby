<script setup lang="ts">
import {computed, onMounted, reactive, ref, toRaw} from 'vue'
import {useRouter} from 'vue-router'
import {ElMessage, FormInstance} from 'element-plus'
import '@/assets/style/login.scss'
import {useUserMessage} from '@/store/UserMessage'
import {Sunny, Moon} from '@element-plus/icons-vue'
import {useDark, useToggle} from '@vueuse/core'

const router = useRouter()
//获取UserMessageStore
const UserMessageStore = useUserMessage()
//如果UserMessageStore中isLogin为true，则跳转到首页
UserMessageStore.$subscribe((mutatian, state) => {
  if (state.isLogin && state.loginLoading === false) {
    router.push({name: 'home'})
  }
})
//拿到指示器的实例
const indicator = ref<HTMLSpanElement>(undefined as unknown as HTMLSpanElement)
//拿到切换登录界面按钮的实例
const loginIndicator = ref<HTMLSpanElement | null>(null)
//决定指示器文字颜色
const indicatorColor = ref(true)
//每次点击切换登录界面时，指示器的位置变化
let initialLeft = 0 //记录初始距离左边的值
let Time: any = null //记录有没有开启定时器
//点击切换登录界面时，指示器的位置变化，改变文字颜色并且改变显示登陆界面或者注册界面
const clickLoginInterface = (e: any) => {
  clearTimeout(Time)
  //判断往右动还是往左边动
  if (e.target.offsetLeft === initialLeft) {
    //如果没有改变
    //那么则不改变是显示登陆还是注册
  } else if (e.target.offsetLeft > initialLeft) {
    //如果往右边动
    //那么改变是显示登陆还是注册
    loginOrSign.value = !loginOrSign.value
    //不用判断，往右一定是注册，那么切换为注册表单
    modelFlag.value = 1
    indicator.value.style.left = ''
    indicator.value.style.right = `${(indicator.value.parentElement?.offsetWidth ?? 400) - e.target.offsetLeft - e.target.offsetWidth}px`
    indicator.value.style.width = '0px'
    initialLeft = e.target.offsetLeft
    indicatorColor.value = !indicatorColor.value
    Time = setTimeout(() => {
      indicator.value.style.width = `${e.target.offsetWidth}px`
    }, 300)
  } else {
    //如果往左边动
    //那么改变是显示登陆还是注册
    loginOrSign.value = !loginOrSign.value
    //不用判断，往左一定是登陆，那么切换为登陆表单
    modelFlag.value = 0
    indicator.value.style.right = ''
    indicator.value.style.left = `${e.target.offsetLeft}px`
    indicator.value.style.width = '0px'
    initialLeft = e.target.offsetLeft
    indicatorColor.value = !indicatorColor.value
    Time = setTimeout(() => {
      indicator.value.style.width = `${e.target.offsetWidth}px`
    }, 300)
  }
}
//是显示登陆表单还是显示注册表单
const loginOrSign = ref(true)
//使用计算属性来决定表单切换动画的方向
const animationDirection = computed(() => {
  return loginOrSign.value
    ? {enter: 'animate__animated animate__fadeInLeft', leave: 'animate__animated animate__fadeOutLeft'}
    : {enter: 'animate__animated animate__fadeInRight', leave: 'animate__animated animate__fadeOutRight'}
})
//获取登陆表单实例
const loginFormRef = ref<FormInstance>()
//登陆表单验证
//手机号验证方法
const validatePhoneNumber = (rule: any, value: any, callback: any) => {
  if (value === '') {
    return callback(new Error('请输入手机号'))
  } else {
    callback()
  }
}
//密码验证方法
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    return callback(new Error('请输入密码'))
  } else {
    callback()
  }
}
//验证码验证方法
const verificationCode = (rule: any, value: any, callback: any) => {
  if (value === '') {
    return callback(new Error('请输入验证码'))
  } else {
    callback()
  }
}
//这是一个指向登陆表单或者注册表单的指示器，如果为0，那么填写的是登陆表单，如果为1，那么填写的是注册表单
const modelFlag = ref(0)
//登陆和注册表单model,1为登陆表单，0为注册表单
const loginForm = reactive([
  {
    phoneNumber: '15755967688',
    password: '200223252@lml',
  },
  {
    signPhoneNumber: '',
    signPassword: '',
    verificationCode: '',
  },
])
//自定义表单验证规则
const loginRules = reactive({
  phoneNumber: [{validator: validatePhoneNumber, trigger: 'blur'}],
  password: [{validator: validatePassword, trigger: 'blur'}],
  signPhoneNumber: [{validator: validatePhoneNumber, trigger: 'blur'}],
  signPassword: [{validator: validatePassword, trigger: 'blur'}],
  verificationCode: [{validator: verificationCode, trigger: 'blur'}],
})
//登陆表单提交方法
const loginSubmitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      //如果用户输入的登陆信息通过了rules验证，那么将用户输入的手机号和密码信息传输到UserMessage中进行请求
      UserMessageStore.loginByPhone(toRaw(loginForm)[modelFlag.value].phoneNumber as string, toRaw(loginForm)[modelFlag.value].password as string)
    } else {
      console.log('error submit!', fields)
    }
  })
}
//注册表单提交方法
const signSubmitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!', toRaw(loginForm)[modelFlag.value])
    } else {
      console.log('error submit!', fields)
    }
  })
}
//获取验证码
const getVerificationCodeText = ref('获取验证码') //初始化为获取验证码
const getVerificationCodeCountdown = ref(60) //初始化为60秒
const isItPossibleToGetTheVerificationCode = ref(false) //控制获取验证码按钮是否可用
const getVerificationCode = () => {
  if (toRaw(loginForm)[modelFlag.value].signPhoneNumber === '') {
    ElMessage({
      message: '请输入手机号',
      type: 'warning',
    })
    return
  } else {
    if (getVerificationCodeCountdown.value === 60) {
      isItPossibleToGetTheVerificationCode.value = true
      let timer = setInterval(() => {
        getVerificationCodeCountdown.value--
        if (getVerificationCodeCountdown.value === 0) {
          getVerificationCodeText.value = '获取验证码'
          clearInterval(timer)
          getVerificationCodeCountdown.value = 60
          isItPossibleToGetTheVerificationCode.value = false
        } else {
          getVerificationCodeText.value = `${getVerificationCodeCountdown.value}秒后重新获取`
        }
      }, 1000)
    }
    console.log(toRaw(loginForm)[modelFlag.value].signPhoneNumber)
    return
  }
}
//用户已有密码,跳转到登陆界面
const goLoginNow = () => {
  loginOrSign.value = true
  //既然切换到登陆界面，自然是需要切换为登陆表单
  modelFlag.value = 0
  indicator.value.style.right = ''
  indicator.value.style.left = `${loginIndicator.value?.offsetLeft}px`
  indicator.value.style.width = '0px'
  initialLeft = loginIndicator.value?.offsetLeft as number
  indicatorColor.value = !indicatorColor.value
  Time = setTimeout(() => {
    indicator.value.style.width = `${loginIndicator.value?.offsetWidth}px`
  }, 300)
}
//切换主题相关功能
const switchThemes = ref(true) //切换主题开关
const isDark = useDark()
const toggleDark = useToggle(isDark)
//登陆界面初始化时，拿到指示器的初始位置及宽度
onMounted(async () => {
  indicator.value.style.left = `${loginIndicator.value?.offsetLeft}px`
  initialLeft = loginIndicator.value?.offsetLeft as number
  indicator.value.style.width = `${loginIndicator.value?.offsetWidth}px`
  //获取html上的class属性，如果有dark，那么切换主题开关为true，否则为false
  if (document.documentElement.classList.contains('dark')) {
    switchThemes.value = false
  } else {
    switchThemes.value = true
  }
})
</script>

<template>
  <div
    class="h-screen w-screen bg-no-repeat bg-cover lg:min-w-[1470px] lg:relative dark:brightness-75"
    style="background-image: url(../../src/assets/img/login.svg)"
  >
    <div class="h-full w-full lg:backdrop-blur-md lg:flex lg:items-center lg:justify-center">
      <div class="h-full w-full lg:h-[915px] lg:min-h-[915px] lg:w-[1470px] lg:min-w-[1470px] lg:shadow-md lg:relative">
        <!-- background -->
        <div
          class="w-full h-full bg-no-repeat bg-cover lg:w-1/2 lg:bg-auto lg:absolute lg:left-0 lg:transition-all lg:duration-300 lg:ease-in-out dark:brightness-50"
          :class="{'lg:ml-0': loginOrSign, 'lg:ml-[735px]': !loginOrSign, 'lg:rounded-r-md': !loginOrSign, 'lg:rounded-l-md': loginOrSign}"
          style="background-image: url(../../src/assets/img/login.svg)"
        ></div>
        <!-- login_box -->
        <div
          class="lg:w-1/2 lg:h-full lg:flex lg:items-center justify-center lg:bg-white lg:opacity-80 lg:flex-shrink-0 lg:absolute lg:right-0 lg:transition-all lg:duration-300 lg:ease-in-out lg:dark:bg-[#495C83]"
          :class="{'lg:mr-0': loginOrSign, 'lg:mr-[735px]': !loginOrSign, 'lg:rounded-r-md': loginOrSign, 'lg:rounded-l-md': !loginOrSign}"
        >
          <div
            class="px-8 w-[400px] h-[600px] fixed inset-0 m-auto rounded-lg backdrop-blur-md backdrop-brightness-90 backdrop-contrast-75 backdrop-opacity-90 lg:m-0 lg:static lg:backdrop-blur-none lg:backdrop-brightness-0 lg:backdrop-contrast-0 lg:backdrop-opacity-0 lg:shadow-md lg:dark:bg-[#7A86B6]"
          >
            <!-- internal login box -->
            <div class="w-full h-full">
              <el-form
                ref="loginFormRef"
                label-position="top"
                label-width="100px"
                :model="loginForm[modelFlag]"
                style="width: 100%"
                class="self-center"
                :rules="loginRules"
                status-icon
              >
                <el-form-item>
                  <!-- title -->
                  <transition mode="out-in" :enter-active-class="animationDirection.enter" :leave-active-class="animationDirection.leave">
                    <div class="antialiased text-4xl font-bold flex items-center justify-between" v-if="loginOrSign">
                      <h1>登陆</h1>
                      <!-- 切换主题组件 -->
                      <el-switch
                        v-model="switchThemes"
                        @change="toggleDark()"
                        inline-prompt
                        :active-icon="Sunny"
                        :inactive-icon="Moon"
                        style="--el-switch-on-color: #f5e8c7; --el-switch-off-color: #100720"
                      />
                    </div>
                    <div class="antialiased text-4xl font-bold flex items-center justify-between" v-else>
                      <h1>注册</h1>
                      <!-- 切换主题组件 -->
                      <el-switch
                        v-model="switchThemes"
                        @change="toggleDark()"
                        inline-prompt
                        :active-icon="Sunny"
                        :inactive-icon="Moon"
                        style="--el-switch-on-color: #f5e8c7; --el-switch-off-color: #100720"
                      />
                    </div>
                  </transition>
                </el-form-item>
                <el-form-item>
                  <!-- Options -->
                  <div class="w-full h-full flex flex-row flex-nowrap flex-none justify-between text-lg font-normal relative pb-[4px]">
                    <!-- 滑动菜单指示器 -->
                    <span
                      id="indicator"
                      class="absolute h-[4px] inline-block bottom-0 bg-[#4EC8D5] rounded-[4px] transition-all duration-300 ease-in-out"
                      ref="indicator"
                    ></span>
                    <span
                      class="w-1/3 text-center cursor-pointer transition-all duration-300 ease-in-out"
                      :class="{'text-gray-400': !indicatorColor}"
                      ref="loginIndicator"
                      @click="clickLoginInterface"
                      >手机号登陆</span
                    >
                    <span
                      class="w-1/3 text-center cursor-pointer transition-all duration-300 ease-in-out"
                      :class="{'text-gray-400': indicatorColor}"
                      ref="signIndicator"
                      @click="clickLoginInterface"
                      >手机号注册</span
                    >
                  </div>
                </el-form-item>
                <transition mode="out-in" :enter-active-class="animationDirection.enter" :leave-active-class="animationDirection.leave">
                  <div v-if="loginOrSign" class="h-2/3 flex flex-col justify-between">
                    <!-- 登陆时应该显示的input -->
                    <el-form-item label="手机号" size="large" prop="phoneNumber" key="loginPhoneNumber">
                      <el-input v-model="loginForm[modelFlag].phoneNumber" />
                    </el-form-item>
                    <el-form-item label="密码" size="large" prop="password" key="loginPassword">
                      <el-input v-model="loginForm[modelFlag].password" type="password" />
                    </el-form-item>
                    <el-form-item size="large" key="loginBtn">
                      <el-button @click="loginSubmitForm(loginFormRef)" type="primary" :loading="UserMessageStore._loginLoading">登陆</el-button>
                    </el-form-item>
                    <el-form-item key="loginText">
                      <span class="text-blue-400 text-right cursor-pointer">忘记密码?</span>
                    </el-form-item>
                  </div>
                  <!-- 注册时应该显示的input -->
                  <div v-else class="h-2/3 flex flex-col justify-between">
                    <el-form-item label="手机号" size="large" prop="signPhoneNumber" key="signPhoneNumber">
                      <el-input v-model="loginForm[modelFlag].signPhoneNumber" />
                    </el-form-item>
                    <el-form-item label="密码" size="large" prop="signPassword" key="signPassnumber">
                      <el-input v-model="loginForm[modelFlag].signPassword" type="password" />
                    </el-form-item>
                    <el-form-item label="验证码" size="large" prop="verificationCode" key="signVerificationCode">
                      <div class="flex">
                        <el-input v-model="loginForm[modelFlag].verificationCode" />
                        <el-button type="primary" plain @click="getVerificationCode" :disabled="isItPossibleToGetTheVerificationCode">{{
                          getVerificationCodeText
                        }}</el-button>
                      </div>
                    </el-form-item>
                    <el-form-item size="large" key="signBtn">
                      <el-button @click="signSubmitForm(loginFormRef)" type="primary">注册</el-button>
                    </el-form-item>
                    <el-form-item key="signText">
                      <div class="text-right">
                        <span class="text-gray-400">已有账户?</span>
                        <span class="text-blue-400 cursor-pointer" @click="goLoginNow">马上登陆</span>
                      </div>
                    </el-form-item>
                  </div>
                </transition>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
