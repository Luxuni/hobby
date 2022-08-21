<script setup>
import PlayList from '@/components/playmusic/PlayList.vue'
import {computed, ref, toRaw} from 'vue'
import {useStore} from 'vuex'
const store = useStore()
/*定义当前播放歌曲的位置指针*/
const pointer = ref(0)
/*拿取vuex中的将要播放的歌单数据*/
const playlist = computed(() => {
  pointer.value = 0
  return store.state.playlist.playlist
})
/*获取audio的DOM*/
const audio = ref(null)
/*定义播放进度条的绑定数据*/
const playingTime = ref(0)
/*定义音量条的绑定数据*/
const volume = ref(100)
/*定义播放总时长的字符串*/
const playAllTime = ref('0:00')
/*当前播放时间*/
const playNowTime = ref('0:00')
/*定义播放时长最小值*/
const minTime = 0
/*定义播放时长最大值*/
const maxTime = ref(0)
/*和播放按钮的改变相关*/
const playOrPauseIcon = ref('#icon-icon_play')
/*和音量按钮图标改变相关*/
const volumeIcon = ref('#icon-Soundshengyin3')
/*保存用户自定义的音量大小*/
const userVolume = ref(100)
/*控制音量条的显示*/
const isVolume = ref(false)
/*定义歌曲封面是否添加旋转的类*/
const isRotate = ref(null)
/*控制播放以及播放暂停图标改变的方法*/
const play = () => {
  audio.value.play()
  playOrPauseIcon.value = '#icon-Pause'
  isRotate.value = null
}
/*控制暂停以及播放暂停图标改变的方法*/
const pause = () => {
  audio.value.pause()
  playOrPauseIcon.value = '#icon-icon_play'
  isRotate.value = 'animation-play-state: paused'
}
/*点击播放按钮执行播放与暂停*/
const playOrPause = () => {
  if (audio.value.paused) {
    //如果是暂停状态
    play()
  } else {
    //如果是播放状态
    pause()
  }
}
/*获取播放歌曲的总时长*/
const getAllTime = () => {
  maxTime.value = audio.value.duration
  playAllTime.value = formatSeconds(audio.value.duration)
  play()
}
/*格式化时间的方法*/
function formatSeconds(value) {
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
/*获取当前播放时间*/
const getNowTime = () => {
  playNowTime.value = formatSeconds(audio.value.currentTime)
  playingTime.value = audio.value.currentTime
}
/*绑定音量条和系统音量的方法*/
const bindVolume = () => {
  volume.value = audio.value.volume * 100
}
/*拖动播放条改变当前播放时间*/
const changeCurrentTime = (value) => {
  audio.value.currentTime = value
  //既然拖动播放滑块，说明用户想要播放，则给用户播放
  if (audio.value.paused) {
    //如果是暂停状态
    play()
  }
}
/*用户拖动音量滑块改变音量大小*/
const changeVolume = (value) => {
  audio.value.volume = value / 100
  userVolume.value = value
  if (value === 0) {
    volumeIcon.value = '#icon-jingyin_mian'
    userVolume.value = 20
  } else if (value > 50) {
    volumeIcon.value = '#icon-Soundshengyin3'
  } else {
    volumeIcon.value = '#icon-Soundshengyin2'
  }
}
/*控制点击音量图标静音以及其他变化*/
const volumeSwitch = () => {
  if (audio.value.volume > 0) {
    audio.value.volume = 0
    bindVolume()
    volumeIcon.value = '#icon-jingyin_mian'
  } else {
    audio.value.volume = userVolume.value / 100
    bindVolume()
    volumeIcon.value = '#icon-Soundshengyin2'
  }
}
/*切换上一首以及下一首的两个方法*/
const previousSong = () => {
  if (pointer.value === 0) {
    pointer.value = toRaw(store.state.playlist.playlist).length - 1
  } else {
    pointer.value -= 1
  }
}
const nextSong = () => {
  if (pointer.value === toRaw(store.state.playlist.playlist).length - 1) {
    pointer.value = 0
  } else {
    pointer.value += 1
  }
}
/*播放模式选择*/
const playFunctionPointerIcon = ref('#icon-xunhuanbofang') //需要显示的播放图标
const playFunctionPointer = ref(0)
//管理播放图标
const changePlayFunctionPointerIcon = () => {
  if (playFunctionPointer.value === 0) {
    playFunctionPointerIcon.value = '#icon-xunhuanbofang'
    //循环播放
  } else if (playFunctionPointer.value === 1) {
    playFunctionPointerIcon.value = '#icon-danquxunhuan'
    //单曲循环
  } else {
    playFunctionPointerIcon.value = '#icon-suijibofang'
    //随机播放
  }
}
//管理播放模式
const changePlayFunctionPointer = () => {
  if (playFunctionPointer.value === 2) {
    playFunctionPointer.value = 0
  } else {
    playFunctionPointer.value++
  }
  changePlayFunctionPointerIcon()
}
const rd = (n, m) => {
  //获取一定范围内的随机数的方法
  let c = m - n + 1
  return Math.floor(Math.random() * c + n)
}
const randomPlay = () => {
  return rd(0, toRaw(store.state.playlist.playlist).length - 1)
}
const end = () => {
  if (playFunctionPointer.value === 0) {
    if (toRaw(playlist.value).length === 1) {
      audio.value.currentTime = 0 //重新开始播放
      play()
    } else {
      nextSong()
    }
    //循环播放
  } else if (playFunctionPointer.value === 1) {
    audio.value.currentTime = 0 //重新开始播放
    play()
    //单曲循环
  } else {
    pointer.value = randomPlay()
    //随机播放
  }
}
const passPointer = (value) => {
  play()
}
/*显示播放歌单*/
const isShowPlaylist = ref(false)
const showPlaylist = () => {
  isShowPlaylist.value ? (isShowPlaylist.value = false) : (isShowPlaylist.value = true)
}
</script>
<template>
  <div>
    <audio ref="audio" @durationchange="getAllTime" @timeupdate="getNowTime" @ended="end" :src="playlist[pointer]?.url"></audio>
    <div :class="{audio_container: !isShowPlaylist, audio_containers: isShowPlaylist}">
      <play-list class="playlist" ref="playList" v-model:passPointer="pointer" @update:passPointer="passPointer"></play-list>
      <!--      当前歌曲图片-->
      <img v-show="playlist.length > 0" ref="img" :style="isRotate" :src="playlist[pointer]?.picUrl" alt="" />
      <!--      歌名-->
      <span v-show="playlist.length > 0" class="the_song_name">{{ playlist[pointer]?.name }}</span>
      <!--      分割符号-->
      <span v-show="playlist.length > 0" class="segmentation">--</span>
      <!--      作者-->
      <span v-show="playlist.length > 0" class="the_artists">{{ playlist[pointer]?.ar }}</span>
      <!--      上一首-->
      <svg class="icon previous_song" aria-hidden="true" @click="previousSong">
        <use xlink:href="#icon-shangyishou"></use>
      </svg>
      <!--      播放或者暂停按钮-->
      <svg class="icon whether_player" aria-hidden="true" @click="playOrPause">
        <use :xlink:href="playOrPauseIcon"></use>
      </svg>
      <!--      下一首-->
      <svg class="icon next_song" aria-hidden="true" @click="nextSong">
        <use xlink:href="#icon-xiayishou"></use>
      </svg>
      <!--      当前播放进度/歌曲总时长-->
      <el-tag class="max_time" type="info" effect="plain">{{ playNowTime }} </el-tag>
      <!--      播放进度条-->
      <el-slider
        class="playback_progress"
        v-model="playingTime"
        :min="minTime"
        :max="maxTime"
        :format-tooltip="formatSeconds"
        @change="changeCurrentTime"
      ></el-slider>
      <!--      当前播放进度/歌曲总时长-->
      <el-tag class="max_time" type="info" effect="plain">{{ playAllTime }} </el-tag>
      <!--      切换播放模式-->
      <svg class="icon play_function" aria-hidden="true" @click="changePlayFunctionPointer">
        <use :xlink:href="playFunctionPointerIcon"></use>
      </svg>
      <!--      播放歌单-->
      <svg class="icon playlist_icon" aria-hidden="true" @click="showPlaylist">
        <use xlink:href="#icon-yinlegedanyinfu"></use>
      </svg>
      <div class="sound_control">
        <!--      静音按钮-->
        <svg class="icon mute" aria-hidden="true" @click="volumeSwitch">
          <use :xlink:href="volumeIcon"></use>
        </svg>
        <el-slider class="volume_bar" v-model="volume" @input="changeVolume"> </el-slider>
      </div>
    </div>
  </div>
</template>
