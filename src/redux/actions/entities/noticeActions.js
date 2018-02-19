import { getCurrentUserIdState, getCurrentUserInfoState } from 'redux/selectors/entities/userSelectors';
import api from 'configApi/apiResources';
import { getHeadersState } from 'redux/selectors/entities/headersSelectors';
import { getLastNoticeCreatedAtState } from 'redux/selectors/entities/noticeSelectors';
// import { updateHeadersClient } from './authenticate/headers';

export const GET_NOTIFICATIONS_SUCCESS = 'GET_NOTIFICATIONS_SUCCESS';
export const GET_NOTICE_SUCCESS = 'GET_NOTICE_SUCCESS';
export const DELETE_NOTICE_SUCCESS = 'DELETE_NOTICE_SUCCESS';
export const CHECK_NOTIFICATIONS_SUCCESS = 'CHECK_NOTIFICATIONS_SUCCESS';
export const DELETE_NOTIFICATIONS_SUCCESS = 'DELETE_NOTIFICATIONS_SUCCESS';
export const ACCEPT_COLLABORATOR_SUCCESS = 'ACCEPT_COLLABORATOR_SUCCESS';
export const DECLINE_COLLABORATOR_SUCCESS = 'DECLINE_COLLABORATOR_SUCCESS';
export const ACCEPT_MEMBER_GROUP_SUCCESS = 'ACCEPT_MEMBER_GROUP_SUCCESS';
export const ACCEPT_MEMBER_COMPANY_SUCCESS = 'ACCEPT_MEMBER_COMPANY_SUCCESS';
export const DECLINE_MEMBER_GROUP_SUCCESS = 'DECLINE_MEMBER_GROUP_SUCCESS';
export const DECLINE_MEMBER_COMPANY_SUCCESS = 'DECLINE_MEMBER_COMPANY_SUCCESS';

export function getNotifications () {
    return (dispatch, getState) => {
        const lastCreatedAt = getLastNoticeCreatedAtState(getState());
        return api.notice.getNotifications(lastCreatedAt, getHeadersState(getState()))
            .then(({data, headers}) => {
                if (data && headers) {
                    // dispatch(updateHeadersClient(headers));
                    let flag = false;
                    if (data.notifications.length > 9) {
                        flag = true;
                    }
                    dispatch(getNotificationsSuccess(data, flag));
                }
            });
    };
}

export function checkNotifications () {
    return (dispatch, getState) => {
        return api.notice.checkNotifications(getHeadersState(getState()))
            .then(({headers}) => {
                if (headers) {
                    // dispatch(updateHeadersClient(headers));
                    dispatch(checkNotificationsSuccess());
                }
            });
    };
}

export function deleteNotification (noticeId) {
    return (dispatch, getState) => {
        return api.notice.deleteNotifications(noticeId, getHeadersState(getState()))
            .then(({headers}) => {
                if (headers) {
                    // dispatch(updateHeadersClient(headers));
                    dispatch(deleteNotificationSuccess(noticeId));
                }
            });
    };
}

export function acceptCollaborator (gameId) {
    return (dispatch, getState) => {
        return api.notice.acceptCollaborator({game_id: gameId}, getHeadersState(getState()))
            .then(({headers}) => {
                if (headers) {
                    const currentUserId = getCurrentUserIdState(getState());
                    // dispatch(updateHeadersClient(headers));
                    dispatch(acceptCollaboratorSuccess({gameId, currentUserId}));
                }
            });
    };
}

export function declineCollaboration (gameId) {
    return (dispatch, getState) => {
        return api.notice.declineCollaboration({game_id: gameId}, getHeadersState(getState()))
            .then(({headers}) => {
                if (headers) {
                    const currentUserId = getCurrentUserIdState(getState());
                    // dispatch(updateHeadersClient(headers));
                    dispatch(declineCollaborationSuccess({gameId, currentUserId}));
                }
            });
    };
}

export function acceptGroupMember (groupId) {
    return (dispatch, getState) => {
        return api.notice.acceptGroupMember({group_id: groupId}, getHeadersState(getState()))
            .then(({headers}) => {
                if (headers) {
                    const userInfo = getCurrentUserInfoState(getState());
                    const currentUser = {
                        id: userInfo.id,
                        image: userInfo.image,
                        role: 'user',
                        name: userInfo.name
                    };
                    // dispatch(updateHeadersClient(headers));
                    dispatch(acceptMemberGroupSuccess({groupId, currentUser}));
                }
            });
    };
}

export function declineGroupMember (groupId) {
    return (dispatch, getState) => {
        return api.notice.declineGroupMember({group_id: groupId}, getHeadersState(getState()))
            .then(({headers}) => {
                if (headers) {
                    const currentUserId = getCurrentUserIdState(getState());
                    // dispatch(updateHeadersClient(headers));
                    dispatch(declineMemberGroupSuccess({groupId, currentUserId}));
                }
            });
    };
}

export function getNotificationsSuccess (data, hasMore) {
    return {type: GET_NOTIFICATIONS_SUCCESS, payload: data, hasMore};
}
export function getNoticeSuccess (data) {
    return {type: GET_NOTICE_SUCCESS, payload: data};
}
export function deleteNoticeSuccess (data) {
    return {type: DELETE_NOTICE_SUCCESS, payload: data};
}
export function checkNotificationsSuccess () {
    return {type: CHECK_NOTIFICATIONS_SUCCESS};
}
export function deleteNotificationSuccess (data) {
    return {type: DELETE_NOTIFICATIONS_SUCCESS, payload: data};
}
export function acceptCollaboratorSuccess (data) {
    return {type: ACCEPT_COLLABORATOR_SUCCESS, payload: data};
}
export function declineCollaborationSuccess (data) {
    return {type: DECLINE_COLLABORATOR_SUCCESS, payload: data};
}
export function acceptMemberGroupSuccess (data) {
    return {type: ACCEPT_MEMBER_GROUP_SUCCESS, payload: data};
}
export function declineMemberGroupSuccess (data) {
    return {type: DECLINE_MEMBER_GROUP_SUCCESS, payload: data};
}
