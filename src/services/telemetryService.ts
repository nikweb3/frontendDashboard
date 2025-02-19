import apiClient from "./apiClient";

export const fetchTelemetryList = async () => {
    try {
      const response = await apiClient.get('/Telemetry'); 
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };