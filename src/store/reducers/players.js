import * as types from "../actions/ActionTypes";

const initialState = {
  player1name: "",
  player2name: "",
  player_icon: "X",
};

export default function players(state = initialState, action) {
  if (action.type === types.SET_PLAYER_NAME) {
    return {
      ...state,
      player1name: action.player1name,
      player2name: action.player2name,
    };
  } else if (action.type === types.SET_PLAYER_ICON) {
    const player_icon = state.player_icon === "X" ? "O" : "X";
    return {
      ...state,
      player_icon: player_icon,
    };
  } else {
    return state;
  }
}