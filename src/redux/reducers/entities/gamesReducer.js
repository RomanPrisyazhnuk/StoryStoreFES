// import { ACCEPT_COLLABORATOR_SUCCESS,
//     DECLINE_COLLABORATOR_SUCCESS } from 'redux/actions/entities/noticeActions';
import { GET_GAME_REQUEST,
    GET_GAMES_SUCCESS,
    FOLLOWER_GAME_CREATED,
    GET_FOLLOWERS_GAMES_SUCCESS,
    CREATE_GAME_SUCCESS,
    DELETE_GAME_SUCCESS,
    UPDATE_GAME_SUCCESS } from 'redux/actions/entities/gamesActions';
import {UPDATE_LANGUAGES_SUCCESS,
    UPDATE_ASSETS_SUCCESS} from 'redux/actions/entities/userActions';
import { CLEAR_STORE } from 'redux/actions/entities/clearStoreActions';
import { SIGN_OUT_SUCCESS } from 'redux/constansActions';

const initialState = {sort: 'date', settingFeed: '', games: [], hasMore: false, newFollowersGames: []};

export default function (state = initialState, action) {
    switch (action.type) {
    case GET_GAME_REQUEST:
        return {...state, games: [...state.games], hasMore: false};
    case GET_GAMES_SUCCESS:
        return {...state, games: [...state.games, ...action.payload], hasMore: action.hasMore, sort: action.sort, settingFeed: action.settingFeed};
    case GET_FOLLOWERS_GAMES_SUCCESS:
        return {...state, games: [...action.payload, ...state.games], newFollowersGames: []};
    case CREATE_GAME_SUCCESS:
        return {...state, games: [action.payload, ...state.games]};
    case DELETE_GAME_SUCCESS:
        return {...state, games: state.games.filter(game => game.id !== action.payload)};
    case UPDATE_GAME_SUCCESS:
        return {...state, games: state.games.map(game => game.id === action.payload.id ? action.payload : game)};
    // case ACCEPT_COLLABORATOR_SUCCESS:
    //     return acceptCollaborator(state, action.payload);
    // case DECLINE_COLLABORATOR_SUCCESS:
    //     return declineCollaborator(state, action.payload);
    case FOLLOWER_GAME_CREATED:
        return {...state, newFollowersGames: [action.payload, ...state.newFollowersGames]};
    case UPDATE_LANGUAGES_SUCCESS:
    case UPDATE_ASSETS_SUCCESS:
    case CLEAR_STORE:
        return {...state, games: [], hasMore: false};
    case SIGN_OUT_SUCCESS:
        return initialState;
    default:
        return state;
    }
}

// function acceptCollaborator (state, payload) {
//     return {...state,
//         games: state.games.map(game => game.id === payload.gameId
//             ? {...game,
//                 collaborators: game.collaborators.map(collaborator => collaborator.id === payload.currentUserId
//                     ? {...collaborator, confirmed: true}
//                     : collaborator)}
//             : game)};
// }

// function declineCollaborator (state, payload) {
//     return {...state,
//         games: state.games.map(game => game.id === payload.gameId
//             ? {...game,
//                 collaborators: game.collaborators.filter(collaborator => collaborator.id !== payload.currentUserId)}
//             : game)};
// }
