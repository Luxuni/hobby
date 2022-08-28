<script setup lang="ts">
import Banner from '@/components/Home/Banner/index.vue'
import HeaderSearch from '@/components/Home/public/Search/HeaderSearch.vue'
import '@/pages/Home/Middle/Middle.scss'
import { getSearchDefault } from '@/servies/api'
import { API } from '@/servies/api/API'
import { HomeMessage, personalizedType } from '@/store/HomeMessage'
import { ArrowDownBold, Moon, Sunny } from '@element-plus/icons-vue'
import { useDark, useToggle } from '@vueuse/core'
import gsap from 'gsap'
import { storeToRefs } from 'pinia'
import { onBeforeUnmount, ref } from 'vue'
import { useRoute } from 'vue-router'

type HotSearchTypes = {
  value: string
  score: number
  iconUrl: string
  alg: string
}
type SearchTypes = {
  value: string
  name: string
  id: number
  ar: {
    id: number
    name: string
  }[]
  al: {
    id: number
    name: string
    picUrl: string
  }[]
}

const route = useRoute()
const HomeMessageStore = HomeMessage()
const { personalized, personalizedLoading } = storeToRefs(HomeMessageStore)
//切换主题相关功能
const switchThemes = ref(route.meta.switchThemes) //切换主题开关
const isDark = useDark()
const toggleDark = useToggle(isDark)
//下拉菜单的值
const classification = ref('热门推荐')
//点击下拉菜单
const handleDropdown = async (value: { id: string; name: string }) => {
  classification.value = value.name
  //如果是热门推荐，则返回热门搜索内容
  if (value.id === 'popular') {
    await HomeMessageStore.getPersonalized(8)
  } else {//否则，返回通过精品歌单接口查询歌单
    await HomeMessageStore.getTopPlaylist(value.name, 8)
  }
}
//默认搜索关键词
const searchDefault = ref('')
//请求获得默认搜索关键词
const {
  data: { data: data },
} = await getSearchDefault()
searchDefault.value = data.realkeyword
//在pinia中获取热门推荐内容
await HomeMessageStore.getPersonalized(8)
//底部入场动画
const footEnter = (el: any, done: gsap.Callback) => {
  gsap.from(el, { duration: 2.5, y: 700, ease: 'strong.inOut', lazy: true, onComplete: done })
}
//顶部搜索栏入场动画
const searchEnter = (el: any, done: gsap.Callback) => {
  gsap.from(el, { duration: 2.5, y: -400, ease: 'strong.inOut', lazy: true, onComplete: done })
}
const bannerRef = ref(null as unknown as HTMLDivElement)
const searchRef = ref(null)
const footSongList = ref(null)
onBeforeUnmount(() => {
  gsap.to(searchRef.value, { duration: 0.6, y: -400, opacity: 0, ease: 'strong.inOut', lazy: true })
  gsap.to(footSongList.value, { duration: 0.6, y: 700, opacity: 0, ease: 'strong.inOut', lazy: true })
})
</script>

<template>
  <div class="h-full w-full flex flex-col justify-between">
    <!-- header -->
    <Transition name="search" @enter="searchEnter" :css="false" appear>
      <div ref="searchRef" v-show="true" class="h-[5%] w-full">
        <HeaderSearch />
      </div>
    </Transition>
    <!-- body 轮播图 -->
    <div ref="bannerRef" class="h-[42%] w-full">
      <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <Transition name="fade" mode="out-in" enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut">
            <Suspense>
              <template #default>
                <component :is="Component ?? Banner"></component>
              </template>
              <template #fallback>
                <h1 class="h-full w-full text-white text-4xl flex items-center justify-center">Loading...</h1>
              </template>
            </Suspense>
          </Transition>
        </template>
      </RouterView>
    </div>
    <!-- foot 歌单 -->
    <Transition name="foot" @enter="footEnter" :css="false" appear>
      <div ref="footSongList" v-show="true" class="h-[46%] w-full flex flex-col justify-between">
        <div class="h-[11%] w-[50%]">
          <!-- tab -->
          <div class="w-full h-full flex justify-between items-center">
            <!-- download arror -->
            <div class="h-full aspect-square cursor-pointer">
              <MyImage src="../../src/assets/img/download.svg" className="h-full w-full" />
            </div>
            <!-- menu arror -->
            <div class="h-full aspect-square cursor-pointer">
              <MyImage src="../../src/assets/img/menu.svg" className="h-full w-full" />
            </div>
            <!--Selector  -->
            <el-dropdown @command="handleDropdown" popper-class="w-[10%]" class="h-full w-[38%]">
              <div ref="dropdown"
                class="h-full w-full rounded-full bg-[#313745] flex items-center justify-center text-white">
                <span class="mr-5">{{ classification }}</span>
                <el-icon>
                  <ArrowDownBold />
                </el-icon>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item :command="{ id: 'popular', name: '热门推荐' }">热门推荐</el-dropdown-item>
                  <el-dropdown-item :command="{ id: 'chinese', name: '华语' }">华语</el-dropdown-item>
                  <el-dropdown-item :command="{ id: 'popularity', name: '流行' }">流行</el-dropdown-item>
                  <el-dropdown-item :command="{ id: 'rock', name: '摇滚' }">摇滚</el-dropdown-item>
                  <el-dropdown-item :command="{ id: 'electronic', name: '电子' }">电子</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <!-- theme -->
            <el-switch v-model="switchThemes" @change="toggleDark()" inline-prompt :active-icon="Sunny"
              :inactive-icon="Moon" size="large"
              style="--el-switch-on-color: #100720; --el-switch-off-color: #100720" />
          </div>
        </div>
        <div class="w-full h-[84%] grid grid-cols-4 grid-rows-2 gap-4 items-center justify-items-center">
          <ShowItem v-for="item in personalized" :key="item.id"
            :src="(item as personalizedType).picUrl ?? (item as API.playListTypes).coverImgUrl" :name="item.name"
            :id="item.id" :loading="personalizedLoading" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
</style>