<template>
    <div class="dashboard-container">
      <h1 class="dashboard-title">Sustainability Dashboard</h1>
      <p class="dashboard-subtitle">How environmentally friendly are you?</p>
  
      <div class="chart-wrapper">
        <div ref="chart" class="chart-container"></div>
        <div ref="tooltip" class="tooltip"></div>
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
      renderScatterPlot(devices.value);
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  });
  
  const renderScatterPlot = (devices: Device[]) => {
    const margin = { top: 40, right: 40, bottom: 60, left: 70 };
    const width = 700 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
  
    d3.select(chart.value).selectAll("*").remove();
    const svg = d3.select(chart.value)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
  

    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#f5f5f5") 
      .attr("rx", 15) 
      .style("pointer-events", "none"); 
  
    const sustainabilityData = devices.map(device => ({
      name: device.name,
      powerConsumption: device.sustainability.powerConsumption,
      carbonFootprint: device.sustainability.carbonFootprint
    }));
  
    const x = d3.scaleLinear()
      .domain([d3.min(sustainabilityData, d => d.powerConsumption)! - 2, 
               d3.max(sustainabilityData, d => d.powerConsumption)! + 2])
      .range([0, width]);
  
    const y = d3.scaleLinear()
      .domain([d3.min(sustainabilityData, d => d.carbonFootprint)! - 1, 
               d3.max(sustainabilityData, d => d.carbonFootprint)! + 1])
      .range([height, 0]);
  
    // Gridlines
    const xAxis = d3.axisBottom(x).ticks(6).tickSize(-height).tickPadding(10);
    const yAxis = d3.axisLeft(y).ticks(6).tickSize(-width).tickPadding(10);
  
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .selectAll("line")
      .attr("stroke", "#ddd");
  
    svg.append("g")
      .call(yAxis)
      .selectAll("line")
      .attr("stroke", "#ddd");
  
    svg.selectAll(".tick text")
      .attr("fill", "#333")
      .attr("font-size", "12px");
  
    // Scatter points
    svg.selectAll("circle")
      .data(sustainabilityData)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.powerConsumption))
      .attr("cy", d => y(d.carbonFootprint))
      .attr("r", 8)
      .style("fill", "#4a047e") 
      .style("stroke", "#6a1b9a") 
      .style("stroke-width", 2)
      .style("pointer-events", "all") 
      .on("mouseover", (event, d) => {
        d3.select(tooltip.value)
          .style("opacity", 1) 
          .html(`<strong>${d.name}</strong><br>⚡ Power: ${d.powerConsumption}W<br>🌿 Carbon: ${d.carbonFootprint}kg`)
          .style("left", `${event.clientX - 130}px`)
          .style("top", `${event.clientY + 250}px`);
      })
      .on("mousemove", (event) => {
        d3.select(tooltip.value)
          .style("left", `${event.clientX - 300}px`)
          .style("top", `${event.clientY - 250}px`);
      })
      .on("mouseout", () => {
        d3.select(tooltip.value).style("opacity", 0);
      });
  
    // Axis labels
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 20)
      .attr("fill", "#333")
      .style("font-weight", "bold")
      .text("Power Consumption (W)");
  
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", -height / 2)
      .attr("y", -margin.left + 15)
      .attr("transform", "rotate(-90)")
      .attr("fill", "#333")
      .style("font-weight", "bold")
      .text("Carbon Footprint (kg)");
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
  
  .chart-wrapper {
    position: relative;
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
  