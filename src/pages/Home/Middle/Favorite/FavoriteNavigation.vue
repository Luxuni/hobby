<script setup lang="ts">
import { MyMusic } from '@/store/MyMusic'
import { useUserMessage } from '@/store/UserMessage';
import { storeToRefs } from 'pinia';
import gsap from 'gsap';
import { ref } from 'vue';

const MyMusicStore = MyMusic()
const useUserMessageStore = useUserMessage()
const { userPlaylist } = storeToRefs(MyMusicStore)
const { userDetail } = storeToRefs(useUserMessageStore)
await MyMusicStore.getUserPlaylist()
const favoriteNavigationCotainerHeight = ref(0)
const FavoriteNavigationCotainer = ref<HTMLDivElement | null>(null)
const getFavoriteNavigationCotainerHeight = () => {
  if (FavoriteNavigationCotainer.value) {
    favoriteNavigationCotainerHeight.value = FavoriteNavigationCotainer.value.offsetHeight
    isShowCreate.value = true
    isShowFavorite.value = true
  }
}
const isShowCreate = ref(false)
const isShowFavorite = ref(false)
const changeIsShowCreate = () => {
  isShowCreate.value = !isShowCreate.value
}
const changeIsShowFavorite = () => {
  isShowFavorite.value = !isShowFavorite.value
}
const onEnter = (el: any, done: gsap.Callback) => {
  gsap.to(el, {
    opacity: 1,
    height: `${favoriteNavigationCotainerHeight.value * 0.08}px`,
    delay: el.dataset.index * 0.15,
    onComplete: done
  })
}
const onBeforeEnter = (el: any) => {
  el.style.opacity = 0
  el.style.height = 0
}
const onLeave = (el: any, done: gsap.Callback) => {
  gsap.to(el, {
    opacity: 0,
    height: 0,
    delay: el.dataset.index * 0.15,
    onComplete: done
  })
}
</script>

<template>
  <div ref="FavoriteNavigationCotainer" v-resize="getFavoriteNavigationCotainerHeight"
    class="self-center h-[90%] w-full flex flex-col p-[10%] overflow-y-auto">
    <!-- my singer -->
    <router-link class="mb-4" :to="{ name: 'FavoriteArtist' }">我的歌手（{{ userDetail.artistCount }}）</router-link>
    <!-- playlist by user create -->
    <div class="cursor-pointer mb-4" @click="changeIsShowCreate">创建的歌单（{{ userDetail.createdPlaylistCount }}）</div>
    <TransitionGroup tag="ul" :css="false" @enter="onEnter" @before-enter="onBeforeEnter" @leave="onLeave" appear>
      <li class="text-xs flex mb-4 items-center cursor-pointer" v-show="isShowCreate"
        v-for="(item, index) in userPlaylist.slice(0, userDetail.createdPlaylistCount)" :key="item.userId"
        :data-index="index">
        <router-link :to="{ name: 'FavoritePlaylist', params: { id: item.id } }"
          class="h-full w-full flex items-center cursor-pointer">
          <!-- cover -->
          <div class="h-4/5 aspect-square rounded-2xl mr-4">
            <MyImage :src="item.coverImgUrl" className="h-full w-full rounded-2xl" />
          </div>
          <!-- content -->
          <div class="h-4/5 flex-1 flex flex-col justify-between">
            <div>{{ item.name }}</div>
            <div>共{{ item.trackCount }}首</div>
          </div>
        </router-link>
      </li>
    </TransitionGroup>
    <!-- Favorite playlist -->
    <div class="cursor-pointer mb-4" @click="changeIsShowFavorite">收藏的歌单（{{ userDetail.subPlaylistCount }}）</div>
    <TransitionGroup tag="ul" :css="false" @enter="onEnter" @before-enter="onBeforeEnter" @leave="onLeave" appear>
      <li class="text-xs flex mb-4 items-center cursor-pointer" v-show="isShowFavorite"
        v-for="(item, index) in userPlaylist.slice(userDetail.createdPlaylistCount, userDetail.createdPlaylistCount + userDetail.subPlaylistCount)"
        :key="item.userId" :data-index="index">
        <router-link :to="{ name: 'FavoritePlaylist', params: { id: item.id } }"
          class="h-full w-full flex items-center cursor-pointer">
          <!-- cover -->
          <div class="h-4/5 aspect-square rounded-2xl mr-4">
            <MyImage :src="item.coverImgUrl" className="h-full w-full rounded-2xl" />
          </div>
          <!-- content -->
          <div class="h-4/5 flex-1 flex flex-col justify-between">
            <div>{{ item.name }}</div>
            <div>共{{ item.trackCount }}首</div>
          </div>
        </router-link>

      </li>
    </TransitionGroup>
  </div>
</template>

<style scoped>
</style>