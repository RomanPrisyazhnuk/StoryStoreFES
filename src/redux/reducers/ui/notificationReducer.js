import { SHOW_NOTIFICATION, CLEAR_NOTIFICATION } from 'redux/actions/ui/notificationActions';

const initialState = { status: null, message: '' };

export default function (state = initialState, action) {
    switch (action.type) {
    case SHOW_NOTIFICATION:
        return action.payload;
    case CLEAR_NOTIFICATION:
        return initialState;
    default:
        return state;
    }
}
