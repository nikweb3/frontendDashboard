export const cpuChartOptions = {
    responsive: true,
    maintainAspectRatio: true, 
    scales: {
      y: {
        beginAtZero: true, 
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Average CPU Usage per Device',
        font: {
          size: 18
        }
      }
    }
  };
  
  export const memoryChartOptions = {
    responsive: true,
    maintainAspectRatio: true, 
    scales: {
      y: {
        beginAtZero: true, 
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Average Memory Usage per Device',
        font: {
          size: 18
        }
      }
    }
  };
  
  export const complianceChartOptions = {
    responsive: true,
    maintainAspectRatio: true, 
    plugins: {
      title: {
        display: true,
        text: 'Policy compliance of devices',
        font: {
          size: 18
        }
      },
      datalabels: {
        formatter: (value: number, context: { chart: { data: { datasets: { data: any[]; }[]; }; }; }) => {
          const total = context.chart.data.datasets[0].data.reduce((acc, curr) => acc + curr, 0);
          const percentage = ((value / total) * 100).toFixed(2) + '%';
          return percentage;
        },
        color: '#fff',
        font: {
          size: 14
        }
      }
    }
  };
  
  export const encryptionChartOptions = {
    responsive: true,
    maintainAspectRatio: true, 
    plugins: {
      title: {
        display: true,
        text: 'Encryption status of devices',
        font: {
          size: 18
        }
      },
      datalabels: {
        formatter: (value: number, context: { chart: { data: { datasets: { data: any[]; }[]; }; }; }) => {
          const total = context.chart.data.datasets[0].data.reduce((acc, curr) => acc + curr, 0);
          const percentage = ((value / total) * 100).toFixed(2) + '%';
          return percentage;
        },
        color: '#fff',
        font: {
          size: 14
        }
      }
    }
  };
  
  export const powerConsumptionChartOptions = {
    responsive: true,
    maintainAspectRatio: true, 
    scales: {
      y: {
        beginAtZero: true, 
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Power Consumption per Device',
        font: {
          size: 18
        }
      }
    }
  };
  
  export const carbonFootprintChartOptions = {
    responsive: true,
    maintainAspectRatio: true, 
    scales: {
      y: {
        beginAtZero: true, 
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Carbon Footprint per Device',
        font: {
          size: 18
        }
      }
    }
  };
  
  export const dexScoreChartOptions = {
    responsive: true,
    maintainAspectRatio: true, 
    plugins: {
      title: {
        display: true,
        text: 'DEX Score per Device',
        font: {
          size: 18
        }
      }
    }
  };