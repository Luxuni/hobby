<script setup lang="ts">
import '@/components/Home/public/ShowItem/ShowItem.scss'
import { ref } from 'vue'
import { MusicPlayer } from '@/store/MusicPlayer'
import gsap from 'gsap'
import { AnimationMessage } from '@/store/AnimationMessage'
import { storeToRefs } from 'pinia'
import _ from 'lodash'
import { ElMessage } from 'element-plus'

const MusicPlayerStore = MusicPlayer()
const props = defineProps<{ src: string; name: string; id: number; loading: boolean }>()
const image = ref<HTMLDivElement>(null as unknown as HTMLDivElement)
const introduce = ref<HTMLDivElement>(null as unknown as HTMLDivElement)
const AnimationMessageStore = AnimationMessage()
const { playerImageLocation } = storeToRefs(AnimationMessageStore)
const clickShowItemEvent = () => {
  console.log(props.id)
  const { x: showItemImageX, y: showItemImageY } = image.value.
    getBoundingClientRect()
  if ((playerImageLocation.value.x - showItemImageX) < 0) {
    ElMessage.warning('好听的音乐马上准备好！')
    return
  }
  _.debounce(() => {
    MusicPlayerStore.getPlaylistDetail(props.id)
    gsap.to(image.value, {
      keyframes: [
        { x: playerImageLocation.value.x - showItemImageX, y: playerImageLocation.value.y - showItemImageY, opacity: 0, scale: 0.2 },
        { x: 0, y: 0 },
        { opacity: 1, scale: 1 }
      ],
      duration: 1.5, ease: 'strong.inOut', lazy: true
    })
  }, 1500, { 'leading': true, 'trailing': false, })()
}
const changeIntroduce = () => {
  if (introduce.value) {
    introduce.value.style.width = `${image.value.offsetWidth}px`
  }
}
</script>

<template>
  <div class="h-full aspect-square flex flex-col items-center justify-around cursor-pointer show_item"
    @click="clickShowItemEvent">
    <el-skeleton :loading="loading" :animated="true">
      <template #template>
        <div ref="image" class="h-[80%] aspect-square overflow-hidden rounded-3xl">
          <el-skeleton-item variant="image" style="height: 100%; width: 100%; border-radius: 1.5rem" />
        </div>
        <!-- introduce -->
        <el-skeleton-item variant="text" style="width: 80%"></el-skeleton-item>
      </template>
      <template #default>
        <div v-resize="changeIntroduce" ref="image" class="h-[80%] aspect-square overflow-hidden rounded-3xl">
          <MyImage :src="src" className="h-full w-full rounded-3xl hover:scale-150 transition-all duration-500" />
        </div>
        <!-- introduce -->
        <div ref="introduce" class="text-sm truncate">{{ name }}</div>
        <!-- <div>{{name}}</div> -->
      </template>
    </el-skeleton>
  </div>
</template>

<style scoped>
</style>
