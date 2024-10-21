import apiClient from "./apiClient";


export const getInformation = async () => {
  const response = await apiClient.get("getInformation");
  return response.data.information;
};


export const getInformationById = async (id) => {
  const response = await apiClient.get(`getInformationById/${id}`);
  return response.data.information;
};


export const addInformation = async (formData) => {
  const response = await apiClient.post("addInformation", formData);
  return response.data;
};

export const updateInformation = async (formData) => {
  const response = await apiClient.put("updateInformation", formData);
  return response.data;
};


export const deleteInformation = async (informationId) => {
  const response = await apiClient.delete(`deleteInformation/${informationId }`);
  return response.data;
};