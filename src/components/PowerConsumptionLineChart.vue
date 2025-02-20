<template>
    <Line :data="chartData" :options="chartOptions" />
  </template>
  
  <script setup lang="ts">
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
  } from 'chart.js'
  import { Line } from 'vue-chartjs'
  import { defineProps } from 'vue'
  
  ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend)
  
  const props = defineProps({
    chartData: {
      type: Object,
      required: true
    },
    chartOptions: {
      type: Object,
      required: true
    }
  })
  </script>