import _ from 'lodash';
import { createSelector } from 'reselect';
// selector
const getProfileState = (state) => state.entities.profile;
const getUsersStatus = (state) => state.entities.usersStatus;
// reselect function
const getFollowersState = createSelector(
    [ getProfileState ],
    (profile) => profile.followers
);
const getFollowingsState = createSelector(
    [ getProfileState ],
    (profile) => profile.followings
);

export const getFollowersHasMoreState = createSelector(
    [ getFollowersState ],
    (followers) => followers.hasMore
);
export const getFollowersUsersState = createSelector(
    [ getFollowersState ],
    (followers) => followers.users
);
export const getFollowersCountState = createSelector(
    [ getProfileState ],
    (profile) => profile.followersCount
);

export const getFollowingsUsersState = createSelector(
    [ getFollowingsState ],
    (followings) => followings.users
);
export const getFollowingsHasMoreState = createSelector(
    [ getFollowingsState ],
    (followings) => followings.hasMore
);
export const getFollowingsCountState = createSelector(
    [ getProfileState ],
    (profile) => profile.followingsCount
);

export const getUserInfoProfileState = createSelector(
    [ getProfileState ],
    (profile) => profile.userInfo
);

export const getUserInfoProfileId = createSelector(
    [ getUserInfoProfileState ],
    (userInfo) => userInfo.id
);

export const getProfileUserAvatarSmallState = createSelector(
    [ getUserInfoProfileState ],
    (userInfo) => userInfo.image_small
);
export const getProfileUserAvatarMediumState = createSelector(
    [ getUserInfoProfileState ],
    (userInfo) => userInfo.image_medium
);

export const getUserInfoStatusOnline = createSelector(
    getUsersStatus,
    getUserInfoProfileId,
    (usersStatus, userId) => usersStatus[userId] ? usersStatus[userId].online : false
);

export const getUserInfoLastedAt = createSelector(
    getUsersStatus,
    getUserInfoProfileId,
    (usersStatus, userId) => usersStatus[userId] ? usersStatus[userId].lastedAt : null
);

export const getLastFollowerCreatedAtState = (state) => {
    const allFollowers = getFollowersUsersState(state);
    const lastFollowersKey = _.findLastKey(allFollowers);
    const lastFollower = allFollowers[lastFollowersKey];
    return lastFollower ? lastFollower.follows_created_at : '';
};

export const getLastFollowingCreatedAtState = (state) => {
    const allFollowings = getFollowingsUsersState(state);
    const lastFollowingsKey = _.findLastKey(allFollowings);
    const lastFollowing = allFollowings[lastFollowingsKey];
    return lastFollowing ? lastFollowing.follows_created_at : '';
};
