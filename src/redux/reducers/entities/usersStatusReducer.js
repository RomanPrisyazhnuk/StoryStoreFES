import { GET_USER_STATUS } from 'redux/actions/entities/usersStatusActions';

const initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {
    case GET_USER_STATUS:
        return {...state, [action.userId]: { online: action.status.online, lastedAt: action.status.lasted_at }};
    default:
        return state;
    }
}
