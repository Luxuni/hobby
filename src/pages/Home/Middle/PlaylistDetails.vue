<script setup lang="ts">
import { NeededShowPlaylistMessage } from '@/store/NeededShowPlaylistMessage'
import { useUserMessage } from '@/store/UserMessage'
import { CaretRight, Delete, Star } from '@element-plus/icons-vue'
import { vLoading } from 'element-plus'
import gsap from 'gsap'
import _ from 'lodash'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

const route = useRoute()
//从pinia中拿取数据
const NeededShowPlaylistMessageStore = NeededShowPlaylistMessage()
const {
  neededShowPlaylistMessage,
  neededShowPlaylistSongsList,
  getNeededShowPlaylistSongsListLoading,
  CommentsMessage,
  getPlaylistCommentsLoading
} = storeToRefs(NeededShowPlaylistMessageStore)
//根据路由参数获取歌单详情
await NeededShowPlaylistMessageStore.getNeededShowPlaylistMessage(Number(route.params.id))
//介绍栏目外侧div盒子实例
const outside = ref(null as unknown as HTMLDivElement)
//介绍栏目内侧pre盒子实例
const medial = ref(null as unknown as HTMLPreElement)
//控制展开全部介绍内容是否显示，默认为不显示
const isShowAllBtn = ref<null | boolean>(null)
//整个页面盒子的实例
const container = ref(null as unknown as HTMLDivElement)
//控制下方展开全部内容的文字是为展开还是收起
const showAllBtnText = ref('')
//介绍栏目的最外侧包裹盒子，用于页面使用flex布局方便
const introduceBox = ref<null | HTMLDivElement>(null)
//在所有元素的实例都加载完成后，执行一些动作
//使得获取高度的方法只执行一次
const getFlag = ref(true)
const getOutMeHeight = () => {
  _.debounce(
    () => {
      if (getFlag.value) {
        outside.value.style.height =
          container.value.offsetHeight * 0.13 < medial.value.offsetHeight
            ? container.value.offsetHeight * 0.13 + 'px'
            : medial.value.offsetHeight + 'px'
        getFlag.value = false
      }
      if (introduceBox.value) {
        introduceBox.value.classList.value = 'my-4'
      }
      if (outside.value.offsetHeight !== 0 && medial.value.offsetHeight !== 0 && container.value.offsetHeight !== 0) {
        isShowAllBtn.value =
          medial.value.offsetHeight >= outside.value.offsetHeight &&
          medial.value.offsetHeight > container.value.offsetHeight * 0.13
      }
      if (outside.value.offsetHeight === medial.value.offsetHeight) {
        showAllBtnText.value = '收起'
      } else if (outside.value.offsetHeight < medial.value.offsetHeight) {
        showAllBtnText.value = '展开'
      }
    },
    2000,
    { leading: true, trailing: false },
  )()
}
//点击下方展开全部介绍内容或收起按钮时执行的动作
const showAllIntroduce = () => {
  outside.value.style.height = outside.value.offsetHeight + 'px'
  if (medial.value.offsetHeight === outside.value.offsetHeight) {
    gsap.to(outside.value, {
      duration: 0.6,
      height: container.value.offsetHeight * 0.13,
    })
  } else {
    gsap.to(outside.value, {
      duration: 0.6,
      height: medial.value.offsetHeight,
    })
  }
}
//从pinia发送请求拿取歌单歌曲内容，可做分页
await NeededShowPlaylistMessageStore.getPlaylistTrack(Number(route.params.id), 10, 0)
//格式化时间函数
const formatSeconds = (value: number) => {
  let theTime = Math.round(value / 1000) // 秒
  let theTime1 = 0 // 分
  if (theTime > 60) {
    theTime1 = Math.floor(theTime / 60)
    theTime = theTime % 60
    if (theTime < 10) {
      return `${theTime1}:0${theTime}`
    }
    return `${theTime1}:${theTime}`
  } else if (theTime < 10) {
    return `0:0${theTime}`
  } else {
    return `0:${theTime}`
  }
}
//格式化dt歌曲时长
const formatterDt = (row: any, column: any, cellValue: number, index: number) => {
  return formatSeconds(cellValue)
}
//格式化歌手名
const formatterAr = (row: any, column: any, cellValue: { name: string }[], index: number) => {
  return cellValue.map((item) => item.name).join('/')
}
const id = ref(route.params.id)
const playListCurrentPage = ref(1)
//分页器页码改变时触发
const tableCurrentChange = async (currentPage: number, id: number) => {
  await NeededShowPlaylistMessageStore.getPlaylistTrack(id, 10, (currentPage - 1) * 10)
}
watch(playListCurrentPage, (newPage) => {
  tableCurrentChange(newPage, Number(id.value))
})
//根据歌单id拿取歌单评论
await NeededShowPlaylistMessageStore.getPlaylistComment(Number(route.params.id), 20, 0)
const useUserMessageStore = useUserMessage()
const { userMessage } = storeToRefs(useUserMessageStore)
//用户输入的评论
const commentContent = ref('')
const commentCurentPage = ref(1)

