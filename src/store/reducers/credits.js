import * as types from "../actions/ActionTypes";

const initialState = {
  list: [],
};

export default function players(state = initialState, action) {
  if (action.type === types.ADD_CREDIT_NAME) {
    return {
      ...state,
      list: [...state.list, action.credit_name],
    };
  } else if (action.type === types.INIT_CREDIT_LIST) {
    return {
      ...state,
      list: [],
    };
  } else {
    return state;
  }
}