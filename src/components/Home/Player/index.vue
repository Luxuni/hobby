<script setup lang="ts">
import '@/components/Home/Player/Player.scss'
import {MusicPlayer} from '@/store/MusicPlayer'
import {ref} from 'vue'
import MyImage from '../public/MyImage/index.vue'
import {CaretRight} from '@element-plus/icons-vue'

const MusicPlayerStore = MusicPlayer()
const playerFlag = ref(0)
const songProgress = ref(0)
const isPlay = ref(false)
</script>

<template>
  <div class="w-full h-full p-[6%] flex flex-col justify-between items-center">
    <!-- image -->
    <div class="w-[95%] aspect-square rounded-3xl">
      <MyImage v-if="MusicPlayerStore._playlist.length > 0" :src="MusicPlayerStore._playlist[playerFlag].al.picUrl" className="h-full w-full rounded-3xl" />
      <div v-else class="w-full h-full">
        <h1 class="w-full h-full border border-gray-400 border-solid rounded-3xl flex items-center justify-center">去寻找好听的声音吧！</h1>
      </div>
    </div>
    <!-- name and  author-->
    <div class="w-[95%] h-[10%] flex flex-col justify-between">
      <!-- name -->
      <div class="w-full flex justify-center">
        <div v-if="MusicPlayerStore._playlist.length > 0" class="text-xl">{{ MusicPlayerStore._playlist[playerFlag].name }}</div>
        <div v-else class="text-xl">还没有歌曲哦QAQ</div>
      </div>
      <!-- author -->
      <div class="w-full flex justify-center">
        <div v-if="MusicPlayerStore._playlist.length > 0" class="text-gray-400">
          {{ MusicPlayerStore._playlist[playerFlag].ar.map((item) => item.name).join('/') }}
        </div>
        <div v-else class="text-gray-400">未知作者TAT</div>
      </div>
    </div>
    <!-- playback component -->
    <div class="w-[95%] h-[24%]">
      <!-- song progress -->
      <div class="h-[30%] w-full">
        <div class="w-full">
          <el-slider v-model="songProgress" />
        </div>
        <div class="w-full flex justify-between">
          <!-- now song progress -->
          <span class="text-gray-400">0:00</span>
          <!-- total song progress -->
          <span class="text-gray-400">3:00</span>
        </div>
      </div>
      <!-- various buttons -->
      <div class="h-[70%] w-full flex justify-between items-center">
        <!-- random model -->
        <div class="h-[21%] aspect-square">
          <MyImage src="../../src/assets/img/random_model.svg" className="h-full w-full" />
        </div>
        <!-- previous -->
        <div class="h-[21%] aspect-square">
          <MyImage src="../../src/assets/img/previous.svg" className="h-full w-full" />
        </div>
        <!-- play or pause -->
        <div class="h-[30%] aspect-square icon">
          <el-icon v-if="isPlay"><CaretRight /></el-icon>
          <MyImage v-else src="../../src/assets/img/pause.svg" className="h-full w-full" />
        </div>
        <!-- next -->
        <div class="h-[21%] aspect-square">
          <MyImage src="../../src/assets/img/next.svg" className="h-full w-full" />
        </div>
        <!-- cycle model -->
        <div class="h-[21%] aspect-square">
          <MyImage src="../../src/assets/img/cycle_model.svg" className="h-full w-full" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
