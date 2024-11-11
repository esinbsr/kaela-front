import apiClient from "./apiClient";

// Récupère les commentaires pour un produit spécifique / Retrieve comments for a specific product
export const getComment = async (productDetailId) => {
  try {
    const response = await apiClient.get(
      `getCommentsByProduct/${productDetailId}`
    );
    return response.data.comments;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

// Ajoute un nouveau commentaire / Add a new comment
export const addComment = async (formData) => {
  try {
    const response = await apiClient.post("addComment", formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

// Met à jour un commentaire / Update a comment
export const updateComment = async (formData) => {
  try {
    const response = await apiClient.post("updateComment", formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

// Supprime un commentaire / Delete a comment
export const deleteComment = async (commentId) => {
  try {
    const response = await apiClient.delete(`deleteComment/${commentId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};
