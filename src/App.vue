<script setup lang="ts"></script>

<template>
  <RouterView v-slot="{ Component }">
    <div class="h-screen w-screen  bg-black">
      <template v-if="Component">
        <Transition name="fade" mode="out-in" enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut">
          <Suspense>
            <div class="h-full w-full overflow-hidden">
              <component :is="Component"></component>
            </div>
            <template #fallback>
              <div class="h-full w-full text-4xl flex items-center justify-center text-white">Loading...</div>
            </template>
          </Suspense>
        </Transition>
      </template>
    </div>

  </RouterView>
</template>

<style scoped>
</style>
