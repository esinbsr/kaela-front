import apiClient from "./apiClient";

// Récupère toutes les informations / Retrieve all information
export const getInformation = async () => {
  const response = await apiClient.get("getInformation");
  return response.data.information;
};

// Récupère des informations par identifiant / Retrieve information by ID
export const getInformationById = async (id) => {
  const response = await apiClient.get(`getInformationById/${id}`);
  return response.data.information;
};

// Ajoute de nouvelles informations / Add new information
export const addInformation = async (formData) => {
  const response = await apiClient.post("addInformation", formData);
  return response.data;
};

// Met à jour des informations / Update information
export const updateInformation = async (formData) => {
  const response = await apiClient.put("updateInformation", formData);
  return response.data;
};

// Supprime des informations par identifiant / Delete information by ID
export const deleteInformation = async (informationId) => {
  const response = await apiClient.delete(`deleteInformation/${informationId}`);
  return response.data;
};