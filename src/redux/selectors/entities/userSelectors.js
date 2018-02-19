import { createSelector } from 'reselect';
// selector
const getUserState = (state) => state.entities.user;
// reselect function
export const getCurrentUserInfoState = createSelector(
    [ getUserState ],
    (user) => user.info
);
export const getIsSignInState = createSelector(
    [ getUserState ],
    (user) => user.isSignIn
);
export const getUserIsLoadingState = createSelector(
    [ getUserState ],
    (user) => user.isLoading
);
export const getCurrentUserSettingsState = createSelector(
    [ getUserState ],
    (user) => user.settings
);
export const getCurrentUserAssetsState = createSelector(
    [ getCurrentUserInfoState ],
    (info) => info.markets_filters
);
export const getCurrentUserLanguagesState = createSelector(
    [ getCurrentUserInfoState ],
    (info) => info.language_filters
);
export const getCurrentUserIdState = createSelector(
    [ getCurrentUserInfoState ],
    (info) => info.id
);
export const getAskModalState = createSelector(
    [ getCurrentUserInfoState ],
    (info) => info.ask_modal
);
export const getCurrentUserAvatarSmallState = createSelector(
    [ getCurrentUserInfoState ],
    (info) => info.image_small
);
export const getCurrentUserAvatarMediumState = createSelector(
    [ getCurrentUserInfoState ],
    (info) => info.image_medium
);
export const getCurrentUserAvatar = createSelector(
    [ getCurrentUserInfoState ],
    (info) => info.image
);
export const getCurrentUserBackGroundState = createSelector(
    [ getCurrentUserInfoState ],
    (info) => info.background_image
);
export const getCurrentUserNameState = createSelector(
    [ getCurrentUserInfoState ],
    (info) => info.name
);
export const getCurrentUserViewModeState = createSelector(
    [ getCurrentUserInfoState ],
    (info) => info.view_mode || 'full'
);
export const getCurrentUserProviderState = createSelector(
    [ getCurrentUserInfoState ],
    (info) => info.provider
);
export const getCurrentUserEmailState = createSelector(
    [ getCurrentUserInfoState ],
    (info) => info.email
);
