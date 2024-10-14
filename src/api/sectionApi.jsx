import apiClient from "./apiClient";

export const getSection = async () => {
    const response = await apiClient.get("getSection");
    return response.data.section || [];
  }
  