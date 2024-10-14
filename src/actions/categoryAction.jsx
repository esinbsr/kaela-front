import apiClient from "../api/apiClient";


export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_ERROR = 'GET_CATEGORIES_ERROR';

export const GET_CATEGORY_BY_ID_SUCCESS = 'GET_CATEGORY_BY_ID_SUCCESS';
export const GET_CATEGORY_BY_ID_ERROR = 'GET_CATEGORY_BY_ID_ERROR';

export const ADD_CATEGORIES_SUCCESS = 'ADD_CATEGORIES_SUCCESS';
export const ADD_CATEGORIES_ERROR = 'ADD_CATEGORIES_ERROR';

export const UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS';
export const UPDATE_CATEGORY_ERROR = 'UPDATE_CATEGORY_ERROR';

export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY_ERROR = 'DELETE_CATEGORY_ERROR';

export const getProductCategories = () => {
  return async (dispatch) => {
    try {
      const response = await apiClient.get("getProductCategory");
      const message = response.data.message;

      if (response.data.success) {
        dispatch({
          type: GET_CATEGORIES_SUCCESS,
          payload: response.data.category,
          message: message,
        });
      } else {
        throw new Error(message);
      }
    } catch (error) {
      dispatch({
        type: GET_CATEGORIES_ERROR,
        payload: error.response?.data?.message || error.message || "No message returned",
      });
    }
  };
};

export const getCategoryById = (categoryId) => {
  return async (dispatch) => {
    try {
      const response = await apiClient.get(`getCategoryById/${categoryId}`);
      const message = response.data.message;

      if (response.data.success) {
      dispatch({
        type: GET_CATEGORY_BY_ID_SUCCESS,
        payload: response.data.categoryById,
        message: message,
      });
    } else {
      throw new Error(message);
  }
    } catch (error) {
      dispatch({
        type: GET_CATEGORY_BY_ID_ERROR,
        payload: error.response?.data?.message || error.message || "No message returned",
      });
    }
  };
};

export const addCategory = (formData) => {
  return async (dispatch) => {
    try {
      const response = await apiClient.post(`addCategory`, formData);
      const message = response.data.message;

      if (response.data.success) {
        dispatch({
          type: ADD_CATEGORIES_SUCCESS,
          payload: response.data.category,
          message: message,
        });
      } else {
        throw new Error(message);
      }
    } catch (error) {
      dispatch({
        type: ADD_CATEGORIES_ERROR,
        payload: error.response?.data?.message || error.message || "No message returned",
      });
    }
  };
};


export const updateCategory = (category) => {
    return async (dispatch) => {
      try {
        const response = await apiClient.post(`updateCategory`, category);
        const message = response.data.message;

        if (response.data.success) {
        dispatch({
          type: UPDATE_CATEGORY_SUCCESS,
          payload: response.data.categoryUpdate,
          message: message,
        });
      } else {
        throw new Error(message);
    }
      } catch (error) {
        dispatch({
          type: UPDATE_CATEGORY_ERROR,
          payload: error.response?.data?.message || error.message || "No message returned",
        });
      }
    };
  };
  
  
export const deleteCategory = (categoryId) => {
  return async (dispatch) => {
      try {
          const response = await apiClient.post(`deleteCategory`, { categoryId });
          const message = response.data.message; 
          if (response.data.success) {
          dispatch({
              type: DELETE_CATEGORY_SUCCESS,
              payload: categoryId,
              message: message,
          });
        } else {
          throw new Error(message);
      }
      } catch (error) {
          dispatch({
              type: DELETE_CATEGORY_ERROR,
              payload: error.response?.data?.message || error.message || "No message returned",
          });
      }
  };
};