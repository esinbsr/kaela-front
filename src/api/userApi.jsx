import apiClient from "./apiClient";

export const loginUser = async ({ email, password }) => {
    const response = await apiClient.post("login", {
        email,
        password,
    });
    return response.data;
};

export const addUser = async (formData) => {
    const response = await apiClient.post("signup", formData);
    return response.data;
};

export const logoutUser = async () => {
    const response = await apiClient.post("logout"); 
    return response.data;
};