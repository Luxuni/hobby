<script setup lang="ts">
import { NeedShowUserMessage } from '@/store/NeedShowUserMessage';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import ShowItem from '@/components/Home/public/ShowItem/index.vue';

const route = useRoute();
const NeedShowUserMessageStore = NeedShowUserMessage()
await NeedShowUserMessageStore.getUserMessageById(Number(route.params.uid))
await NeedShowUserMessageStore.getUserPlaylist(Number(route.params.uid), 11, 0)
const { needShowUserMessage, needShowUserPlaylist, getNeedShowUserPlaylistLoading } = storeToRefs(NeedShowUserMessageStore)
</script>

<template>
  <div class="h-full w-full flex flex-col justify-between">
    <!-- header -->
    <div class="w-full h-[23%]">
      <div class="w-full h-full flex justify-between items-center">
        <!-- left image -->
        <div class="h-full aspect-square overflow-hidden rounded-3xl border-2 border-solid border-white">
          <MyImage :src="needShowUserMessage.profile.avatarUrl"
            className="h-full w-full rounded-3xl hover:scale-150 transition-all duration-500" />
        </div>
        <!-- right message -->
        <div class="h-full w-[62%] flex flex-col justify-between">
          <!-- user name -->
          <h1 class="text-3xl">{{  needShowUserMessage.profile.nickname  }}</h1>
        </div>
      </div>
    </div>
    <!-- user playlist -->
    <div class="h-[70%] w-full grid grid-cols-4 grid-rows-3 gap-6">
      <ShowItem v-for="item in needShowUserPlaylist.playlist" :src="item.coverImgUrl" :name="item.name" :id="item.id"
        :loading="getNeedShowUserPlaylistLoading" />
    </div>
  </div>
</template>

<style scoped>
</style>