<script setup lang="ts">
import {onMounted} from 'vue'
import {getLoginStatus} from '@/servies/api'
import {useUserMessage} from '@/store/UserMessage'
import {useRouter} from 'vue-router'

const router = useRouter()
//获取UserMessageStore
const UserMessageStore = useUserMessage()
//如果UserMessageStore中isLogin为true，则跳转到首页
UserMessageStore.$subscribe((mutatian, state) => {
  //如果用户已登录，则跳转到首页
  if (state.isLogin) {
    router.push({name: 'home'})
  }
})
onMounted(async () => {
  //获取登录状态
  await getLoginStatus().then((res) => {
    UserMessageStore.getLoginStatus(res.data)
  })
})
</script>

<template>
  <router-view v-slot="{Component}">
    <!-- 添加路由转场动画 -->
    <transition name="fade" mode="out-in" enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style scoped></style>
