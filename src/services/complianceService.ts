import apiClient from "./apiClient";

export const fetchComplianceList = async () => {
    try {
      const response = await apiClient.get('/Compliance'); 
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };