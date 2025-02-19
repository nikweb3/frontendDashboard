import apiClient from "./apiClient";

export const fetchDevices = async () => {
    try {
      const response = await apiClient.get('/Device'); 
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };