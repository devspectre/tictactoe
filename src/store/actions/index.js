import * as types from './ActionTypes';

export function setPlayerName(player1name, player2name) {
    return {
        type: types.SET_PLAYER_NAME,
        player1name,
        player2name
    };
}

export function addCreditName(credit_name) {
    return {
        type: types.ADD_CREDIT_NAME,
        credit_name,
    };
}