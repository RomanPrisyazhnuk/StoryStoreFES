import { UPDATE_LIKE_SUCCESS, GET_LIKE } from 'redux/actions/entities/likesActions';
import _ from 'lodash';
import { CLEAR_STORE } from 'redux/actions/entities/clearStoreActions';
import { DELETE_GAME_SUCCESS } from 'redux/actions/entities/gamesActions';
import { SIGN_OUT_SUCCESS } from 'redux/constansActions';

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
    case GET_LIKE:
        return {...state, [action.payload.likedId]: action.payload};
    case UPDATE_LIKE_SUCCESS:
        return {...state, [action.payload.likedId]: action.payload};
    case DELETE_GAME_SUCCESS:
        return _.omit(state, action.payload);
    case CLEAR_STORE:
        return initialState;
    case SIGN_OUT_SUCCESS:
        return initialState;
    default:
        return state;
    }
}
