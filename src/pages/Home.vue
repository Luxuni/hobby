<script setup lang="ts"></script>

<template>
  <!-- 最外层容器 -->
  <div class="w-screen h-screen flex items-center justify-center bg-black">
    <!-- 内层容器 -->
    <div class="h-[95%] w-[95%]">
      <!-- 左侧tab -->
      <div class="h-full w-1/5 rounded-[3rem] bg-[#252D3A]">
        <LeftNavigation />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
