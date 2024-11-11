import apiClient from "./apiClient";

// Envoie un message de contact / Send a contact message
export const sendMessage = async (formData) => {
  try {
    const response = await apiClient.post("contact", formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};
