import apiClient from "./apiClient";

// Récupère les catégories / Retrieve categories
export const getProductCategories = async () => {
  try {
    const response = await apiClient.get("getProductCategory");
    return response.data.category;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

// Récupère une catégorie par son identifiant / Retrieve a category by its ID
export const getCategoryById = async (id) => {
  try {
    const response = await apiClient.get(`getCategoryById/${id}`);
    return response.data.category;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

// Ajoute une nouvelle catégorie / Add a new category
export const addCategory = async (formData) => {
  try {
    const response = await apiClient.post("addCategory", formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

// Met à jour une catégorie / Update a category
export const updateCategory = async (formData) => {
  try {
    const response = await apiClient.put("updateCategory", formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

// Supprime une catégorie / Delete a category
export const deleteCategory = async (categoryId) => {
  try {
    const response = await apiClient.delete(`deleteCategory/${categoryId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};
