<script setup lang="ts">
import { useRoute } from 'vue-router';
const route=useRoute()
</script>

<template>
<h1>我的歌单</h1>
<div>{{route.params.id}}</div>
</template>

<style scoped>
</style>