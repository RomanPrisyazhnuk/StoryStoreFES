import { GET_NOTIFICATIONS_SUCCESS,
    GET_NOTICE_SUCCESS,
    DELETE_NOTICE_SUCCESS,
    CHECK_NOTIFICATIONS_SUCCESS,
    DELETE_NOTIFICATIONS_SUCCESS,
    ACCEPT_COLLABORATOR_SUCCESS,
    DECLINE_COLLABORATOR_SUCCESS,
    ACCEPT_MEMBER_GROUP_SUCCESS,
    DECLINE_MEMBER_GROUP_SUCCESS,
    ACCEPT_MEMBER_COMPANY_SUCCESS,
    DECLINE_MEMBER_COMPANY_SUCCESS } from 'redux/actions/entities/noticeActions';
// import { SIGN_OUT_SUCCESS } from 'redux/actions/entities/authenticate/authenticate';
const initialState = {notifications: [], unreadCount: 0, hasMore: false};

export default function (state = initialState, action) {
    switch (action.type) {
    case GET_NOTIFICATIONS_SUCCESS:
        return {...state,
            notifications: [...state.notifications, ...action.payload.notifications],
            unreadCount: action.payload.unread_count,
            hasMore: action.hasMore};
    case GET_NOTICE_SUCCESS:
        return {...state,
            notifications: [action.payload, ...state.notifications],
            unreadCount: state.unreadCount + 1};
    case CHECK_NOTIFICATIONS_SUCCESS:
        return {...state, unreadCount: 0};
    case DELETE_NOTIFICATIONS_SUCCESS:
        return {...state,
            notifications: state.notifications.filter(notification => notification.id !== action.payload)};
    case DELETE_NOTICE_SUCCESS:
        return {...state,
            notifications: state.notifications.filter(notification => notification.id !== action.payload),
            unreadCount: state.unreadCount - 1};
    case DECLINE_COLLABORATOR_SUCCESS:
    case ACCEPT_COLLABORATOR_SUCCESS:
        return {...state,
            notifications: state.notifications.map(notification => notification.target_id === action.payload.gameId
                ? {...notification, content: {...notification.content, confirmed: true}}
                : notification)};
    case DECLINE_MEMBER_GROUP_SUCCESS:
    case ACCEPT_MEMBER_GROUP_SUCCESS:
        return {...state,
            notifications: state.notifications.map(notification => notification.target_id === action.payload.groupId
                ? {...notification, content: {...notification.content, confirmed: true}}
                : notification)};
    case ACCEPT_MEMBER_COMPANY_SUCCESS:
    case DECLINE_MEMBER_COMPANY_SUCCESS:
        return {...state,
            notifications: state.notifications.map(notification => notification.target_id === action.payload.companyId
                ? {...notification, content: {...notification.content, confirmed: true}}
                : notification)};
    // case SIGN_OUT_SUCCESS:
    //     return initialState;
    default:
        return state;
    }
}
