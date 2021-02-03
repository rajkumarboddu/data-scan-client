/* eslint-disable import/no-anonymous-default-export */

import actionTypes from "./actionTypes";

const setUser = (userInfo) => {
  return {
    type: actionTypes.SET_USER,
    payload: userInfo,
  };
};

export { setUser };
