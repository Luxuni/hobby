<script setup lang="ts">
import {vLoading} from 'element-plus'
import {Picture as IconPicture} from '@element-plus/icons-vue'

defineProps<{className?: string; src: string}>()
</script>

<template>
  <el-image :class="className" :src="src" loading="lazy">
    <!-- loading状态 -->
    <template #placeholder>
      <div :class="['w-full', 'h-full', className]" v-loading="true"></div>
    </template>
    <!-- error状态 -->
    <template #error>
      <div :class="['w-full', 'h-full', className]">
        <el-icon><icon-picture /></el-icon>
      </div>
    </template>
  </el-image>
</template>

<style scoped></style>
