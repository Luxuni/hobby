<script setup lang="ts">
import { ref, toRaw, watch } from 'vue';
import gsap from 'gsap';
import { CaretRight, Star, Delete } from '@element-plus/icons-vue'
import { AnimationMessage } from '@/store/AnimationMessage';
import { MusicPlayer } from '@/store/MusicPlayer';
import { default as vElTableInfiniteScroll } from "el-table-infinite-scroll";
import { PlaylistRelatedInformation } from '@/store/PlaylistRelatedInformation';
import { storeToRefs } from 'pinia';
import { ElMessage } from 'element-plus';
type needShowType = {
  creator: {
    userId: number;
    nickname: string;
  }
  coverImgUrl: string;
  name: string;
  id: string;
}[]

//轮播图开场动画相关
const AnimationMessageStore = AnimationMessage();
const { mainPageBannerLocation } = storeToRefs(AnimationMessageStore);
const currentlyPlayingMusicListBannerRef = ref(null as unknown as HTMLDivElement)
const enterCurrentlyPlayingMusicListBanner = (el: any, done: gsap.Callback) => {
  const { x: CBBX, y: CBBY } = currentlyPlayingMusicListBannerRef.value.getBoundingClientRect()
  gsap.from(el, { duration: 1, x: CBBX - mainPageBannerLocation.value.x, y: mainPageBannerLocation.value.y - CBBY, ease: 'strong.inOut', opacity: 0, lazy: true, onComplete: done })
}
//根据当前歌单id推荐歌单相关
const PlaylistRelatedInformationStore = PlaylistRelatedInformation();
const { accordingCurrentPlaylistIdGetRecommendPlaylistMessages: recommendPlaylist, accordingCurrentPlaylistIdGetRecommendPlaylistMessagesLoading: recommendPlaylistLoading } = storeToRefs(PlaylistRelatedInformationStore);
//根据当前歌单id通过pinia发送请求获取推荐歌单相关信息
await PlaylistRelatedInformationStore.FuncCcordingCurrentPlaylistIdGetRecommendPlaylist()
//根据当前歌单id推荐相关歌单展示翻页相关
const startIndex = ref(0)
const endIndex = ref(3)
const needShow = ref<needShowType>([])
needShow.value = recommendPlaylist.value.slice(startIndex.value, endIndex.value)
//上一页推荐歌单
const RecommendedOnThePreviousPage = () => {
  startIndex.value -= 2
  if (startIndex.value < 0) {
    do { startIndex.value += recommendPlaylist.value.length; } while (startIndex.value < 0);
  }
  endIndex.value += 3
  if (endIndex.value > recommendPlaylist.value.length) {
    do { endIndex.value -= recommendPlaylist.value.length; } while (endIndex.value > recommendPlaylist.value.length);
  }
  if (startIndex.value > endIndex.value) {
    needShow.value = recommendPlaylist.value.slice(startIndex.value, recommendPlaylist.value.length)
    needShow.value.push(...recommendPlaylist.value.slice(0, endIndex.value))
  } else {
    needShow.value = recommendPlaylist.value.slice(startIndex.value, endIndex.value)
  }
}
//下一页推荐歌单
const RecommendOnTheNextPage = () => {
  startIndex.value += 3
  if (startIndex.value > recommendPlaylist.value.length) {
    do { startIndex.value -= recommendPlaylist.value.length; } while (startIndex.value > recommendPlaylist.value.length);
  }
  endIndex.value += 3
  if (endIndex.value > recommendPlaylist.value.length) {
    do { endIndex.value -= recommendPlaylist.value.length; } while (endIndex.value > recommendPlaylist.value.length);
  }
  if (startIndex.value > endIndex.value) {
    needShow.value = recommendPlaylist.value.slice(startIndex.value, recommendPlaylist.value.length)
    needShow.value.push(...recommendPlaylist.value.slice(0, endIndex.value))
  } else {
    needShow.value = recommendPlaylist.value.slice(startIndex.value, endIndex.value)
  }
}
//当前播放歌单列表展示包括用户选择单曲也会展示
//格式化时间函数
const formatSeconds = (value: number) => {
  let theTime = Math.round(value / 1000);// 秒
  let theTime1 = 0;// 分
  if (theTime > 60) {
    theTime1 = Math.floor(theTime / 60);
    theTime = theTime % 60;
    if (theTime < 10) {
      return `${theTime1}:0${theTime}`;
    }
    return `${theTime1}:${theTime}`;
  } else if (theTime < 10) {
    return `0:0${theTime}`;
  } else {
    return `0:${theTime}`;
  }
}
//从pinia中取出playlist数据
const MusicPlayerStore = MusicPlayer();
const { _offsetPlaylist, playlist, playlistShowNumber } = storeToRefs(MusicPlayerStore);
//歌单展示数量
//格式化dt歌曲时长
const formatterDt = (row: any, column: any, cellValue: number, index: number) => {
  return formatSeconds(cellValue)
}
//格式化歌手名
const formatterAr = (row: any, column: any, cellValue: { name: string }[], index: number) => {
  return cellValue.map(item => item.name).join('/')
}
//歌单无限滚动相关
//TODO
const load = async () => {
  if (playlistShowNumber.value + 1 > playlist.value.length) {
    ElMessage.warning('已经到底啦！')
  } else {
    if (!toRaw(_offsetPlaylist.value(playlistShowNumber.value, playlistShowNumber.value + 1))[0].hasOwnProperty('name')) {
      await MusicPlayerStore.getSongDetail(toRaw(_offsetPlaylist.value(playlistShowNumber.value, playlistShowNumber.value + 1))[0].id, false)
      playlistShowNumber.value++
    } else {
      playlistShowNumber.value++

    }
  }
}
//获取list盒子高度赋给table的height
const listContainer = ref<null | HTMLDivElement>(null)
const tableContainer = ref<null | HTMLDivElement>(null)
const tableHeight = ref(400)
const getListContainerHeight = () => {
  if (listContainer.value) {
    tableHeight.value = listContainer.value.offsetHeight * 0.4 > tableHeight.value ? tableHeight.value : listContainer.value.offsetHeight * 0.4
  }
}
//重置当前正在播放歌单列表滚动条位置相关
const table = ref<any>(null)
watch(playlistShowNumber, (newPlaylistShowNumber) => {
  if (newPlaylistShowNumber === 10) {
    table.value.setScrollTop(0)
  }
})
</script>

