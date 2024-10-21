import apiClient from "./apiClient";

export const getComment = async (productDetailId) => {
    const response = await apiClient.get(`getCommentsByProduct/${productDetailId}`);
    return response.data.comments;
  };
  
  
  export const addComment = async (formData) => {
    const response = await apiClient.post("addComment", formData);
    return response.data;
  };