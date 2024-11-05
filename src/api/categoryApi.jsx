import apiClient from "./apiClient";

// Récupère les catégories / Retrieve categories
export const getProductCategories = async () => {
  const response = await apiClient.get("getProductCategory");
  return response.data.category;
};

// Récupère une catégorie par son identifiant / Retrieve a category by its ID
export const getCategoryById = async (id) => {
  const response = await apiClient.get(`getCategoryById/${id}`);
  return response.data.category;
};

// Ajoute une nouvelle catégorie / Add a new category
export const addCategory = async (formData) => {
  const response = await apiClient.post("addCategory", formData);
  return response.data;
};

// Met à jour une catégorie / Update a category
export const updateCategory = async (formData) => {
  const response = await apiClient.put("updateCategory", formData);
  return response.data;
};

// Supprime une catégorie / Delete a category
export const deleteCategory = async (categoryId) => {
  const response = await apiClient.delete(`deleteCategory/${categoryId}`);
  return response.data;
};