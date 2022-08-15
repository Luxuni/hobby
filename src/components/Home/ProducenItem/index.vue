<script setup lang="ts">
import MyImage from '../public/MyImage/index.vue'
defineProps<{picUrl: string; fansCount: number; musicSize: number; name: string}>()
const format = (num: number, unit: string[]) => {
  return num > 10000 ? (num / 10000).toFixed(1) + unit[0] : num + unit[1]
}
</script>

<template>
  <div class="w-full h-full flex items-center">
    <!-- image -->
    <div class="h-4/5 aspect-square overflow-hidden rounded-2xl cursor-pointer mr-6">
      <MyImage :src="picUrl" className="h-full w-full aspect-square rounded-2xl hover:scale-150 transition-all duration-500" />
    </div>
    <!-- produce -->
    <div class="h-4/5 flex flex-col justify-between">
      <!-- name -->
      <div class="flex items-center">
        <span class="mr-4">{{ name }}</span>
        <MyImage src="../../src/assets/img/certification.svg" />
      </div>
      <!-- fans count and music size -->
      <div>
        <span class="text-xs text-gray-400 mr-4">粉丝数：{{ format(fansCount, ['万人', '人']) }}</span>
        <span class="text-xs text-gray-400">歌曲数：{{ format(musicSize, ['万首', '首']) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
