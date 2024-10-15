import apiClient from "./apiClient";

export const sendMessage = async (formData) => {
    const response = await apiClient.post("contact", formData);
    return response.data;
  };