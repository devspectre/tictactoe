import * as types from '../actions/ActionTypes';

const initialState = {
    player1name: "",
    player2name: ""
};

export default function players(state = initialState, action) {
    if(action.type === types.SET_PLAYER_NAME) {
        return {
            ...state,
            player1name: action.player1name,
            player2name: action.player2name
        };
    } else {
        return state;
    }
}