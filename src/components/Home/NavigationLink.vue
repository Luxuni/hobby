<script setup lang="ts">
defineProps<{content: string; path: string}>()
</script>

<template>
  <!-- 外层容器 -->
  <div class="flex items-center">
    <slot name="headIcon" />
    <!-- content -->
    <router-link :to="path">
      <span>{{ content }}</span>
    </router-link>
    <slot name="tailIcon" />
  </div>
</template>

<style scoped></style>
