<script setup lang="ts">
import { MyMusic } from '@/store/MyMusic';
import { storeToRefs } from 'pinia';
import MyImage from '@/components/Home/public/MyImage/index.vue';

const MyMusicStore = MyMusic()
const { userCollectSinger } = storeToRefs(MyMusicStore)
await MyMusicStore.getUserCollectSinger()
</script>

<template>
  <div class="h-full w-full flex flex-col">
    <!-- user collerted singer -->
    <div class="h-[18%] w-full py-6 flex items-center cursor-pointer" v-for="(item, index) in userCollectSinger"
      :key="item.id" :class="{ 'border-b-2 border-gray-400': index < userCollectSinger.length - 1 }">
      <!-- cover -->
      <div class="h-full aspect-square rounded-t-2xl mr-8">
        <MyImage :src="item.picUrl" className="w-full h-full rounded-2xl" />
      </div>
      <!-- content -->
      <div class="flex-1 h-4/5 flex flex-col justify-between">
        <!-- name -->
        <div>{{ item.name }}</div>
        <!-- albumSize -->
        <div>
          <span class="mr-6">{{ item.albumSize }} 个专辑</span>
          <span v-show="item.mvSize > 0">{{ item.mvSize }} 个MV</span>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
</style>