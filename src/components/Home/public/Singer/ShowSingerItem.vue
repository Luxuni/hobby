<script setup lang="ts">
import { ref } from 'vue';
import '@/components/Home/public/ShowItem/ShowItem.scss'

defineProps<{ src: string; name: string; id: number; loading: boolean }>()
const image = ref<HTMLDivElement>(null as unknown as HTMLDivElement)
const introduce = ref<HTMLDivElement>(null as unknown as HTMLDivElement)
const clickShowItemEvent = () => { }
const changeIntroduce = () => {
  if (introduce.value) {
    introduce.value.style.width = `${image.value.offsetWidth}px`
  }
}
const enterPlaylistDetails = () => { }
</script>

<template>
  <div class="h-full aspect-square flex flex-col items-center justify-around cursor-pointer show_item"
    @click="clickShowItemEvent">
    <el-skeleton :loading="loading" :animated="true">
      <template #template>
        <div ref="image" class="h-[80%] aspect-square overflow-hidden rounded-3xl">
          <el-skeleton-item variant="image" style="height: 100%; width: 100%; border-radius: 1.5rem" />
        </div>
        <!-- introduce -->
        <el-skeleton-item variant="text" style="width: 80%"></el-skeleton-item>
      </template>
      <template #default>
        <!-- TODO 增加遮罩层，上半部点击进入歌手详情，下半部点击直接将歌单纳入播放列表 -->
        <div v-resize="changeIntroduce" ref="image"
          class="mask_p h-[80%] aspect-square overflow-hidden rounded-3xl relative">
          <!-- 上半部遮罩，点击进入歌单详情 -->
          <div class="mask w-full h-[50%] absolute bg-black opacity-75 z-10 flex items-center justify-center">
            <el-button @click.stop="enterPlaylistDetails">查看详情</el-button>
          </div>
          <MyImage :src="src" className="h-full w-full rounded-3xl hover:scale-150 transition-all duration-500" />
        </div>
        <!-- introduce -->
        <div ref="introduce" class="text-sm truncate text-center">{{ name }}</div>
        <!-- <div>{{name}}</div> -->
      </template>
    </el-skeleton>
  </div>
</template>

<style scoped lang="scss">
.mask_p {
  .mask {
    top: -100%;
    transition: all .3s ease;
  }

  &:hover {
    .mask {
      top: 0;
    }
  }
}
</style>