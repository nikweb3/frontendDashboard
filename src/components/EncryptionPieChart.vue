<template>
  <Pie :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
import { Pie } from 'vue-chartjs'
import { defineProps } from 'vue'

ChartJS.register(ArcElement, Title, Tooltip, Legend)

const props = defineProps({
  chartData: {
    type: Object as () => {
      labels: string[],
      datasets: {
        data: number[],
        backgroundColor: string[]
      }[]
    },
    required: true
  },
  chartOptions: {
    type: Object,
    required: true
  }
})
</script>