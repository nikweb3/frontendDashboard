<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
</script>

<template>
  <div class="flex h-screen bg-black">
    <Sidebar />
    <!-- <main class="flex-1 p-6 overflow-auto flex justify-center">
      <div class="bg-white rounded-lg shadow-lg w-full ">
        <RouterView />
      </div>
    </main> -->
    <main class="flex-1 overflow-auto flex justify-center">
      <div class="bg-white rounded-lg shadow-lg w-full ">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped>
.bg-black {
  background-color: #392e5d;
}
.bg-white {
  background-color: #fff;
}
.rounded-lg {
  border-radius: 0.5rem;
}
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>