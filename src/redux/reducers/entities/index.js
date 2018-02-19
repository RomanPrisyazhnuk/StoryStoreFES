import { combineReducers } from 'redux';
import gamesReducer from './gamesReducer';
import headersReducer from './headersReducer';
import likesReducer from './likesReducer';
import userReducer from './userReducer';
import usersStatusReducer from './userReducer';

export default combineReducers({
    user: userReducer,
    headers: headersReducer,
    likes: likesReducer,
    usersStatusReducer: usersStatusReducer,
    games: gamesReducer
});
