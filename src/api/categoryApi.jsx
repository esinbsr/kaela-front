import apiClient from "./apiClient";

export const getProductCategories = async () => {
  const response = await apiClient.get("getProductCategory");
  return response.data.category;
};

export const getCategoryById = async (id) => {
  const response = await apiClient.get(`getCategoryById/${id}`);
  return response.data.category;
};

export const addCategory = async (formData) => {
  const response = await apiClient.post("addCategory", formData);
  return response.data;
};

// Change the method to PUT for updating a category
export const updateCategory = async (formData) => {
  const response = await apiClient.put("updateCategory", formData);
  return response.data;
};

// Change the method to DELETE for deleting a category
export const deleteCategory = async (categoryId) => {
  const response = await apiClient.delete(`deleteCategory/${categoryId}`);
  return response.data;
};
