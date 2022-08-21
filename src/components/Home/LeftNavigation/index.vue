<script setup lang="ts">
import '@/components/Home/LeftNavigation/LeftNavigation.scss'
import { useUserMessage } from '@/store/UserMessage'
import { ArrowRight } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia';

//获取UserMessageStore
const UserMessageStore = useUserMessage()
const { homeNavigationLoading, userMessage, userHomeNavigation } = storeToRefs(UserMessageStore)
//组件加载时获取用户navigation数据
await UserMessageStore.homeNavigation()
</script>
<template>
  <div class="h-full w-full">
    <el-skeleton :loading="homeNavigationLoading" :animated="true">
      <template #template>
        <div class="h-full w-full p-[10%] flex flex-col">
          <!-- header -->
          <div class="h-[20%] flex flex-col justify-around">
            <div class="w-[27%] rounded-2xl aspect-square">
              <el-skeleton-item variant="image" style="width: 100%; height: 100%; border-radius: 1rem" />
            </div>
            <el-skeleton-item variant="h3" style="width: 75%" />
            <el-skeleton-item variant="h3" style="width: 45%" />
          </div>
          <!-- find music -->
          <div class="h-[28%] flex flex-col justify-around">
            <el-skeleton-item v-for="(item, index) of 5" :key="index" variant="h3" style="width: 45%" />
          </div>
          <!-- my music content -->
          <div class="h-[25%] pb-4 border-b-2 border-[#3c4151] flex flex-col justify-around">
            <el-skeleton-item variant="h3" style="width: 45%" />
            <el-skeleton-item v-for="(item, index) of 3" :key="index" variant="h3" style="width: 65%" />
          </div>
          <!-- other -->
          <div class="h-[13%] pt-4 flex flex-col justify-around">
            <el-skeleton-item v-for="(item, index) of 2" :key="index" variant="h3" style="width: 50%" />
          </div>
        </div>
      </template>
      <template #default>
        <div class="h-full w-full p-[10%] flex flex-col">
          <!-- header -->
          <div class="h-[20%] flex flex-col justify-around">
            <!-- profile picture -->
            <div class="w-[27%] rounded-2xl aspect-square">
              <MyImage className="rounded-2xl" :src="userMessage?.avatarUrl || ''" />
            </div>
            <!-- welcome -->
            <div class="flex items-center">
              <span>Hello!</span>
              <span class="mx-3">{{ userMessage?.nickname || '' }}</span>
              <MyImage class="w-[9%]" src="../../src/assets/img/welcome.svg" loading="lazy" />
            </div>
            <!-- dream set -->
            <div>
              <h3>dream set</h3>
            </div>
          </div>
          <!-- find music -->
          <div class="h-[28%] flex flex-col justify-around">
            <!-- find music title -->
            <div class="flex items-center">
              <el-icon>
                <ArrowRight />
              </el-icon>
              <span>发现音乐</span>
            </div>
            <!-- find music content -->
            <navigation-link v-for="item of userHomeNavigation.findMusic" :key="item.key" :content="item.content"
              :path="item.path">
              <template #headIcon>
                <el-icon class="mx-3" v-if="item.key === 'home'">
                  <MyImage src="../../src/assets/img/home.svg" />
                </el-icon>
                <el-icon class="mx-3" v-else-if="item.key === 'album'">
                  <MyImage src="../../src/assets/img/album.svg" />
                </el-icon>
                <el-icon class="mx-3" v-else-if="item.key === 'singer'">
                  <MyImage src="../../src/assets/img/singer.svg" />
                </el-icon>
                <el-icon class="mx-3" v-else-if="item.key === 'radio'">
                  <MyImage src="../../src/assets/img/radio.svg" />
                </el-icon>
              </template>
            </navigation-link>
          </div>
          <!-- my music -->
          <div class="h-[25%] pb-4 border-b-2 border-[#3c4151] flex flex-col justify-around">
            <!-- my music title -->
            <div class="flex items-center">
              <el-icon>
                <ArrowRight />
              </el-icon>
              <span>我的音乐</span>
            </div>
            <!-- my music content -->
            <navigation-link v-for="item of userHomeNavigation.myMusic" :key="item.key" :content="item.content"
              :path="item.path">
              <template #headIcon>
                <el-icon class="mx-3" v-if="item.key === 'local'">
                  <MyImage src="../../src/assets/img/local.svg" />
                </el-icon>
                <el-icon class="mx-3" v-else-if="item.key === 'like'">
                  <MyImage src="../../src/assets/img/like.svg" />
                </el-icon>
                <el-icon class="mx-3" v-else-if="item.key === 'create'">
                  <MyImage src="../../src/assets/img/create.svg" />
                </el-icon>
              </template>
            </navigation-link>
          </div>
          <!-- other -->
          <div class="h-[13%] pt-4 flex flex-col justify-around">
            <!-- other content -->
            <navigation-link v-for="item of userHomeNavigation.other" :key="item.key" :content="item.content"
              :path="item.path">
              <template #tailIcon>
                <el-icon class="mx-3" v-if="item.key === 'recommend'">
                  <MyImage src="../../src/assets/img/recommend.svg" />
                </el-icon>
                <el-icon class="mx-3" v-else-if="item.key === 'emotion'">
                  <MyImage src="../../src/assets/img/emotion.svg" />
                </el-icon>
              </template>
            </navigation-link>
          </div>
        </div>
      </template>
    </el-skeleton>
    <!-- navigation容器 -->
  </div>
</template>

<style scoped>
</style>
