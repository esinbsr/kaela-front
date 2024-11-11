import apiClient from "./apiClient";

// Récupère tous les produits / Retrieve all products
export const getProduct = async () => {
  try {
    const response = await apiClient.get("getProduct");
    return response.data.product;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

// Récupère un produit par identifiant / Retrieve a product by ID
export const getProductById = async (id) => {
  try {
    const response = await apiClient.get(`getProductById/${id}`);
    return response.data.product;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

// Ajoute un nouveau produit / Add a new product
export const addProduct = async (formData) => {
  try {
    const response = await apiClient.post("addProduct", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Type de contenu multipart/form-data / Content type for multipart/form-data
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

// Met à jour un produit / Update a product
export const updateProduct = async (formData) => {
  try {
    const response = await apiClient.post("updateProduct", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Type de contenu multipart/form-data / Content type for multipart/form-data
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

// Supprime un produit par identifiant / Delete a product by ID
export const deleteProduct = async (productId) => {
  try {
    const response = await apiClient.delete(`deleteProduct/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};
