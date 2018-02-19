import { combineReducers } from 'redux';
import modalsReducer from './modalsReducer';
import notificationReducer from './notificationReducer';
import pageNotFoundReducer from './pageNotFoundReducer';

export default combineReducers({
    notification: notificationReducer,
    modals: modalsReducer,
    pageNotFound: pageNotFoundReducer
});
