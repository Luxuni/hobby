<script setup lang="ts">
import '@/pages/Home/Middle/Middle.scss'
import { useRouter, useRoute } from 'vue-router'
import { cloudSearch, getHotSearch, getSearchDefault, logout } from '@/servies/api'
import { onBeforeUnmount, Ref, ref, toRaw } from 'vue'
import { Search, ArrowDownBold, Sunny, Moon } from '@element-plus/icons-vue'
import { useDark, useToggle } from '@vueuse/core'
import { HomeMessage, personalizedType } from '@/store/HomeMessage'
import { API } from '@/servies/api/API'
import { MusicPlayer } from '@/store/MusicPlayer'
import { storeToRefs } from 'pinia'
import gsap from 'gsap'
import { AnimationMessage } from '@/store/AnimationMessage'
import _ from 'lodash'

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

const router = useRouter()
const route = useRoute()
const HomeMessageStore = HomeMessage()
const { personalized, personalizedLoading } = storeToRefs(HomeMessageStore)
const MusicPlayerStore = MusicPlayer()
//切换主题相关功能
const switchThemes = ref(route.meta.switchThemes) //切换主题开关
const isDark = useDark()
const toggleDark = useToggle(isDark)
//返回上一路由
const goBackArror = async () => {
  await logout()
  router.push({ name: 'Login' })
}
//前进路由
const goAheadArror = () => {
  router.go(1)
}
//search input
const state = ref('')
// TODO存在问题，每次搜索都会触发该方法，而且搜索的内容是上一次的内容，而且抖动
const querySearchAsync = async (queryString: string, cb: (arg: any) => void) => {
  let result
  //querySting不为空字符串或者不存在时，执行搜索，否则返回热搜
  const { data: data } = queryString !== '' && queryString ? await cloudSearch({ keywords: queryString, type: 1, limit: 10, offset: 0 }) : await getHotSearch()
  if (queryString === '' && !queryString) {
    //如果没有输入内容，则返回热门搜索内容
    result = (data as API.getHotSearchTypes).data.map(({ searchWord, score, iconUrl, alg }) => ({ value: searchWord, score, iconUrl, alg }))
  } else {
    //如果有输入内容，则返回搜索结果
    result = (data as API.cloudSearchTypes).result.songs.map(({ name, id, ar, al }) => ({ value: name, name: name, id, ar, al }))
  }
  cb(result)
}
//点击搜索结果
const handleSelect = (value: Ref<HotSearchTypes | SearchTypes>) => {
  console.log('点击搜索结果', value)
  //如果value为用户输入关键词后搜索的歌曲
  if (value.hasOwnProperty('id')) {
    //将id发送到piniahu
    MusicPlayerStore.getSongDetail(toRaw(value as unknown as SearchTypes).id)
  }
}
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
const AnimationMessageStore = AnimationMessage()
const { mainPageBannerLocation } = storeToRefs(AnimationMessageStore)
const bannerLocation = () => {
  _.debounce(() => {
    if (bannerRef.value.getBoundingClientRect()) {
      const { x: coverX, y: coverY } = bannerRef.value.getBoundingClientRect()
      mainPageBannerLocation.value = { x: coverX, y: coverY }
    } else {
      return
    }
  }, 1000, { 'leading': true, 'trailing': false, })()
}
const searchRef = ref(null)
const footSongList = ref(null)
onBeforeUnmount(() => {
  gsap.to(searchRef.value, { duration: 1, y: -400, opacity: 0, ease: 'strong.inOut', lazy: true })
  gsap.to(footSongList.value, { duration: 0.6, y: 700, opacity: 0, ease: 'strong.inOut', lazy: true })
})
</script>

<template>
  <div class="h-full w-full flex flex-col justify-between">
    <!-- header -->
    <Transition name="search" @enter="searchEnter" :css="false" appear>
      <div ref="searchRef" v-show="true" class="h-[5%] flex justify-between">
        <!-- arror -->
        <div class="w-[16%] h-full flex justify-between">
          <!-- back arror -->
          <div class="h-full aspect-square cursor-pointer" @click="goBackArror">
            <MyImage src="../../src/assets/img/back_arror.svg" className="h-full w-full" />
          </div>
          <!-- go ahead arror -->
          <div class="h-full aspect-square cursor-pointer" @click="goAheadArror">
            <MyImage src="../../src/assets/img/go_ahead_arror.svg" className="h-full w-full" />
          </div>
        </div>
        <!-- search input -->
        <div class="h-full w-[78%]">
          <el-autocomplete class="h-full w-full" v-model="state" :fetch-suggestions="querySearchAsync"
            :placeholder="searchDefault" @select="handleSelect">
            <template #prefix>
              <el-icon>
                <Search />
              </el-icon>
            </template>
          </el-autocomplete>
        </div>
      </div>
    </Transition>
    <!-- body 轮播图 -->
    <div ref="bannerRef" v-location="bannerLocation" class="h-[42%] w-full">
      <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <Transition name="fade" mode="out-in" enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut">
            <component :is="Component"></component>
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
            <div class="h-full aspect-square cursor-pointer" @click="goBackArror">
              <MyImage src="../../src/assets/img/download.svg" className="h-full w-full" />
            </div>
            <!-- menu arror -->
            <div class="h-full aspect-square cursor-pointer" @click="goAheadArror">
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