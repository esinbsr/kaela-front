import apiClient from "./apiClient";

export const getProduct = async () => {
  const response = await apiClient.get("getProduct");
  return response.data;
}

export const getProductById = async (id) => {
    const response = await apiClient.get(`getProductById/${id}`); 
    return response.data.product;
  };

  
export const addProduct = async (formData) => {
  const response = await apiClient.post("addProduct", formData, {
    headers: {
      'Content-Type': 'multipart/form-data', 
    }
  })
  return response.data;
};

export const updateProduct = async (formData) => {
  const response = await apiClient.post("updateProduct", formData, {
    headers: {
      'Content-Type': 'multipart/form-data', 
    },
  });
  return response.data;
};

export const deleteProduct = async (productId) => {
  const response = await apiClient.post("deleteProduct", { productId });
  return response.data;
};
