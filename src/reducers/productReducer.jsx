import {
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR,

  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_ERROR,

  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,

  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,

  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,



} from "../actions/productAction";

const initialState = {
  products: [],
  productById: null,
  message: "",
  error: "",
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_PRODUCT_SUCCESS:
      return {
        ...state, //créer une copie de l'état existant
        products: action.payload, // Mise à jour de l'état avec les données des produits
        message: action.message,
        error: "",
      };

    case GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        productById: action.payload,
        message: action.message,
        error: "",
      };

    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        products: [...state.products, action.payload], // créer un nouveau tableau qui inclut tous les éléments du tableau existant (state.products) et ajoute de nouveaux éléments (action.payload).
        message: action.message,
        error: "",
      };

    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state, // copie toutes les propriétés de l'état existant dans le nouvel objet état. garantit que toutes les autres propriétés de l'état restent inchangées.
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ), // si l'id du produit correspond à celui de action.payload, je remplace ce produit par action.payload (le produit mis à jour). sinon, je garde le produit original
        message: action.message,
        error: "",
      };

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter( // filter() est utilisée pour créer un nouveau tableau contenant uniquement les éléments qui remplissent une certaine condition.
          (product) => product.id !== action.payload // Si l'id du produit est différent de action.payload, le produit est conservé dans le nouveau tableau. Sinon, il est filtré (supprimé) du tableau
        ),
        message: "Product deleted successfully",
        error: "",
      };

      case GET_PRODUCT_ERROR:
        case GET_PRODUCT_BY_ID_ERROR:
        case ADD_PRODUCT_ERROR:
        case UPDATE_PRODUCT_ERROR:
        case DELETE_PRODUCT_ERROR:
          return {
            ...state,
            message: "",
            error: action.payload,
          };

    default:
      return state;
  }
};

export default productReducer;
