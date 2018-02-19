import _ from 'lodash';
import api from 'configApi/apiResources';
import { getHeadersState } from 'redux/selectors/entities/headersSelectors';
import { getLastGameCreatedAtState } from 'redux/selectors/entities/gamesSelectors';
import { getLike } from './likesActions';
import { pageNotFound } from 'redux/actions/ui/pageNotFoundActions';
import { showNotification } from 'redux/actions/ui/notificationActions';
// import { updateHeadersClient } from './authenticate/headers';
// import { updateUsersStatus } from './usersStatusActions';
import { webSocketClient } from 'webSocketClient';

export const GET_GAME_REQUEST = 'GET_GAME_REQUEST';
export const GET_GAMES_SUCCESS = 'GET_GAMES_SUCCESS';
export const CREATE_GAME_SUCCESS = 'CREATE_GAME_SUCCESS';
export const DELETE_GAME_SUCCESS = 'DELETE_GAME_SUCCESS';
export const UPDATE_GAME_SUCCESS = 'UPDATE_GAME_SUCCESS';
export const FOLLOWER_GAME_CREATED = 'FOLLOWER_GAME_CREATED';
export const GET_FOLLOWERS_GAMES_SUCCESS = 'GET_FOLLOWERS_GAMES_SUCCESS';

export function getGames (gamesType) {
    return (dispatch, getState) => {
        dispatch(getGamesRequest());
        const lastCreatedAt = getLastGameCreatedAtState(getState());
        let params;
        if (gamesType) {
            const typeGame = Object.keys(gamesType)[0];
            const typeId = Object.values(gamesType)[0];
            params = {[typeGame]: typeId, last_created_at: lastCreatedAt};
        } else {
            params = {last_created_at: lastCreatedAt};
        }
        return api.games.getGames(params, getHeadersState(getState()))
            .then(({data, headers}) => {
                if (data && headers) {
                    // dispatch(updateHeadersClient(headers));
                    _.forEach(data.games, game => {
                        webSocketClient.subscribeGameChannel(game.id);
                        webSocketClient.subscribeGameChannel(game.user_id);
                        dispatch(getLike({
                            likedId: game.id,
                            likedType: 'Game',
                            count: game.likes_count,
                            liked: game.liked
                        }));
                        // dispatch(updateUsersStatus(game.user_id, game.status_user));
                    });
                    dispatch(getGamesSuccess(data.games, data.hasMore, data.sort, data.settingFeed));
                }
            });
    };
}

export function getGame (gameId) {
    return (dispatch, getState) => {
        return api.games.getGame(gameId, getHeadersState(getState()))
            .then(({data, headers}) => {
                if (data && headers) {
                    // dispatch(updateHeadersClient(headers));
                    dispatch(getLike({
                        likedId: data.game.id,
                        likedType: 'Game',
                        count: data.game.likes_count,
                        liked: data.game.liked
                    }));
                    // dispatch(updateUsersStatus(data.game.user_id, data.game.status_user));
                    return Promise.resolve(data.game);
                } else {
                    dispatch(pageNotFound());
                }
            });
    };
}

export function getFollowersGame (gameIds) {
    return (dispatch, getState) => {
        const params = {games_ids: gameIds};
        return api.games.getGames(params, getHeadersState(getState()))
            .then(({data, headers}) => {
                if (data && headers) {
                    // dispatch(updateHeadersClient(headers));
                    _.forEach(data.games, game => {
                        webSocketClient.subscribeGameChannel(game.id);
                        webSocketClient.subscribeGameChannel(game.user_id);
                        dispatch(getLike({
                            likedId: game.id,
                            likedType: 'Game',
                            count: game.likes_count,
                            liked: game.liked
                        }));
                        // dispatch(updateUsersStatus(game.user_id, game.status_user));
                    });
                    dispatch(getFollowersGamesSuccess(data.games));
                }
            });
    };
}

