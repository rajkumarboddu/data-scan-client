import actionTypes from "../actions/actionTypes";

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
