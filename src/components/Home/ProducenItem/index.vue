<script setup lang="ts">
import '@/components/Home/ProducenItem/ProducenItem.scss'
import {onMounted, ref} from 'vue'

defineProps<{picUrl: string; fansCount: number; musicSize: number; name: string; loading: boolean}>()
const format = (num: number, unit: string[]) => {
  return num > 10000 ? (num / 10000).toFixed(1) + unit[0] : num + unit[1]
}
const producenItem = ref<HTMLDivElement>(null as unknown as HTMLDivElement)
const producenItemWidth = ref(0)
onMounted(() => {
  producenItemWidth.value = producenItem.value.offsetWidth
})
</script>

<template>
  <div ref="producenItem" class="w-full h-full flex items-center producen_item">
    <el-skeleton :loading="loading" :animated="true">
      <template #template>
        <!-- image -->
        <div class="h-4/5 aspect-square overflow-hidden rounded-2xl cursor-pointer mr-6">
          <el-skeleton-item variant="image" style="height: 100%; aspect-ratio: 1; border-radius: 1rem" />
        </div>
        <!-- produce -->
        <div class="h-4/5 flex flex-col justify-between">
          <!-- name -->
          <div class="flex items-center">
            <el-skeleton-item variant="text" :style="`width:${producenItemWidth * 0.3}px`"></el-skeleton-item>
          </div>
          <!-- fans count and music size -->
          <div class="w-full">
            <el-skeleton-item variant="text" :style="`width:${producenItemWidth * 0.6}px`"></el-skeleton-item>
          </div>
        </div>
      </template>
      <template #default>
        <!-- image -->
        <div class="h-4/5 aspect-square overflow-hidden rounded-2xl cursor-pointer mr-6">
          <MyImage :src="picUrl" className="h-full aspect-square rounded-2xl hover:scale-150 transition-all duration-500" />
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
      </template>
    </el-skeleton>
  </div>
</template>

<style scoped></style>
