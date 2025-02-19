<template>
    <div class="flex items-center justify-between mb-6 mt-6 ml-6">
      <div>
        <h1 class="text-2xl font-bold text-purple-900">Home Dashboard</h1>
        <p class="text-gray-500">View summary of information here</p>
      </div>
    </div>
    <div v-if="data" class="overflow-auto p-4 bg-white rounded-lg shadow-lg">
      <CpuUsageBarChart v-if="cpuChartData" :chart-data="cpuChartData" :chart-options="chartOptions" />
      <pre>{{ data }}</pre>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { fetchDevices } from '../services/deviceService';
  import { Device } from '../types';
  import CpuUsageBarChart from '../components/CpuUsageBarChart.vue';
  
  const data = ref<Device[] | null>(null);
  const cpuChartData = ref(null);
  
  onMounted(async () => {
    try {
      data.value = await fetchDevices();
      cpuChartData.value = computeCpuChartData(data.value);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });
  
  const computeCpuChartData = (devices: Device[]) => {
    const labels = devices.map(device => device.name);
    const cpuUsage = devices.map(device => device.telemetryData.reduce((acc, curr) => acc + curr.cpuUsage, 0) / device.telemetryData.length);
  
    return {
      labels,
      datasets: [
        {
          label: 'CPU Usage',
          backgroundColor: '#42A5F5',
          data: cpuUsage,
        },
      ],
    };
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true, // Ensure aspect ratio is maintained
    scales: {
      y: {
        beginAtZero: true, // Ensure y-axis starts at zero
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Average CPU usage per device',
        font: {
          size: 18
        }
      }
    }
  };
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