<template>
    <div class="flex items-center justify-between mb-6 mt-6 ml-6">
      <div>
        <h1 class="text-2xl font-bold text-purple-900">Home Dashboard</h1>
        <p class="text-gray-500">View summary of information here</p>
      </div>
    </div>
    <div v-if="data" class="overflow-auto p-4 bg-white rounded-lg shadow-lg">
      <pre>{{ data }}</pre>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { fetchDevices } from '../services/deviceService';
  import { Device } from '../types';
  
  const data = ref<Device[] | null>(null);
  
  onMounted(async () => {
    try {
      data.value = await fetchDevices();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });
  </script>
  
  <style scoped>
  .overflow-auto {
    overflow: auto;
  }
  .p-4 {
    padding: 1rem;
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