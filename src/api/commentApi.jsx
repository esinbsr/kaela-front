import apiClient from "./apiClient";

// Récupère les commentaires pour un produit spécifique / Retrieve comments for a specific product
export const getComment = async (productDetailId) => {
  const response = await apiClient.get(`getCommentsByProduct/${productDetailId}`);
  return response.data.comments;
};

// Ajoute un nouveau commentaire / Add a new comment
export const addComment = async (formData) => {
  const response = await apiClient.post("addComment", formData);
  return response.data;
};