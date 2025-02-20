<template>
    <div class="dashboard-container">
      <h1 class="dashboard-title">Experience Dashboard</h1>
      <p class="dashboard-subtitle">View User experience and score</p>
  
      <div class="chart-wrapper">
        <div ref="chart" class="chart-container"></div>
        <div ref="tooltip" class="tooltip hidden"></div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { fetchDevices } from '../services/deviceService';
  import type { Device } from '../types';
  import * as d3 from 'd3';
  
  const chart = ref(null);
  const tooltip = ref(null);
  const devices = ref<Device[]>([]);
  
  onMounted(async () => {
    try {
      devices.value = await fetchDevices();
      renderChart(devices.value);
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  });
  
  const renderChart = (devices: Device[]) => {
    const margin = { top: 30, right: 30, bottom: 100, left: 80 };
    const width = 800 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
  
    d3.select(chart.value).selectAll("*").remove(); 
    const svg = d3.select(chart.value)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
  
    const x = d3.scaleLinear()
      .domain(d3.extent(devices, (d: Device) => d.dexScore.performanceScore) as [number, number] || [0, 0])
      .range([0, width]);
  
    const y = d3.scaleLinear()
      .domain([0, d3.max(devices, (d: Device) => d.dexScore.userFeedbackScore) || 0])
      .nice()
      .range([height, 0]);
  
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);
  
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)
      .selectAll("line")
      .attr("stroke", "#ddd");
  
    svg.append('g')
      .call(yAxis)
      .selectAll("line")
      .attr("stroke", "#ddd");
  
    svg.selectAll(".tick text")
      .attr("fill", "#333")
      .attr("font-size", "12px");
  
    // Axis labels
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 20)
      .attr("fill", "#333")
      .style("font-weight", "bold")
      .text("Performance Score");
  
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", -height / 2)
      .attr("y", -margin.left + 15)
      .attr("transform", "rotate(-90)")
      .attr("fill", "#333")
      .style("font-weight", "bold")
      .text("User Feedback Score");
  
    // Scatter plot circles (or another chart component)
    svg.selectAll("circle")
      .data(devices)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.dexScore.performanceScore))
      .attr("cy", d => y(d.dexScore.userFeedbackScore))
      .attr("r", 8)
      .style("fill", "#4a047e")
      .style("stroke", "#6a1b9a")
      .style("stroke-width", 2)
      .on("mouseover", (event, d) => {
        d3.select(tooltip.value)
          .classed('hidden', false)
          .html(`<strong>Device: ${d.name}</strong><br>Performance: ${d.dexScore.performanceScore}<br>Feedback: ${d.dexScore.userFeedbackScore}`);
      })
      .on("mousemove", (event) => {
        d3.select(tooltip.value)
          .style("left", `${event.clientX - 130}px`)
          .style("top", `${event.clientY + 250}px`);
      })
      .on("mouseout", () => {
        d3.select(tooltip.value).classed('hidden', true);
      });
  };
  </script>
  
  <style scoped>
  .dashboard-container {
    text-align: center;
    padding: 20px;
    background: linear-gradient(135deg, #eef2f3, #dfe9f3);
    border-radius: 12px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    width: 80%;
    margin: 20px auto;
  }
  
  .dashboard-title {
    font-size: 28px;
    font-weight: bold;
    color: #4a047e;
    text-align: left;
  }
  
  .dashboard-subtitle {
    color: #555;
    font-size: 16px;
    text-align: left;
    margin-bottom: 20px;
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
  
  .tooltip {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.85);
    color: white;
    padding: 8px 14px;
    border-radius: 6px;
    font-size: 14px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }
  </style>
  