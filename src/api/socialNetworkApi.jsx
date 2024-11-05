import apiClient from "./apiClient";

// Récupère tous les réseaux sociaux / Retrieve all social networks
export const getSocialNetwork = async () => {
  const response = await apiClient.get("getSocialNetwork");
  return response.data.socialNetworks;
};

// Récupère un réseau social par identifiant / Retrieve a social network by ID
export const getSocialNetworkById = async (id) => {
  const response = await apiClient.get(`getSocialNetworkById/${id}`);
  return response.data.socialNetwork;
};

// Ajoute un nouveau réseau social / Add a new social network
export const addSocialNetwork = async (formData) => {
  const response = await apiClient.post("addSocialNetwork", formData);
  return response.data;
};

// Met à jour un réseau social / Update a social network
export const updateSocialNetwork = async (formData) => {
  const response = await apiClient.put("updateSocialNetwork", formData);
  return response.data;
};

// Supprime un réseau social par identifiant / Delete a social network by ID
export const deleteSocialNetwork = async (socialNetworkId) => {
  const response = await apiClient.delete(`deleteSocialNetwork/${socialNetworkId}`);
  return response.data;
};