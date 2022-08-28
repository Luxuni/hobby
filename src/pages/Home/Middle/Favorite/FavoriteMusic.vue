<script setup lang="ts">

</script>

<template>
  <div class="h-full w-full">
    <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <Transition name="fade" mode="out-in" enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut">
            <Suspense>
              <template #default>
                <component :is="Component"></component>
              </template>
              <template #fallback>
                <div class="h-full w-full text-4xl flex items-center justify-center text-white">Loading...</div>
              </template>
            </Suspense>
          </Transition>
        </template>
    </RouterView>
  </div>
</template>

<style scoped>
</style>