<script setup lang="ts">import { API } from '@/servies/api/API';
import { NeededShowPlaylistMessage } from '@/store/NeededShowPlaylistMessage';
import { ChatDotRound, Download, Plus, Share } from '@element-plus/icons-vue';
import moment from 'moment';
import { storeToRefs } from 'pinia';

defineProps<{ neededShowPlaylistMessage: API.playListTypes }>()

</script>

<template>
  <!-- header -->
  <div class="w-full h-full flex justify-between items-center">
    <!-- left image -->
    <div class="h-full aspect-square overflow-hidden rounded-3xl border-2 border-solid border-white">
      <MyImage :src="neededShowPlaylistMessage.coverImgUrl"
        className="h-full w-full rounded-3xl hover:scale-150 transition-all duration-500" />
    </div>
    <!-- right message -->
    <div class="h-full w-[62%] flex flex-col justify-between">
      <!-- title -->
      <h1 class="text-3xl">{{  neededShowPlaylistMessage.name  }}</h1>
      <!-- creator and when was it created  -->
      <div class="h-1/5 w-4/5 flex items-center justify-between">
        <!-- creator and head -->
        <div class="h-full">
          <RouterLink :to="{ name: 'UserHome', params: { uid: neededShowPlaylistMessage.creator.userId } }"
            class="h-full flex items-center">
            <div class="h-full aspect-square rounded-xl overflow-hidden mr-4">
              <MyImage :src="neededShowPlaylistMessage.creator.avatarUrl" className="h-full w-full rounded-xl" />
            </div>
            <div>{{  neededShowPlaylistMessage.creator.nickname  }}</div>
          </RouterLink>
        </div>
        <!-- when was it created -->
        <div>{{  moment(neededShowPlaylistMessage.createTime).format('YYYY-M-D')  }} 创建</div>
      </div>
      <!-- operate -->
      <div class="w-full h-[13%]">
        <el-button size="small">播放全部</el-button>
        <el-button size="small">
          <el-icon>
            <Plus />
          </el-icon>
          <span>{{  neededShowPlaylistMessage.subscribedCount  }}</span>
        </el-button>
        <el-button size="small">
          <el-icon>
            <Share />
          </el-icon>
          <span>{{  neededShowPlaylistMessage.shareCount  }}</span>
        </el-button>
        <el-button size="small">
          <el-icon>
            <Download />
          </el-icon>
          <span>{{  neededShowPlaylistMessage.trackCount  }}</span>
        </el-button>
        <el-button size="small">
          <el-icon>
            <ChatDotRound />
          </el-icon>
          <span>{{  neededShowPlaylistMessage.commentCount  }}</span>
        </el-button>
      </div>
      <!-- tags -->
      <div class="h-[13%] w-full flex">
        <span class="h-full w-[10%] flex items-center">标签：</span>
        <div class="h-full w-2/5 flex items-center justify-between">
          <el-tag v-for="tag in neededShowPlaylistMessage.tags" :key="tag" :type="'success'" size="small">{{  tag  }}
          </el-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>