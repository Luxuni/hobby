<script setup lang="ts">
import { MyMusic } from '@/store/MyMusic';
import { storeToRefs } from 'pinia';

const MyMusicStore = MyMusic();
const { dailyRecommendationList, dailyRecommendationListLoading } = storeToRefs(MyMusicStore);
await MyMusicStore.getDailyRecommendationList();
</script>

<template>
  <div class="h-full w-full grid grid-cols-4 grid-rows-2 gap-4 items-center justify-items-center">
    <ShowItem v-for="item in dailyRecommendationList" :key="item.id" :src="item.picUrl" :name="item.name" :id="item.id"
      :loading="dailyRecommendationListLoading" />
  </div>
</template>

<style scoped>
</style>