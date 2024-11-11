import apiClient from "./apiClient";

// Récupère toutes les sections / Retrieve all sections
export const getSection = async () => {
  try {
    const response = await apiClient.get("getSection");
    return response.data.section || []; // Retourne les sections ou un tableau vide si aucune section n'est trouvée / Returns sections or an empty array if none are found
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};
