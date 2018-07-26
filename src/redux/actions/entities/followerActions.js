import { getLastFollowerCreatedAtState, getLastFollowingCreatedAtState} from 'redux/selectors/entities/profileSelectors';
import _ from 'lodash';
import api from 'configApi/apiResources';
import { getCurrentUserInfoState } from 'redux/selectors/entities/userSelectors';
import { getHeadersState } from 'redux/selectors/entities/headersSelectors';
// import { updateHeadersClient } from './authenticate/headers';

export const GET_FOLLOWERS_REQUEST = 'GET_FOLLOWERS_REQUEST';
export const GET_FOLLOWINGS_REQUEST = 'GET_FOLLOWINGS_REQUEST';
export const GET_FOLLOWERS_SUCCESS = 'GET_FOLLOWERS_SUCCESS';
export const GET_FOLLOWINGS_SUCCESS = 'GET_FOLLOWINGS_SUCCESS';
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS';

export function getFollowers (userId) {
    return (dispatch, getState) => {
        const lastCreatedAt = getLastFollowerCreatedAtState(getState());
        dispatch(getFollowerRequest());
        return api.followers.getFollowers(userId, {last_created_at: lastCreatedAt}, getHeadersState(getState()))
            .then(({data, headers}) => {
                if (data && headers) {
                    // dispatch(updateHeadersClient(headers));
                    dispatch(getFollowersSuccess(data));
                }
            });
    };
}
export function getFollowings (userId) {
    return (dispatch, getState) => {
        const lastCreatedAt = getLastFollowingCreatedAtState(getState());
        dispatch(getFollowingsRequest());
        return api.followers.getFollowings(userId, {last_created_at: lastCreatedAt}, getHeadersState(getState()))
            .then(({data, headers}) => {
                if (data && headers) {
                    // dispatch(updateHeadersClient(headers));
                    dispatch(getFollowingsSuccess(data));
                }
            });
    };
}

export function followUser (followId, userPageId) {
    return (dispatch, getState) => {
        return api.followers.followUser(followId, getHeadersState(getState()))
            .then(({data, headers}) => {
                if (headers) {
                    const currentUser = getCurrentUserInfoState(getState());
                    // dispatch(updateHeadersClient(headers));
                    if (_.isEmpty(data.follow)) {
                        dispatch(unFollowUserSuccess(followId, userPageId, currentUser));
                    } else {
                        dispatch(followUserSuccess(data.follow, followId, userPageId, currentUser));
                    }
                }
            });
    };
}
function getFollowerRequest () {
    return {type: GET_FOLLOWERS_REQUEST};
}
function getFollowingsRequest () {
    return {type: GET_FOLLOWINGS_REQUEST};
}
function getFollowersSuccess (data) {
    return {type: GET_FOLLOWERS_SUCCESS, payload: data };
}
function getFollowingsSuccess (data) {
    return {type: GET_FOLLOWINGS_SUCCESS, payload: data };
}
function followUserSuccess (data, followId, userPageId, currentUser) {
    return {type: FOLLOW_USER_SUCCESS, payload: data, followId, userPageId, currentUser };
}
function unFollowUserSuccess (followId, userPageId, currentUser) {
    return {type: UNFOLLOW_USER_SUCCESS, followId, userPageId, currentUser};
}
