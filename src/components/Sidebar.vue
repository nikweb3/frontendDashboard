<template>
  <aside class="w-64 bg-custom-900 h-screen text-white p-4 flex flex-col">
    <router-link to="/" class="text-xl font-bold mb-6">
      viadex <span class="text-gray-400">one</span>
    </router-link>
    <div class="relative mb-4">
      <input type="text" placeholder="Search" class="p-2 bg-custom-800 rounded w-full pl-10" />
      <i class="fas fa-search absolute left-3 top-1/2 transform translate-y-1/4 text-gray-400"></i>
    </div>

    <nav class="flex flex-col gap-2">
      <router-link to="/" class="p-3 rounded hover:bg-custom-700 flex items-center gap-2" active-class="bg-custom-700">
        <i class="fas fa-home text-white"></i> Home
      </router-link>
      <router-link to="/experience" class="p-3 rounded hover:bg-custom-700 flex items-center gap-2" active-class="bg-custom-700">
        <i class="fas fa-chart-line text-white"></i> Experience
      </router-link>
      <router-link to="/sustainability" class="p-3 rounded hover:bg-custom-700 flex items-center gap-2" active-class="bg-custom-700">
        <i class="fas fa-leaf text-white"></i> Sustainability
      </router-link>
      <router-link to="/compliance" class="p-3 rounded hover:bg-custom-700 flex items-center gap-2" active-class="bg-custom-700">
        <i class="fas fa-shield-alt text-white"></i> Compliance
      </router-link>
    </nav>
  </aside>
</template>

<script setup lang="ts">
</script>

<style scoped>
.bg-custom-900 {
  background-color: #473869;
}
.bg-custom-800 {
  background-color: #392e5d;
}
.bg-custom-700 {
  background-color: #392e5d;
}
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
.left-3 {
  left: 0.75rem;
}
.top-1\/2 {
  top: 50%;
}
.transform {
  transform: translateY(-50%);
}
.translate-y-1\/4 {
  transform: translateY(-65%);
}
.text-gray-400 {
  color: #cbd5e0;
}
.pl-10 {
  padding-left: 2.5rem;
}
</style>