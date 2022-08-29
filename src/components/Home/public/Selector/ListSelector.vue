<script setup lang="ts">
import { ArrowDownBold } from '@element-plus/icons-vue';

defineProps<{ classification: string, handleDropdown: (value: { id: string; name: string }) => void, commandArr: { id: string; name: string }[] }>()

</script>

<template>
  <el-dropdown @command="handleDropdown" popper-class="w-[10%]" class="h-full w-[38%]">
    <div ref="dropdown" class="h-full w-full rounded-full bg-[#313745] flex items-center justify-center text-white">
      <span class="mr-5">{{ classification }}</span>
      <el-icon>
        <ArrowDownBold />
      </el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in commandArr" :command="{ id: item.id, name: item.name }">{{item.name}}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped>
</style>