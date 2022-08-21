<script setup lang="ts">
import { ref } from 'vue';
import gsap from 'gsap';
import { AnimationMessage } from '@/store/AnimationMessage';
import { PlaylistRelatedInformation } from '@/store/PlaylistRelatedInformation';
import { storeToRefs } from 'pinia';
type needShowType = {
  creator: {
    userId: number;
    nickname: string;
  }
  coverImgUrl: string;
  name: string;
  id: string;
}[]

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
await PlaylistRelatedInformationStore.FuncCcordingCurrentPlaylistIdGetRecommendPlaylist()
const startIndex = ref(0)
const endIndex = ref(3)
const needShow = ref<needShowType>([])
needShow.value = recommendPlaylist.value.slice(startIndex.value, endIndex.value)
const RecommendedOnThePreviousPage = () => {
  startIndex.value -= 2
  if (startIndex.value < 0) {
    do { startIndex.value += recommendPlaylist.value.length; } while (startIndex.value < 0);
  }
  endIndex.value += 3
  if (endIndex.value > recommendPlaylist.value.length) {
    do { endIndex.value -= recommendPlaylist.value.length; } while (endIndex.value > recommendPlaylist.value.length);
  }
  console.log(startIndex.value, endIndex.value)
  if (startIndex.value > endIndex.value) {
    needShow.value = recommendPlaylist.value.slice(startIndex.value, recommendPlaylist.value.length)
    needShow.value.push(...recommendPlaylist.value.slice(0, endIndex.value))
  } else {
    needShow.value = recommendPlaylist.value.slice(startIndex.value, endIndex.value)
  }
}
const RecommendOnTheNextPage = () => {
  startIndex.value += 3
  if (startIndex.value > recommendPlaylist.value.length) {
    do { startIndex.value -= recommendPlaylist.value.length; } while (startIndex.value > recommendPlaylist.value.length);
  }
  endIndex.value += 3
  if (endIndex.value > recommendPlaylist.value.length) {
    do { endIndex.value -= recommendPlaylist.value.length; } while (endIndex.value < 0);
  }
  console.log(startIndex.value, endIndex.value)
  if (startIndex.value > endIndex.value) {
    needShow.value = recommendPlaylist.value.slice(startIndex.value, recommendPlaylist.value.length)
    needShow.value.push(...recommendPlaylist.value.slice(0, endIndex.value))
  } else {
    needShow.value = recommendPlaylist.value.slice(startIndex.value, endIndex.value)
  }
}
</script>

<template>
  <div class="h-full w-full flex flex-col justify-between">
    <!-- banner -->
    <Transition name="currentlyPlayingMusicListBanner" @enter="enterCurrentlyPlayingMusicListBanner" :css="false"
      appear>
      <div ref="currentlyPlayingMusicListBannerRef" class="h-[30%] w-full">
        <Banner />
      </div>
    </Transition>
    <!-- list -->
    <div class="w-full h-[40%]">

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