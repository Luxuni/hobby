<script setup lang="ts">
import { API } from '@/servies/api/API';
import { StarFilled } from '@element-plus/icons-vue';
import moment from 'moment';

defineProps<{ item: API.CommentItemType }>()
</script>
<template>
  <div class="flex justify-between mb-6">
    <!-- user header -->
    <div class="h-14 aspect-square rounded-xl mr-4">
      <MyImage :src="item.user.avatarUrl" className="h-full w-full rounded-xl" />
    </div>
    <!-- comment detail message -->
    <div class="flex-1 flex flex-col justify-between">
      <!-- content -->
      <p class="w-full text-xs mb-3">
        <span class="text-blue-600">{{ item.user.nickname }}：</span> <span>{{ item.content }}</span>
      </p>
      <!-- replied -->
      <div v-show="item.beReplied.length > 0">
        <div v-for="repliedItem in item.beReplied" class="bg-[#495c698d] text-xs mb-4">
          <span class="text-blue-500">{{ repliedItem.user.nickname }}：</span>
          <span>{{ repliedItem.content }}</span>
        </div>
      </div>
      <div class="text-xs flex justify-between pr-4">
        <span>{{ moment(item.time).format('YYYY年M月D日') }}</span>
        <span class="flex items-center">
          <el-icon>
            <StarFilled />
          </el-icon>
          {{ item.likedCount }} |
          <span>回复</span>
        </span>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>