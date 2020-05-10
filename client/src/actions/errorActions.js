import { GET_ERROR, CLEAR_ERROR } from "./types";

export const returnError = (msg, status, id = null) => {
  return {
    type: GET_ERROR,
    payload: { msg, status, id },
  };
};

export const clearError = (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
