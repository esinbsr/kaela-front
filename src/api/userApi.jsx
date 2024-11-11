import apiClient from "./apiClient";

// Connecte un utilisateur / Log in a user
export const loginUser = async ({ email, password }) => {
  try {
    const response = await apiClient.post("login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

// Ajoute un nouvel utilisateur / Add a new user
export const addUser = async (formData) => {
  try {
    const response = await apiClient.post("signup", formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};
