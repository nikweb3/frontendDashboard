<template>
  <div class="dashboard-container">
    <div class="dashboard-header">
      <h1 class="dashboard-title">Compliance Dashboard</h1>
      <p class="dashboard-subtitle">Are your devices compliant with best security practices?</p>
    </div>

    <div class="chart-wrapper">
      <div ref="chart" class="chart-container"></div>
      <div ref="tooltip" class="tooltip hidden"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as d3 from 'd3';
import { fetchDevices } from '../services/deviceService';
import type { Device } from '../types';

const chart = ref(null);
const tooltip = ref(null);

onMounted(async () => {
  try {
    const devices = await fetchDevices();
    const complianceData = computeComplianceData(devices);

    const margin = { top: 30, right: 30, bottom: 100, left: 80 };
    const width = 800 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3.select(chart.value)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .range([0, width])
      .domain(complianceData.map(d => d.name))
      .padding(0.2);

    const y = d3.scaleBand()
      .range([height, 0])
      .domain(['Compliance'])
      .padding(0.2);

    const color = d3.scaleSequential()
      .interpolator(d3.interpolateRdYlGn)
      .domain([0, 100]);

    svg.append('g')
      .selectAll('rect')
      .data(complianceData)
      .enter()
      .append('rect')
      .attr('x', d => x(d.name) ?? 0)
      .attr('y', d => y('Compliance') ?? 0)
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .style('fill', d => color(d.value))
      .style('stroke', '#333')
      .style('stroke-width', '1px')
      .on('mouseover', function (event, d) {
        d3.select(tooltip.value)
          .classed('hidden', false)
          .html(`<strong>${d.name}</strong>: ${d.value}%`);
      })
      .on('mousemove', function (event) {
        const [mouseX, mouseY] = d3.pointer(event);
        d3.select(tooltip.value)
          .style('left', `${mouseX + 10}px`)
          .style('top', `${mouseY - 20}px`);
      })
      .on('mouseout', function () {
        d3.select(tooltip.value).classed('hidden', true);
      });

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .attr('text-anchor', 'end')
      .style('font-size', '12px');

    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", -height / 2)
      .attr("y", -margin.left + 15)
      .attr("transform", "rotate(-90)")
      .attr("fill", "#333")
      .style("font-weight", "bold")
      .text("Compliance");

  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

const computeComplianceData = (devices: Device[]) => {
  return devices.map(device => ({
    name: device.name,
    value: device.compliance.policyCompliant ? 100 : 0,
    compliant: device.compliance.policyCompliant
  }));
};
</script>

<style scoped>
.dashboard-container {
  text-align: left;
  padding: 20px;
  background: linear-gradient(135deg, #eef2f3, #dfe9f3); 
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  margin: 20px auto;
}

.dashboard-header {
  margin-bottom: 20px;
  margin-left: 20px; 
}

.dashboard-title {
  font-size: 1.75rem; 
  font-weight: bold;
  color: #4a047e; 
}

.dashboard-subtitle {
  font-size: 1rem; 
  color: #555; 
}

.chart-container {
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: 10px; 
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); 
  padding: 20px;
}

.chart-wrapper {
  position: relative;
}

.tooltip {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 6px 12px;
  border-radius: 5px;
  font-size: 14px;
  white-space: nowrap;
  pointer-events: none;
  transition: opacity 0.2s ease-in-out;
}

.hidden {
  opacity: 0;
}
</style>
