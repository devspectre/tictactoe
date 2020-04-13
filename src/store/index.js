import { createStore } from "redux";

import rootReducer from "./reducers";

const reduxStore = (initialState = {}) => {
  const store = createStore(rootReducer, initialState);

  return store;
};

const store = reduxStore();

export default store;
