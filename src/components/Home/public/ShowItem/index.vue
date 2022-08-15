<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {MusicPlayer} from '@/store/MusicPlayer'

const MusicPlayerStore = MusicPlayer()
const props = defineProps<{src: string; name: string; id: number}>()
const image = ref<HTMLDivElement>(undefined as unknown as HTMLDivElement)
const introduce = ref<HTMLDivElement>(null as unknown as HTMLDivElement)
const clickShowItemEvent = () => {
  console.log(props.id)
  MusicPlayerStore.getPlaylistDetail(props.id)
}
onMounted(() => {
  introduce.value.style.width = `${image.value.offsetWidth}px`
})
</script>

<template>
  <div class="h-full aspect-square flex flex-col items-center justify-around cursor-pointer" @click="clickShowItemEvent">
    <div ref="image" class="h-[80%] aspect-square overflow-hidden rounded-3xl">
      <MyImage :src="src" className="h-full w-full rounded-3xl hover:scale-150 transition-all duration-500" />
    </div>
    <!-- introduce -->
    <div ref="introduce" class="text-sm truncate">{{ name }}</div>
  </div>
</template>

<style scoped></style>
