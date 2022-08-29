<script setup lang="ts">
import { cloudSearch, getHotSearch, getSearchDefault } from '@/servies/api';
import { API } from '@/servies/api/API';
import { MusicPlayer } from '@/store/MusicPlayer';
import { Search } from '@element-plus/icons-vue';
import { Ref, ref, toRaw } from 'vue';
import { useRouter } from 'vue-router';
import '@/pages/Home/Middle/Middle.scss'
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

//search input
const state = ref('')
const router = useRouter();
//返回上一路由
const goBackArror = async () => {
  router.go(-1)
}
//前进路由
const goAheadArror = () => {
  router.go(1)
}
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
const MusicPlayerStore=MusicPlayer()
const handleSelect = (value: Ref<HotSearchTypes | SearchTypes>) => {
  console.log('点击搜索结果', value)
  //如果value为用户输入关键词后搜索的歌曲
  if (value.hasOwnProperty('id')) {
    //将id发送到piniahu
    MusicPlayerStore.getSongDetail(toRaw(value as unknown as SearchTypes).id)
  }
}
const searchDefault = ref('')
//请求获得默认搜索关键词
const {
  data: { data: data },
} = await getSearchDefault()
searchDefault.value = data.realkeyword
</script>

<template>
  <div  class="h-full w-full flex justify-between">
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
</template>

<style scoped>
</style>