//所有评论分页改变时触发
const allCommentCurrentChange = async (currentPage: number, id: number) => {
  await NeededShowPlaylistMessageStore.getPlaylistComment(id, 20, (currentPage - 1) * 20)
}
watch(commentCurentPage, (newPage) => {
  allCommentCurrentChange(newPage, Number(id.value))
})
watch(() => route.params, async (newParams) => {
  if (newParams.id) {
    console.log(newParams)
    id.value = newParams.id
    await NeededShowPlaylistMessageStore.getNeededShowPlaylistMessage(Number(newParams.id))
    if (playListCurrentPage.value === 1) {
      tableCurrentChange(1, Number(newParams.id))
    } else {
      playListCurrentPage.value = 1
    }
    if (commentCurentPage.value === 1) {
      allCommentCurrentChange(1, Number(newParams.id))
    } else {
      commentCurentPage.value = 1
    }
  }
})
</script>

<template>
  <div ref="container" class="w-full h-full flex flex-col justify-between overflow-y-scroll">
    <!-- header -->
    <div class="w-full h-[23%]">
      <PlaylistHeader :neededShowPlaylistMessage="neededShowPlaylistMessage" />
    </div>
    <!-- introduce -->
    <div ref="introduceBox" class="h-[13%] overflow-hidden my-4">
      <div v-resize="getOutMeHeight" ref="outside" class="overflow-hidden">
        <p v-resize="getOutMeHeight" ref="medial" class="w-full text-sm p-4">
          <span>介绍：</span>
          {{ neededShowPlaylistMessage.description }}
        </p>
      </div>
      <!-- show all introduce btn -->
      <Transition name="fade" mode="out-in" enter-active-class="animate__animated animate__fadeInUp"
        leave-active-class="animate__animated animate__fadeOut">
        <div v-show="isShowAllBtn || false" class="w-full flex justify-end">
          <span class="cursor-pointer text-xs" @click="showAllIntroduce">{{ showAllBtnText }}</span>
        </div>
      </Transition>
    </div>
    <!-- playlist table -->
    <div class="w-full">
      <el-table :data="neededShowPlaylistSongsList" style="width: 100%" :fit="true"
        v-loading="getNeededShowPlaylistSongsListLoading">
        <el-table-column type="index" width="50" />
        <el-table-column prop="name" label="歌曲名" />
        <el-table-column prop="dt" :formatter="formatterDt" label="时长" />
        <el-table-column prop="ar" :formatter="formatterAr" label="歌手" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" circle color="#F2883A">
              <el-icon>
                <Star />
              </el-icon>
            </el-button>
            <el-button size="small" circle color="#AA1DE6">
              <el-icon>
                <CaretRight />
              </el-icon>
            </el-button>
            <el-button size="small" circle color="#FC141F">
              <el-icon>
                <Delete />
              </el-icon>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- pagination -->
      <div class="h-[1/5] w-full">
        <el-pagination v-model:current-page="playListCurrentPage" small background layout="prev, pager, next"
          :total="neededShowPlaylistMessage.trackCount" hide-on-single-page class="mt-4" />
      </div>
    </div>
    <!-- Comment -->
    <div class="flex-1">
      <!-- header -->
      <div class="h-14 w-full text-xl border-b-2 border-red-400 flex items-center mb-4">
        评论 <span class="text-xs self-end mb-4 ml-6">共{{ CommentsMessage.total }}条评论</span>
      </div>
      <!-- comment area -->
      <div class="h-24 w-full flex items-center justify-between pr-3 mb-4">
        <!-- user header -->
        <div class="h-full aspect-square rounded-2xl mr-4">
          <MyImage :src="userMessage?.avatarUrl" className="h-full w-full rounded-2xl" />
        </div>
        <!-- text area -->
        <div class="flex-1 h-full self-start flex flex-col justify-between">
          <el-input type="textarea" resize="none" v-model="commentContent"></el-input>
          <!-- button -->
          <div class="w-full flex justify-end">
            <el-button>提交</el-button>
          </div>
        </div>
      </div>
      <!-- hot comments -->
      <div v-show="CommentsMessage.hotComments?.length ? CommentsMessage.hotComments?.length : false">
        <div class=" h-8 w-full text-sm border-b-[1px] border-gray-400 flex items-center mb-4">精彩评论</div>
        <!-- comment box -->
        <div>
          <CommentItem v-for="item in CommentsMessage.hotComments" :item="item" :key="item.commentId" />
        </div>
      </div>
      <!-- all comments -->
      <div v-loading="getPlaylistCommentsLoading" v-show="CommentsMessage.comments.length > 0">
        <div>
          <div class="h-8 w-full text-sm border-b-[1px] border-gray-400 flex items-center mb-4">
            最新评论
            <span>({{ CommentsMessage.total }})</span>
          </div>
        </div>
        <div>
          <CommentItem v-for="item in CommentsMessage.comments" :item="item" :key="item.commentId" />
          <div>
            <el-pagination v-model:current-page="commentCurentPage" small background layout="prev, pager, next"
              :total="CommentsMessage.total" hide-on-single-page class="mt-4" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>