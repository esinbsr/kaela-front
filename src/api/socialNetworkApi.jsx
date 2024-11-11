import apiClient from "./apiClient";

// Récupère tous les réseaux sociaux / Retrieve all social networks
export const getSocialNetwork = async () => {
  try {
    const response = await apiClient.get("getSocialNetwork");
    return response.data.socialNetworks;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

// Récupère un réseau social par identifiant / Retrieve a social network by ID
export const getSocialNetworkById = async (id) => {
  try {
    const response = await apiClient.get(`getSocialNetworkById/${id}`);
    return response.data.socialNetwork;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

// Ajoute un nouveau réseau social / Add a new social network
export const addSocialNetwork = async (formData) => {
  try {
    const response = await apiClient.post("addSocialNetwork", formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

// Met à jour un réseau social / Update a social network
export const updateSocialNetwork = async (formData) => {
  try {
    const response = await apiClient.put("updateSocialNetwork", formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

// Supprime un réseau social par identifiant / Delete a social network by ID
export const deleteSocialNetwork = async (socialNetworkId) => {
  try {
    const response = await apiClient.delete(
      `deleteSocialNetwork/${socialNetworkId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};
