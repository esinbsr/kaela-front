import apiClient from "./apiClient";

// Récupère tous les produits / Retrieve all products
export const getProduct = async () => {
  const response = await apiClient.get("getProduct");
  return response.data.product;
};

// Récupère un produit par identifiant / Retrieve a product by ID
export const getProductById = async (id) => {
  const response = await apiClient.get(`getProductById/${id}`); 
  return response.data.product;
};

// Ajoute un nouveau produit / Add a new product
export const addProduct = async (formData) => {
  const response = await apiClient.post("addProduct", formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Type de contenu multipart/form-data / Content type for multipart/form-data
    }
  });
  return response.data;
};

// Met à jour un produit / Update a product
export const updateProduct = async (formData) => {
  const response = await apiClient.post("updateProduct", formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Type de contenu multipart/form-data / Content type for multipart/form-data
    },
  });
  return response.data;
};

// Supprime un produit par identifiant / Delete a product by ID
export const deleteProduct = async (productId) => {
  const response = await apiClient.delete(`deleteProduct/${productId}`);
  return response.data;
};