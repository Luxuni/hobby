<script setup lang="ts">
import '@/components/Home/Player/Player.scss'
import { MusicPlayer } from '@/store/MusicPlayer'
import { ref, toRaw, watch } from 'vue'
import { CaretRight } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
import { AnimationMessage } from '@/store/AnimationMessage'
import _ from 'lodash'
import { useRouter } from 'vue-router'

type ar = {
  id: number
  name: string
  tns: []
  alias: []
}[]
type al = {
  id: number
  name: string
  picUrl: string
  tns: []
  pic_str: string
  pic: number
}
//格式化时间方法
const formatSeconds = (value: number) => {
  let theTime = Math.round(value) // 秒
  let theTime1 = 0 // 分
  if (theTime > 60) {
    theTime1 = Math.floor(theTime / 60)
    theTime = theTime % 60
    if (theTime < 10) {
      return `${theTime1}:0${theTime}`
    }
    return `${theTime1}:${theTime}`
  } else if (theTime < 10) {
    return `0:0${theTime}`
  } else {
    return `0:${theTime}`
  }
}

const router = useRouter()
const MusicPlayerStore = MusicPlayer()
const { playlist, playListMessageLoading } = storeToRefs(MusicPlayerStore)
//当前播放歌曲指针
const playerFlag = ref(0)
//播放器进度条绑定值
const songProgress = ref(0)
//播放器是否播放状态
const isPlay = ref(false)
//播放器实例
const audio = ref<HTMLAudioElement>(null as unknown as HTMLAudioElement)
//定义播放总时长的字符串
const playAllTime = ref('-:--')
/*当前播放时间*/
const playNowTime = ref('-:--')
//定义播放时长最小值
const minTime = 0
//定义播放时长最大值
const maxTime = ref(0)
//播放器播放方法
const play = () => {
  if (playlist.value.length === 0) {
    ElMessage.warning('播放列表为空')
    return
  }
  audio.value.play()
  isPlay.value = true
}
//播放器暂停方法
const pause = () => {
  audio.value.pause()
  isPlay.value = false
}
//切换下一首歌曲方法
const nextSong = () => {
  playerFlag.value++
  if (playerFlag.value > playlist.value.length - 1) {
    playerFlag.value = 0
  }
}
//切换下一首歌曲方法
const previousSong = () => {
  playerFlag.value--
  if (playerFlag.value < 0) {
    playerFlag.value = playlist.value.length - 1
  }
}
//拖动进度条方法
const changeCurrentTime = (value: number) => {
  audio.value.currentTime = value
  //既然拖动播放滑块，说明用户想要播放，则给用户播放
  if (audio.value.paused) {
    //如果是暂停状态
    play()
  }
  stopGetNowTimeRef.value = false
}
const stopGetNowTimeRef = ref(false)
const stopGetNowTime = () => {
  stopGetNowTimeRef.value = true
}
//获取总播放时长
const getAllTime = () => {
  maxTime.value = audio.value.duration
  playAllTime.value = formatSeconds(audio.value.duration)
}
//当已经加载到足够开始播放时
const canPlay = () => {
  play()
}
//获取当前播放时间
const getNowTime = () => {
  if (audio.value.currentTime !== Math.trunc(audio.value.currentTime) && !stopGetNowTimeRef.value) {
    playNowTime.value = formatSeconds(audio.value.currentTime)
    songProgress.value = Math.trunc(audio.value.currentTime)
  }
}
//监视播放列表变化，获取当前歌曲的url
watch(playlist.value, async (newPlaylist) => {
  if (toRaw(newPlaylist).length >= 1 && !newPlaylist[playerFlag.value].url) {
    await MusicPlayerStore.getSongUrl(toRaw(newPlaylist)[playerFlag.value].id)
  }
})
//监视playerFlag的变化及时做出响应
watch(playerFlag, async (newPlayerFlag) => {
  if (playlist.value.length >= 1 && !playlist.value[newPlayerFlag].url) {
    await MusicPlayerStore.getSongDetail(playlist.value[newPlayerFlag].id, false)
  }
})
const songCover = ref<HTMLDivElement>(null as unknown as HTMLDivElement)
//拿到播放歌曲封面在页面上的位置
const AnimationMessageStore = AnimationMessage()
const { playerImageLocation } = storeToRefs(AnimationMessageStore)
const locationChange = () => {
  _.debounce(() => {
    if (songCover.value.getBoundingClientRect()) {
      const { x: coverX, y: coverY } = songCover.value.getBoundingClientRect()
      playerImageLocation.value = { x: coverX, y: coverY }
    } else {
      return
    }
  }, 1000, { 'leading': true, 'trailing': false, })()
}
//点击播放器封面跳转到当前正在播放的用户歌单列表
const goCurrentlyPlayingMusicList = () => {
  router.push({ name: 'CurrentlyPlayingList' })
}
</script>

