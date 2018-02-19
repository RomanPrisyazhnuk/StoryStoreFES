import api from 'configApi/apiResources';
import { getHeadersState } from 'redux/selectors/entities/headersSelectors';
// import { updateHeadersClient } from './authenticate/headers';

export const UPDATE_LIKE_SUCCESS = 'UPDATE_LIKE_SUCCESS';
export const GET_LIKE = 'GET_LIKE';

export function updateLike (likedId, likedType) {
    return (dispatch, getState) => {
        return api.likes.updateLike(likedId, likedType, getHeadersState(getState()))
            .then(({data, headers}) => {
                if (data && headers) {
                    // dispatch(updateHeadersClient(headers));
                    dispatch(updateLikeSuccess({
                        likedId,
                        likedType,
                        count: data.count_likes,
                        liked: data.liked
                    }));
                }
            });
    };
}

export function getLikeUsers (gameId, likedType) {
    return (dispatch, getState) => {
        return api.likes.getLikeNames(gameId, likedType, getHeadersState(getState()))
            .then(({data, headers}) => {
                if (data && headers) {
                    // dispatch(updateHeadersClient(headers));
                    return Promise.resolve(data);
                }
            });
    };
}

export function updateLikeSuccess (data) {
    return {type: UPDATE_LIKE_SUCCESS, payload: data};
}

export function getLike (data) {
    return {type: GET_LIKE, payload: data};
}
