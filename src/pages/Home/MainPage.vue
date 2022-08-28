<script setup lang="ts">
import { HomeMessage } from '@/store/HomeMessage'
import { storeToRefs } from 'pinia'
import gsap from 'gsap'
import LeftNavigation from '@/components/Home/LeftNavigation/index.vue'

const HomeMessageStore = HomeMessage()
const { topArtists, topArtistsLoading } = storeToRefs(HomeMessageStore)
//在pinia中获取热门歌手内容
await HomeMessageStore.getTopArtists(3)
//左侧入场动画
const leftNavigationEnter = (el: any, done: gsap.Callback) => {
  gsap.from(el, { duration: 2.5, x: -400, ease: 'strong.inOut', lazy: true, onComplete: done })
}
//右侧入场动画
const rightEnter = (el: any, done: gsap.Callback) => {
  gsap.from(el, { duration: 2.5, x: 400, ease: 'strong.inOut', lazy: true, onComplete: done })
}
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <!-- 内层容器 -->
    <div class="h-[95%] w-[95%] flex">
      <!-- left -->
      <Transition name="left_navigation" mode="out-in" @enter="leftNavigationEnter" appear :css="false">
        <div v-show="true" class="h-full w-1/5 rounded-[3rem] bg-[#252D3A] flex">
          <RouterView name="leftNavigation" v-slot="{ Component }">
            <Transition name="fade" mode="out-in" enter-active-class="animate__animated animate__fadeInLeft"
              leave-active-class="animate__animated animate__fadeOutLeft">
              <component :is="Component ?? LeftNavigation"></component>
            </Transition>
          </RouterView>
        </div>
      </Transition>
      <!-- middle content -->
      <div class="h-full w-3/5 px-[2%]">
        <RouterView v-slot="{ Component }">
          <template v-if="Component">
            <Transition name="fade" mode="out-in" enter-active-class="animate__animated animate__fadeIn"
              leave-active-class="animate__animated animate__fadeOut">
              <Suspense>
                <template #default>
                  <component :is="Component"></component>
                </template>
                <template #fallback>
                  <h1 class="h-full w-full text-white text-4xl flex items-center justify-center">Loading...</h1>
                </template>
              </Suspense>
            </Transition>
          </template>
        </RouterView>
      </div>
      <!-- 右侧 -->
      <Transition name="right" @enter="rightEnter" :css="false" appear>
        <div v-show="true" class="h-full w-1/5 flex flex-col justify-between">
          <!-- top -->
          <div class="h-[5%] w-full flex items-center justify-between">
            <!-- ring -->
            <div class="h-full aspect-square cursor-pointer">
              <MyImage src="../../src/assets/img/ring.svg" className="h-full w-full" />
            </div>
            <!-- v -->
            <div class="h-full w-[71%] bg-[#252C3A] rounded-full flex items-center justify-evenly">
              <MyImage src="../../src/assets/img/v.svg" className="h-2/3 aspect-square" />
              <span>开通会员享受更多权益</span>
            </div>
          </div>
          <!--  music producer -->
          <div class="w-full h-1/3 flex flex-col justify-between">
            <!-- tab -->
            <div class="h-[15%] w-full flex justify-between items-center">
              <div class="text-lg">音乐制作人</div>
              <div class="text-sm">查看更多</div>
            </div>
            <!-- producen -->
            <div class="h-[85%] w-full flex flex-col justify-between">
              <div v-for="item in topArtists" class="h-[25%] w-full">
                <ProducenItem :key="item.id" :picUrl="item.picUrl" :fansCount="item.fansCount"
                  :musicSize="item.musicSize" :name="item.name" :loading="topArtistsLoading" />
              </div>
            </div>
          </div>
          <!-- player -->
          <div class="w-full h-[58%] bg-[#262D3A] rounded-3xl">
            <Player />
          </div>
        </div>
      </Transition>

    </div>
  </div>
</template>

<style scoped>
</style>
