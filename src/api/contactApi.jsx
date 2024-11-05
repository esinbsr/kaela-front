import apiClient from "./apiClient";

// Envoie un message de contact / Send a contact message
export const sendMessage = async (formData) => {
    const response = await apiClient.post("contact", formData);
    return response.data;
  };