import apiClient from "./apiClient";

export const fetchSustainabilityList = async () => {
    try {
      const response = await apiClient.get('/Sustainability'); 
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };