import { getCurrentUserIdState, getCurrentUserInfoState } from 'redux/selectors/entities/userSelectors';
// import { getFollowers, getFollowings } from './followerActions';
import api from 'configApi/apiResources';
import { getGames } from './gamesActions';
import { getHeadersState } from 'redux/selectors/entities/headersSelectors';
import { getLanguageState } from 'redux/selectors/entities/languageSelectors';
import locales from 'locales';
import { pageNotFound } from 'redux/actions/ui/pageNotFoundActions';
import { showNotification } from 'redux/actions/ui/notificationActions';
// import { updateHeadersClient } from './authenticate/headers';

export const GET_USER_SETTINGS_SUCCESS = 'GET_USER_SETTINGS_SUCCESS';
export const GET_USER_PROFILE_SUCCESS = 'GET_USER_PROFILE_SUCCESS';
export const UPDATE_SETTINGS_REQUEST = 'UPDATE_SETTINGS_REQUEST';
export const UPDATE_SETTINGS_SUCCESS = 'UPDATE_SETTINGS_SUCCESS';
export const UPDATE_SETTINGS_ERROR = 'UPDATE_SETTINGS_ERROR';
export const UPDATE_AVATAR_SUCCESS = 'UPDATE_AVATAR_SUCCESS';
export const UPDATE_BACKGROUND_SUCCESS = 'UPDATE_BACKGROUND_SUCCESS';
export const UPDATE_PRIVACY_SUCCESS = 'UPDATE_PRIVACY_SUCCESS';
export const UPDATE_CONFIDENTIALITY_SUCCESS = 'UPDATE_PRIVACY_SUCCESS';
export const UPDATE_NICKNAME_SUCCESS = 'UPDATE_NICKNAME_SUCCESS';
export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
export const UPDATE_ASSETS_SUCCESS = 'UPDATE_ASSETS_SUCCESS';
export const UPDATE_LANGUAGES_SUCCESS = 'UPDATE_LANGUAGES_SUCCESS';
export const CHANGE_VIEW_MODE_SUCCESS = 'CHANGE_VIEW_MODE_SUCCESS';

export function getUserSettings (userId) {
    return (dispatch, getState) => {
        return api.users.getUser(userId, getHeadersState(getState()))
            .then(({data, headers}) => {
                if (data && headers) {
                    // dispatch(updateHeadersClient(headers));
                    if (getCurrentUserIdState(getState()) === data.user_info.id) {
                        dispatch(getUserSettingsSuccess(data.user_info));
                    }
                }
            });
    };
}

export function getUserProfile (userId) {
    return (dispatch, getState) => {
        return api.users.getUser(userId, getHeadersState(getState()))
            .then(({data, headers}) => {
                if (data && headers) {
                    // dispatch(updateHeadersClient(headers));
                    dispatch(getUserProfileSuccess(data.user_info));
                    // dispatch(getFollowers(userId));
                    // dispatch(getFollowings(userId));
                } else {
                    dispatch(pageNotFound());
                }
            });
    };
}

export function getUserPreview (userId) {
    return (dispatch, getState) => {
        return api.users.getUser(userId, getHeadersState(getState()))
            .then(({data, headers}) => {
                if (data && headers) {
                    // dispatch(updateHeadersClient(headers));
                    return Promise.resolve(data.user_info);
                }
            });
    };
}

export function updateUserSettings (data) {
    return (dispatch, getState) => {
        dispatch(updateSettingsRequest());
        return api.users.updateUserSettings(data, getHeadersState(getState()))
            .then(({data, headers, error}) => {
                if (data && headers) {
                    // dispatch(updateHeadersClient(headers));
                    dispatch(updateSettingsSuccess(data.user));
                    dispatch(showNotification({status: 'success',
                        message: locales[getLanguageState(getState())].messages['action.updatedSuccess']}));
                } else {
                    dispatch(updateSettingsError());
                    dispatch(showNotification({status: 'error', message: error.toString()}));
                }
            });
    };
}

export function updateFieldsPrivacy (data) {
    return (dispatch, getState) => {
        dispatch(updateSettingsRequest());
        return api.users.updateFieldsPrivacy(data, getHeadersState(getState()))
            .then(({headers, error}) => {
                if (headers) {
                    // dispatch(updateHeadersClient(headers));
                    dispatch(updatePrivacySuccess(data.user));
                    dispatch(showNotification({status: 'success',
                        message: locales[getLanguageState(getState())].messages['action.updatedSuccess']}));
                } else {
                    dispatch(updateSettingsError());
                    dispatch(showNotification({status: 'error', message: error.toString() }));
                }
            });
    };
}

export function updateFieldsConfidentiality (data) {
    return (dispatch, getState) => {
        dispatch(updateSettingsRequest());
        return api.users.updateFieldsConfidentiality(data, getHeadersState(getState()))
            .then(({headers, error}) => {
                if (headers) {
                    // dispatch(updateHeadersClient(headers));
                    dispatch(updateConfidentialitySuccess(data.user));
                    dispatch(showNotification({status: 'success',
                        message: locales[getLanguageState(getState())].messages['action.updatedSuccess']}));
                } else {
                    dispatch(updateSettingsError());
                    dispatch(showNotification({status: 'error', message: error.toString() }));
                }
            });
    };
}

export function updateUserPassword (data) {
    return (dispatch, getState) => {
        dispatch(updateSettingsRequest());
        return api.users.updateUserPassword(data, getHeadersState(getState()))
            .then(({headers, error}) => {
                if (headers) {
                    // dispatch(updateHeadersClient(headers));
                    dispatch(updatePasswordSuccess());
                    dispatch(showNotification({status: 'success',
                        message: locales[getLanguageState(getState())].messages['action.updatedSuccess']}));
                } else {
                    dispatch(updateSettingsError());
                    dispatch(showNotification({status: 'error', message: error }));
                }
            });
    };
}

export function updateUserAvatar (data) {
    return (dispatch, getState) => {
        dispatch(updateSettingsRequest());
        return api.users.updateUserAvatar(data, getHeadersState(getState()))
            .then(({data, headers, error}) => {
                if (data && headers) {
                    // dispatch(updateHeadersClient(headers));
                    if (data.image || data.image === null) {
                        dispatch(updateAvatarSuccess(data));
                    } else {
                        dispatch(updateBackgroundSuccess(data.background_image));
                    }
                    dispatch(showNotification({status: 'success',
                        message: locales[getLanguageState(getState())].messages['action.updatedSuccess']}));
                } else {
                    dispatch(showNotification({status: 'error', message: error.toString()}));
                }
            });
    };
}

export function updateUserNickname (data) {
    return (dispatch, getState) => {
        dispatch(updateSettingsRequest());
        return api.users.updateUserNickname(data, getHeadersState(getState()))
            .then(({headers, error}) => {
                if (headers) {
                    if (data.is_nickname) {
                        data.name = data.nickname;
                    } else {
                        const currentUserInfo = getCurrentUserInfoState(getState());
                        data.name = `${currentUserInfo.first_name} ${currentUserInfo.last_name}`;
                    }
                    // dispatch(updateHeadersClient(headers));
                    dispatch(updateNicknameSuccess(data));
                    dispatch(showNotification({status: 'success',
                        message: locales[getLanguageState(getState())].messages['action.updatedSuccess']}));
                } else {
                    dispatch(showNotification({status: 'error', message: error.toString()}));
                }
            });
    };
}

export function changeViewMode (data) {
    return (dispatch, getState) => {
        return api.users.changeViewMode(data, getHeadersState(getState()))
            .then(({headers, error}) => {
                if (headers) {
                    // dispatch(updateHeadersClient(headers));
                    dispatch(changeViewModeSuccess(data));
                } else {
                    dispatch(showNotification({status: 'error', message: error.toString()}));
                }
            });
    };
}

export function updateAssets (data) {
    return (dispatch, getState) => {
        return api.users.changeMarketsFilters(data, getHeadersState(getState()))
            .then(({headers, error}) => {
                if (headers) {
                    dispatch(updateAssetsSuccess(data));
                    // dispatch(updateHeadersClient(headers));
                    dispatch(getGames());
                } else {
                    dispatch(showNotification({status: 'error', message: error.toString()}));
                }
            });
    };
}

export function updateLanguages (data) {
    return (dispatch, getState) => {
        return api.users.changeLanguageFilters(data, getHeadersState(getState()))
            .then(({headers, error}) => {
                if (headers) {
                    dispatch(updateLanguagesSuccess(data));
                    // dispatch(updateHeadersClient(headers));
                    dispatch(getGames());
                } else {
                    dispatch(showNotification({status: 'error', message: error.toString()}));
                }
            });
    };
}

export function searchUsers (data) {
    return (dispatch, getState) => {
        return api.users.searchUsers(data, getHeadersState(getState()))
            .then(({data, headers}) => {
                if (data && headers) {
                    // dispatch(updateHeadersClient(headers));
                    return Promise.resolve(data.users);
                }
            });
    };
}

export function updateSettingsRequest () {
    return { type: UPDATE_SETTINGS_REQUEST };
}

export function updateSettingsError () {
    return { type: UPDATE_SETTINGS_ERROR };
}

export function getUserSettingsSuccess (data) {
    return { type: GET_USER_SETTINGS_SUCCESS, payload: data };
}

export function getUserProfileSuccess (data) {
    return { type: GET_USER_PROFILE_SUCCESS, payload: data };
}

export function updateSettingsSuccess (data) {
    return { type: UPDATE_SETTINGS_SUCCESS, payload: data };
}

export function updatePasswordSuccess () {
    return { type: UPDATE_PASSWORD_SUCCESS, payload: {} };
}

export function updateNicknameSuccess (data) {
    return { type: UPDATE_NICKNAME_SUCCESS, payload: data };
}

export function updatePrivacySuccess (data) {
    return { type: UPDATE_PRIVACY_SUCCESS, payload: data };
}

export function updateAvatarSuccess (data) {
    return { type: UPDATE_AVATAR_SUCCESS, payload: data };
}

export function updateBackgroundSuccess (data) {
    return { type: UPDATE_BACKGROUND_SUCCESS, payload: data };
}

export function changeViewModeSuccess (data) {
    return { type: CHANGE_VIEW_MODE_SUCCESS, payload: data };
}

export function updateConfidentialitySuccess (data) {
    return { type: UPDATE_CONFIDENTIALITY_SUCCESS, payload: data };
}

export function updateAssetsSuccess (data) {
    return { type: UPDATE_ASSETS_SUCCESS, payload: data };
}

export function updateLanguagesSuccess (data) {
    return { type: UPDATE_LANGUAGES_SUCCESS, payload: data };
}