<template>
  <div ref="listContainer" class="h-full w-full flex flex-col justify-between">
    <!-- banner -->
    <Transition name="currentlyPlayingMusicListBanner" @enter="enterCurrentlyPlayingMusicListBanner" :css="false"
      appear>
      <div ref="currentlyPlayingMusicListBannerRef" class="h-[30%] w-full">
        <Banner />
      </div>
    </Transition>
    <!-- list -->
    <div ref="tableContainer" v-resize="getListContainerHeight" class="w-full max-h-[40%]">
      <el-table ref="table" :data="_offsetPlaylist(0, playlistShowNumber)" :height="`${tableHeight}px`"
        style="width: 100%" v-el-table-infinite-scroll="load" :fit="true">
        <el-table-column type="index" width="50" />
        <el-table-column prop="name" label="歌曲名" />
        <el-table-column prop="dt" :formatter="formatterDt" label="时长" />
        <el-table-column prop="ar" :formatter="formatterAr" label="歌手" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" circle color="#F2883A">
              <el-icon>
                <Star />
              </el-icon>
            </el-button>
            <el-button size="small" circle color="#AA1DE6">
              <el-icon>
                <CaretRight />
              </el-icon>
            </el-button>
            <el-button size="small" circle color="#FC141F">
              <el-icon>
                <Delete />
              </el-icon>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- recommend -->
    <div class="w-full h-[23%] flex justify-between">
      <!-- left arrow -->
      <div class="h-full w-[8%] flex flex-col justify-center">
        <div class="w-full aspect-square cursor-pointer" @click="RecommendedOnThePreviousPage">
          <MyImage src="../../src/assets/img/back_arror.svg" className="h-full w-full" />
        </div>
      </div>
      <!-- show item container -->
      <div class="h-full w-[80%] grid grid-cols-3 grid-rows-1 gap-4 items-center justify-items-center">
        <ShowItem v-for="item in needShow" :key="item.id" :src="item.coverImgUrl" :name="item.name"
          :id="Number(item.id)" :loading="recommendPlaylistLoading" />
      </div>
      <!-- right arrow -->
      <div class="h-full w-[8%] flex flex-col justify-center">
        <div class="w-full aspect-square cursor-pointer" @click="RecommendOnTheNextPage">
          <MyImage src="../../src/assets/img/go_ahead_arror.svg" className="h-full w-full" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>