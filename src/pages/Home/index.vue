<script setup lang="ts">
import '@/pages/Home/Home.scss'
import {cloudSearch, getHotSearch, getSearchDefault} from '@/servies/api'
import {onMounted, Ref, ref, toRaw} from 'vue'
import {useRouter} from 'vue-router'
import {Search, ArrowDownBold, Sunny, Moon} from '@element-plus/icons-vue'
import {useDark, useToggle} from '@vueuse/core'
import {HomeMessage} from '@/store/HomeMessage'
import {API} from '@/servies/api/API'
import {MusicPlayer} from '@/store/MusicPlayer'

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
const HomeMessageStore = HomeMessage()
const MusicPlayerStore = MusicPlayer()
//切换主题相关功能
const switchThemes = ref(true) //切换主题开关
const isDark = useDark()
const toggleDark = useToggle(isDark)
const router = useRouter()
//返回上一路由
const goBackArror = () => {
  router.go(-1)
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
  const {data: data} = queryString !== '' && queryString ? await cloudSearch({keywords: queryString, type: 1, limit: 10, offset: 0}) : await getHotSearch()
  if (queryString === '' && !queryString) {
    //如果没有输入内容，则返回热门搜索内容
    result = (data as API.getHotSearchTypes).data.map(({searchWord, score, iconUrl, alg}) => ({value: searchWord, score, iconUrl, alg}))
  } else {
    //如果有输入内容，则返回搜索结果
    result = (data as API.cloudSearchTypes).result.songs.map(({name, id, ar, al}) => ({value: name, name: name, id, ar, al}))
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
const handleDropdown = (value: {id: string; name: string}) => {
  console.log('点击下拉菜单', value)
  classification.value = value.name
}
//默认搜索关键词
const searchDefault = ref('')
onMounted(async () => {
  //请求获得默认搜索关键词
  await getSearchDefault().then(({data: {data: data}}) => {
    searchDefault.value = data.realkeyword
  })
  //在pinia中获取热门推荐内容
  HomeMessageStore.getPersonalized(8)
  //在pinia中获取热门歌手内容
  HomeMessageStore.getTopArtists(3)
})
</script>

<template>
  <!-- 最外层容器 -->
  <div class="w-screen h-screen flex items-center justify-center bg-black">
    <!-- 内层容器 -->
    <div class="h-[95%] w-[95%] flex">
      <!-- 左侧tab -->
      <div class="h-full w-1/5 rounded-[3rem] bg-[#252D3A]">
        <LeftNavigation />
      </div>
      <!-- middle content -->
      <div class="h-full w-3/5 px-[2%] flex flex-col justify-between">
        <!-- header -->
        <div class="h-[5%] flex justify-between">
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
            <el-autocomplete class="h-full w-full" v-model="state" :fetch-suggestions="querySearchAsync" :placeholder="searchDefault" @select="handleSelect">
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-autocomplete>
          </div>
        </div>
        <!-- body 轮播图 -->
        <div class="h-[42%] w-full">
          <Banner />
        </div>
        <!-- foot 歌单 -->
        <div class="h-[46%] w-full flex flex-col justify-between">
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
                <div ref="dropdown" class="h-full w-full rounded-full bg-[#313745] flex items-center justify-center text-white">
                  <span class="mr-5">{{ classification }}</span>
                  <el-icon><ArrowDownBold /></el-icon>
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item :command="{id: 'popular', name: '热门推荐'}">热门推荐</el-dropdown-item>
                    <el-dropdown-item :command="{id: 'chinese', name: '华语'}">华语</el-dropdown-item>
                    <el-dropdown-item :command="{id: 'popularity', name: '流行'}">流行</el-dropdown-item>
                    <el-dropdown-item :command="{id: 'rock', name: '摇滚'}">摇滚</el-dropdown-item>
                    <el-dropdown-item :command="{id: 'electronic', name: '电子'}">电子</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <!-- theme -->
              <el-switch
                v-model="switchThemes"
                @change="toggleDark()"
                inline-prompt
                :active-icon="Sunny"
                :inactive-icon="Moon"
                size="large"
                style="--el-switch-on-color: #100720; --el-switch-off-color: #100720"
              />
            </div>
          </div>
          <div class="w-full h-[84%] grid grid-cols-4 grid-rows-2 gap-4 items-center justify-items-center">
            <ShowItem v-for="item in HomeMessageStore._personalized" :key="item.id" :src="item.picUrl" :name="item.name" :id="item.id" />
          </div>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="h-full w-1/5 flex flex-col justify-between">
        <!-- top -->
        <div class="h-[5%] w-full flex items-center justify-between">
          <!-- ring -->
          <div class="h-full aspect-square cursor-pointer" @click="goBackArror">
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
            <div v-for="item in HomeMessageStore._topArtists" class="h-[25%] w-full">
              <ProducenItem :key="item.id" :picUrl="item.picUrl" :fansCount="item.fansCount" :musicSize="item.musicSize" :name="item.name" />
            </div>
          </div>
        </div>
        <!-- player -->
        <div class="w-full h-[58%] bg-[#262D3A] rounded-3xl">
          <Player />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
