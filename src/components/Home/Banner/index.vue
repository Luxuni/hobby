<script setup lang="ts">
import '@/components/Home/Banner/Banner.scss'
import {ref} from 'vue'
import {HomeMessage} from '@/store/HomeMessage'
import { storeToRefs } from 'pinia';

const HomeMessageStore = HomeMessage()
const {bannerLoading,banner} = storeToRefs(HomeMessageStore)
await HomeMessageStore.getBanner()
const bannerContainer = ref<HTMLDivElement>(undefined as unknown as HTMLDivElement)
const bannerHeight = ref(0)
const changeBanner = () => {
  if (bannerContainer.value) {
    bannerHeight.value = bannerContainer.value.clientHeight
  }
}
</script>

<template>
  <div class="h-full w-full" ref="bannerContainer" v-resize="changeBanner">
    <el-skeleton :loading="bannerLoading" :animated="true">
      <template #template>
        <el-carousel :interval="5000" arrow="always" :height="`${bannerHeight}px`">
          <el-carousel-item v-for="item in 6" :key="item">
            <el-skeleton-item variant="image" class="h-full w-full" />
          </el-carousel-item>
        </el-carousel>
      </template>
      <template #default>
        <el-carousel :interval="5000" arrow="always" :height="`${bannerHeight}px`">
          <el-carousel-item v-for="item in banner" :key="item.targetId">
            <MyImage :src="item.imageUrl" className="h-full w-full rounded-3xl" />
          </el-carousel-item>
        </el-carousel>
      </template>
    </el-skeleton>
  </div>
</template>

<style scoped></style>
