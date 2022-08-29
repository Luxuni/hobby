<script setup lang="ts">
import ListSelector from "@/components/Home/public/Selector/ListSelector.vue";
import { SingerMessage } from "@/store/SingerMessage";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const SingerMessageStore = SingerMessage()
await SingerMessageStore.getActiveList(16)
const { needShowArtist, getNeedShowArtistLoading } = storeToRefs(SingerMessageStore)
//singer Category
const singerClassification = ref('全部')
const handleDropdown = async (value: { id: string; name: string }) => {
  singerClassification.value = value.name
  console.log(value)
  await SingerMessageStore.getActiveList(16, 0, Number(value.id), Number(commandArrArea.filter(item => item.name === areaClassification.value)[0].id))
}
const commandArr = [
  { id: '-1', name: '全部' },
  { id: '1', name: '男歌手' },
  { id: '2', name: '女歌手' },
  { id: '3', name: '乐队' },
]
//area Category
const areaClassification = ref('全部')
const handleDropdownArea = async (value: { id: string; name: string }) => {
  areaClassification.value = value.name
  console.log(value)
  await SingerMessageStore.getActiveList(16, 0, Number(commandArr.filter(item => item.name === singerClassification.value)[0].id), Number(value.id))
}
const commandArrArea = [
  { id: '-1', name: '全部' },
  { id: '7', name: '华语' },
  { id: '96', name: '欧美' },
  { id: '8', name: '日本' },
  { id: '16', name: '韩国' },
  { id: '0', name: '其他' },
]
</script>

<template>
  <div class="w-full h-full flex flex-col justify-between">
    <!-- header -->
    <div class="h-[5%] w-full">
      <HeaderSearch />
    </div>
    <!-- select -->
    <div class="w-full h-[5%] flex justify-between">
      <!-- Singer Category -->
      <ListSelector :classification="singerClassification" :handleDropdown="handleDropdown" :commandArr="commandArr" />
      <!-- area Category -->
      <ListSelector :classification="areaClassification" :handleDropdown="handleDropdownArea"
        :commandArr="commandArrArea" />
    </div>
    <!-- contert -->
    <div class="h-4/5 w-full grid grid-cols-4 grid-rows-4 gap-6">
      <ShowSingerItem v-for="item in needShowArtist" :key="item.id" :src="item.picUrl" :name="item.name" :id="item.id"
        :loading="getNeedShowArtistLoading" />
    </div>
  </div>
</template>

<style scoped>
</style>