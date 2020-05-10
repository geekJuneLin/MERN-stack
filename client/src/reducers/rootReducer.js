import {
  DELETE_SHOPPING_ITEM,
  ADD_SHOPPING_ITEM,
  ITEMS_LOADING,
  GET_SHOPPING_ITEMS,
} from "../actions/types";

const initialState = {
  items: [],
  loading: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SHOPPING_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case ADD_SHOPPING_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case DELETE_SHOPPING_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default rootReducer;
