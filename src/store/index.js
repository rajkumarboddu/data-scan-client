import { createStore } from "redux";

import rootReducer from "./reducers/index";

const userInfo = localStorage.getItem("userInfo");
const iniitialState = userInfo
  ? {
      user: {
        ...JSON.parse(userInfo),
      },
    }
  : {};

export default createStore(
  rootReducer,
  iniitialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
