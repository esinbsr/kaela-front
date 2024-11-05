import apiClient from "./apiClient";

// Connecte un utilisateur / Log in a user
export const loginUser = async ({ email, password }) => {
  const response = await apiClient.post("login", {
    email,
    password,
  });
  return response.data;
};

// Ajoute un nouvel utilisateur / Add a new user
export const addUser = async (formData) => {
  const response = await apiClient.post("signup", formData);
  return response.data;
};