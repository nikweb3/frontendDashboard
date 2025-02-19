import apiClient from "./apiClient";

export const fetchDexScoresList = async () => {
    try {
      const response = await apiClient.get('/DexScore'); 
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };