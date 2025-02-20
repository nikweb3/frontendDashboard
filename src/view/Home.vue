<template>
  <div class="flex items-center justify-between mb-6 mt-6 ml-6">
    <div>
      <h1 class="text-2xl font-bold text-purple-900">Home Dashboard</h1>
      <p class="text-gray-500">View summary of information here</p>
    </div>
  </div>
  <div v-if="data" class="overflow-auto p-4 bg-white rounded-lg shadow-lg mb-6">
    <div class="chart-row">
      <div class="chart-container">
        <CpuUsageBarChart v-if="cpuChartData" :chart-data="cpuChartData" :chart-options="cpuChartOptions" />
      </div>
      <div class="chart-container">
        <CompliancePieChart v-if="complianceChartData" :chart-data="complianceChartData"
          :chart-options="complianceChartOptions" />
      </div>
    </div>

    <div class="chart-row">
      <div class="chart-container">
        <MemoryUsageBarChart v-if="memoryChartData" :chart-data="memoryChartData" :chart-options="memoryChartOptions" />
      </div>
      <div class="chart-container">
        <EncryptionPieChart v-if="encryptionChartData" :chart-data="encryptionChartData"
          :chart-options="encryptionChartOptions" />
      </div>
    </div>

    <div class="chart-container-line">
      <PowerConsumptionLineChart v-if="powerConsumptionChartData" :chart-data="powerConsumptionChartData"
        :chart-options="powerConsumptionChartOptions" />
    </div>
    <div class="chart-container-line">
      <CarbonFootprintLineChart v-if="carbonFootprintChartData" :chart-data="carbonFootprintChartData"
        :chart-options="carbonFootprintChartOptions" />
    </div>
    <div class="scaled-chart-container"> 
      <DexScoreRadarChart v-if="dexScoreChartData" :chart-data="dexScoreChartData"
        :chart-options="dexScoreChartOptions" />
    </div>
    {{ data }}
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchDevices } from '../services/deviceService';
import type { Device } from '../types';
import CpuUsageBarChart from '../components/CpuUsageBarChart.vue';
import MemoryUsageBarChart from '../components/MemoryUsageBarChart.vue';
import CompliancePieChart from '../components/CompliancePieChart.vue';
import EncryptionPieChart from '../components/EncryptionPieChart.vue';
import PowerConsumptionLineChart from '../components/PowerConsumptionLineChart.vue';
import CarbonFootprintLineChart from '../components/CarbonFootprintLineChart.vue';
import DexScoreRadarChart from '../components/DexScoreRadarChart.vue';
import { cpuChartOptions, memoryChartOptions, complianceChartOptions, encryptionChartOptions, powerConsumptionChartOptions, carbonFootprintChartOptions, dexScoreChartOptions } from '../constants/chartOptions';

const data = ref<Device[]>([]);
const cpuChartData = ref();
const memoryChartData = ref();
const complianceChartData = ref();
const encryptionChartData = ref();
const powerConsumptionChartData = ref();
const carbonFootprintChartData = ref();
const dexScoreChartData = ref();

onMounted(async () => {
  try {
    data.value = await fetchDevices();
    cpuChartData.value = computeCpuChartData(data.value);
    memoryChartData.value = computeMemoryChartData(data.value);
    complianceChartData.value = computeComplianceChartData(data.value);
    encryptionChartData.value = computeEncryptionChartData(data.value);
    powerConsumptionChartData.value = computePowerConsumptionChartData(data.value);
    carbonFootprintChartData.value = computeCarbonFootprintChartData(data.value);
    dexScoreChartData.value = computeDexScoreChartData(data.value);
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

const computeMemoryChartData = (devices: Device[]) => {
  const labels = devices.map(device => device.name);
  const memoryUsage = devices.map(device => device.telemetryData.reduce((acc, curr) => acc + curr.memoryUsage, 0) / device.telemetryData.length);

  return {
    labels,
    datasets: [
      {
        label: 'Memory Usage',
        backgroundColor: '#66BB6A',
        data: memoryUsage,
      },
    ],
  };
};

const computeComplianceChartData = (devices: Device[]) => {
  const compliantCount = devices.filter(device => device.compliance.policyCompliant).length;
  const nonCompliantCount = devices.length - compliantCount;

  return {
    labels: ['Compliant', 'Non-Compliant'],
    datasets: [
      {
        label: 'Compliance Status',
        backgroundColor: ['#42A5F5', '#FF6384'],
        data: [compliantCount, nonCompliantCount],
      },
    ],
  };
};

const computeEncryptionChartData = (devices: Device[]) => {
  const encryptionEnabledCount = devices.filter(device => device.compliance.encryptionEnabled).length;
  const encryptionDisabledCount = devices.length - encryptionEnabledCount;

  return {
    labels: ['Enabled', 'Disabled'],
    datasets: [
      {
        label: 'Encryption Status',
        backgroundColor: ['#36A2EB', '#FFCE56'],
        data: [encryptionEnabledCount, encryptionDisabledCount],
      },
    ],
  };
};

const computePowerConsumptionChartData = (devices: Device[]) => {
  const labels = devices.map(device => device.name);
  const powerConsumption = devices.map(device => device.sustainability.powerConsumption);

  return {
    labels,
    datasets: [
      {
        label: 'Power Consumption',
        backgroundColor: '#FF6384',
        borderColor: '#FF6384',
        fill: false,
        data: powerConsumption,
      },
    ],
  };
};

const computeCarbonFootprintChartData = (devices: Device[]) => {
  const labels = devices.map(device => device.name);
  const carbonFootprint = devices.map(device => device.sustainability.carbonFootprint);

  return {
    labels,
    datasets: [
      {
        label: 'Carbon Footprint',
        backgroundColor: '#4BC0C0',
        borderColor: '#4BC0C0',
        fill: false,
        data: carbonFootprint,
      },
    ],
  };
};

const computeDexScoreChartData = (devices: Device[]) => {
  const labels = devices.map(device => device.name);
  const performanceScores = devices.map(device => device.dexScore.performanceScore);
  const userFeedbackScores = devices.map(device => device.dexScore.userFeedbackScore);

  return {
    labels,
    datasets: [
      {
        label: 'Performance Score',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
        data: performanceScores,
      },
      {
        label: 'User Feedback Score',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        pointBackgroundColor: 'rgba(153, 102, 255, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(153, 102, 255, 1)',
        data: userFeedbackScores,
      },
    ],
  };
};
</script>