<template>
  <div class="w-full h-full p-[6%] flex flex-col justify-between items-center">
    <audio ref="audio" @durationchange="getAllTime" @timeupdate="getNowTime" @canplay="canPlay"
      :src="playlist[playerFlag]?.url" />
    <!-- image -->
    <div ref="songCover" v-location="locationChange" class="w-[95%] aspect-square rounded-3xl cursor-pointer"
      @click="goCurrentlyPlayingMusicList">
      <MyImage v-if="playlist.length > 0" :src="playlist[playerFlag].al ? (playlist[playerFlag].al as al).picUrl : ''"
        className="h-full w-full rounded-3xl" />
      <div v-else class="w-full h-full">
        <h1 class="w-full h-full border border-gray-400 border-solid rounded-3xl flex items-center justify-center">
          去寻找好听的声音吧！</h1>
      </div>
    </div>
    <!-- name and  author-->
    <div class="w-[95%] h-[10%] flex flex-col justify-between">
      <!-- name -->
      <div class="w-full flex justify-center">
        <div v-if="playlist.length > 0 && playListMessageLoading === false" class="text-xl">{{ playlist[playerFlag].name
            ?? ''
        }}</div>
        <div v-else class="text-xl">还没有歌曲哦QAQ</div>
      </div>
      <!-- author -->
      <div class="w-full flex justify-center">
        <div v-if="playlist.length > 0 && playListMessageLoading === false" class="text-gray-400">
          {{ playlist[playerFlag].ar ? (playlist[playerFlag].ar as ar).map((item) => item.name).join('/') : '' }}
        </div>
        <div v-else class="text-gray-400">未知作者TAT</div>
      </div>
    </div>
    <!-- playback component -->
    <div class="w-[95%] h-[24%]">
      <!-- song progress -->
      <div class="h-[30%] w-full">
        <div class="w-full">
          <el-slider v-model="songProgress" :min="minTime" :max="maxTime" @change="changeCurrentTime"
            @input="stopGetNowTime" />
        </div>
        <div class="w-full flex justify-between">
          <!-- now song progress -->
          <span class="text-gray-400">{{ playNowTime }}</span>
          <!-- total song progress -->
          <span class="text-gray-400">{{ playAllTime }}</span>
        </div>
      </div>
      <!-- various buttons -->
      <div class="h-[70%] w-full flex justify-between items-center">
        <!-- random model -->
        <div class="h-[21%] aspect-square cursor-pointer">
          <MyImage src="../../src/assets/img/random_model.svg" className="h-full w-full" />
        </div>
        <!-- previous -->
        <div class="h-[21%] aspect-square cursor-pointer" @click="previousSong">
          <MyImage src="../../src/assets/img/previous.svg" className="h-full w-full" />
        </div>
        <!-- play or pause -->
        <div class="h-[30%] aspect-square icon cursor-pointer">
          <MyImage v-if="isPlay" src="../../src/assets/img/pause.svg" className="h-full w-full" @click="pause" />
          <el-icon v-else @click="play">
            <CaretRight />
          </el-icon>
        </div>
        <!-- next -->
        <div class="h-[21%] aspect-square cursor-pointer" @click="nextSong">
          <MyImage src="../../src/assets/img/next.svg" className="h-full w-full" />
        </div>
        <!-- cycle model -->
        <div class="h-[21%] aspect-square cursor-pointer">
          <MyImage src="../../src/assets/img/cycle_model.svg" className="h-full w-full" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
