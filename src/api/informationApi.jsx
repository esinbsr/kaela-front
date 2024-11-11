import apiClient from "./apiClient";

// Récupère toutes les informations / Retrieve all information
export const getInformation = async () => {
  try {
    const response = await apiClient.get("getInformation");
    return response.data.information;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

// Récupère des informations par identifiant / Retrieve information by ID
export const getInformationById = async (id) => {
  try {
    const response = await apiClient.get(`getInformationById/${id}`);
    return response.data.information;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

// Ajoute de nouvelles informations / Add new information
export const addInformation = async (formData) => {
  try {
    const response = await apiClient.post("addInformation", formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

// Met à jour des informations / Update information
export const updateInformation = async (formData) => {
  try {
    const response = await apiClient.put("updateInformation", formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

// Supprime des informations par identifiant / Delete information by ID
export const deleteInformation = async (informationId) => {
  try {
    const response = await apiClient.delete(
      `deleteInformation/${informationId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};
