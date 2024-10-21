import apiClient from "./apiClient";


export const getSocialNetwork = async () => {
  const response = await apiClient.get("getSocialNetwork");
  return response.data.socialNetworks;
};


export const getSocialNetworkById = async (id) => {
  const response = await apiClient.get(`getSocialNetworkById/${id}`);
  return response.data.socialNetwork;
};


export const addSocialNetwork = async (formData) => {
  const response = await apiClient.post("addSocialNetwork", formData);
  return response.data;
};

export const updateSocialNetwork = async (formData) => {
  const response = await apiClient.put("updateSocialNetwork", formData);
  return response.data;
};


export const deleteSocialNetwork = async (socialNetworkId) => {
  const response = await apiClient.delete(`deleteSocialNetwork/${socialNetworkId}`);
  return response.data;
};