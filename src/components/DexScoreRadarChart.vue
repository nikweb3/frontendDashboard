<template>
    <Radar :data="chartData" :options="chartOptions" />
  </template>
  
  <script setup lang="ts">
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler
  } from 'chart.js'
  import { Radar } from 'vue-chartjs'
  import { defineProps } from 'vue'
  
  ChartJS.register(RadialLinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)
  
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