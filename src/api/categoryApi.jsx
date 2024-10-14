import apiClient from "./apiClient";



export const getProductCategories = async () => {
  const response = await apiClient.get("getProductCategory");
  return response.data.category;
};


export const getCategoryById = async (id) => {
  const response = await apiClient.get(`getCategoryById/${id}`);
  return response.data.categoryById;
};


export const addCategory = async (formData) => {
  const response = await apiClient.post("addCategory", formData);
  return response.data;
};

export const updateCategory = async (formData) => {
  const response = await apiClient.post("updateCategory", formData);
  return response.data;
};


export const deleteCategory = async (categoryId) => {
  const response = await apiClient.post("deleteCategory", { categoryId });
  return response.data;
};