export function getMetaFromGameServer (baseUrl, gameId, headers) {
    return api.games.getMetaFromGameServer(gameId, {headers})
        .then(({data, error}) => {
            if (data) {
                let title = 'StoryStore';
                const ogUrl = `${baseUrl}games/${data.game.id}`;
                let ogTitle = '';
                let ogDescription = '';
                let ogImage = '';
                let ogVideoUrl = '';
                if (data.game.quote) {
                    title = `${data.game.quote} | InvestArena`;
                } else {
                    title = 'StoryStore';
                }
                if (data.game.market !== 'Simple') {
                    ogTitle = `${data.game.author_name}: ${data.game.quote} @ ${data.game.price} ! | StoryStore`;
                } else {
                    ogTitle = 'StoryStore';
                }
                if (data.game.content && data.game.content.length < 100) {
                    ogDescription = data.game.content;
                } else if (data.game.content && data.game.content.length >= 100) {
                    ogDescription = `${data.game.content.substring(0, 100)}...`;
                }
                if (data.game.image) {
                    ogImage = data.game.image;
                } else if (!data.game.image && data.game.meta && data.game.meta.meta_image) {
                    ogImage = data.game.meta.meta_image;
                }
                if (data.game.meta && data.game.meta.meta_video) {
                    ogVideoUrl = data.game.meta.meta_video;
                }
                return Promise.resolve({title, ogUrl, ogTitle, ogDescription, ogImage, ogVideoUrl});
            } else {
                return Promise.resolve({error});
            }
        });
}

export function createGame (data) {
    return (dispatch, getState) => {
        return api.games.createGame(data, getHeadersState(getState()))
            .then(({data, headers, error}) => {
                if (data && headers) {
                    // dispatch(updateHeadersClient(headers));
                    dispatch(getLike({likedId: data.game.id, likedType: 'Game', count: 0, liked: false }));
                    dispatch(createGameSuccess(data.game));
                    webSocketClient.subscribeGameChannel(data.game.id);
                    webSocketClient.subscribeGameChannel(data.game.user_id);
                } else {
                    dispatch(showNotification({status: 'error', message: error.toString()}));
                }
            });
    };
}

export function deleteGame (gameId) {
    return (dispatch, getState) => {
        return api.games.deleteGame(gameId, getHeadersState(getState()))
            .then(({headers, error}) => {
                if (headers) {
                    // dispatch(updateHeadersClient(headers));
                    dispatch(deleteGameSuccess(gameId));
                } else {
                    dispatch(showNotification({status: 'error', message: error.toString()}));
                }
            });
    };
}

export function updateGame (gameId, data) {
    return (dispatch, getState) => {
        return api.games.updateGame(gameId, data, getHeadersState(getState()))
            .then(({data, headers, error}) => {
                if (data && headers) {
                    // dispatch(updateHeadersClient(headers));
                    dispatch(updateGameSuccess(data.game));
                } else {
                    dispatch(showNotification({ status: 'error', message: error.toString() }));
                }
            });
    };
}

export function getGamesRequest () {
    return { type: GET_GAME_REQUEST };
}

export function followersGameEnabled (data) {
    return { type: FOLLOWER_GAME_CREATED, payload: data };
}

export function getGamesSuccess (data, hasMore, sort, settingFeed) {
    return { type: GET_GAMES_SUCCESS, payload: data, hasMore, sort, settingFeed };
}
export function getFollowersGamesSuccess (data) {
    return { type: GET_FOLLOWERS_GAMES_SUCCESS, payload: data };
}
export function createGameSuccess (data) {
    return { type: CREATE_GAME_SUCCESS, payload: data };
}

export function deleteGameSuccess (gameId) {
    return { type: DELETE_GAME_SUCCESS, payload: gameId };
}

export function updateGameSuccess (data) {
    return { type: UPDATE_GAME_SUCCESS, payload: data };
}
