<script setup lang="ts">
import '@/components/Home/Banner/Banner.scss'
import {onMounted, ref} from 'vue'
import {HomeMessage} from '@/store/HomeMessage'
import _ from 'lodash'
import {log} from 'console'

const HomeMessageStore = HomeMessage()
const bannerContainer = ref<HTMLDivElement>(undefined as unknown as HTMLDivElement)
const bannerHeight = ref(0)
onMounted(() => {
  HomeMessageStore.getBanner()
  bannerHeight.value = bannerContainer.value.offsetHeight
})
// 监视可视窗口的改变，改变banner的高度
window.onresize = () => {
  return _.throttle(
    _.debounce(
      () => {
        bannerHeight.value = bannerContainer.value.offsetHeight
      },
      1000,
      {leading: false, trailing: true}
    ),
    1000,
    {trailing: false}
  )()
}
</script>

<template>
  <div class="h-full w-full" ref="bannerContainer">
    <el-skeleton :loading="HomeMessageStore._bannerLoading" :animated="true">
      <template #template>
        <el-carousel :interval="5000" arrow="always" :height="`${bannerHeight}px`">
          <el-carousel-item v-for="item in 6" :key="item">
            <el-skeleton-item variant="image" class="h-full w-full" />
          </el-carousel-item>
        </el-carousel>
      </template>
      <template #default>
        <el-carousel :interval="5000" arrow="always" :height="`${bannerHeight}px`">
          <el-carousel-item v-for="item in HomeMessageStore._banner" :key="item.targetId">
            <MyImage :src="item.imageUrl" className="h-full w-full rounded-3xl" />
          </el-carousel-item>
        </el-carousel>
      </template>
    </el-skeleton>
  </div>
</template>

<style scoped></style>
