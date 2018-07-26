import { getCurrentUserIdState,
    getCurrentUserAvatarMediumState, getCurrentUserAvatar,
    getCurrentUserBackGroundState } from 'redux/selectors/entities/userSelectors';
import { getFollowersUsersState,
    getFollowingsUsersState,
    getFollowersCountState,
    getFollowingsCountState,
    getUserInfoProfileState,
    getUserInfoStatusOnline,
    getUserInfoLastedAt } from 'redux/selectors/entities/profileSelectors';
import { clearStore } from 'redux/actions/entities/clearStoreActions';
import { connect } from 'react-redux';
import { followUser } from 'redux/actions/entities/followerActions';
import {getAllJobs} from 'redux/actions/entities/jobsActions';
import {getJobs} from 'redux/selectors/entities/jobsSelectors';
import { getUserProfile } from 'redux/actions/entities/userActions';
import ProfilePage from './ProfilePage';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    image: PropTypes.string,
    imageMedium: PropTypes.string,
    jobs: PropTypes.object,
    backgroundImage: PropTypes.string,
    currentUserId: PropTypes.string,
    clearStore: PropTypes.func.isRequired,
    followers: PropTypes.object.isRequired,
    followings: PropTypes.object.isRequired,
    followersCount: PropTypes.number.isRequired,
    followingsCount: PropTypes.number.isRequired,
    userInfoProfile: PropTypes.object.isRequired,
    follow: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired
};

const ProfilePageContainer = (props) => <ProfilePage {...props} />;

ProfilePageContainer.propTypes = propTypes;

function mapStateToProps (state) {
    return {
        currentUserId: getCurrentUserIdState(state),
        imageMedium: getCurrentUserAvatarMediumState(state),
        image: getCurrentUserAvatar(state),
        backgroundImage: getCurrentUserBackGroundState(state),
        followers: getFollowersUsersState(state),
        followings: getFollowingsUsersState(state),
        followersCount: getFollowersCountState(state),
        followingsCount: getFollowingsCountState(state),
        jobs: getJobs(state),
        userInfoProfile: getUserInfoProfileState(state),
        onlineOffline: getUserInfoStatusOnline(state),
        lastedAt: getUserInfoLastedAt(state)
    };
}

function mapDispatchToProps (dispatch, ownProps) {
    return ({
        clearStore: () => dispatch(clearStore()),
        getUser: () => dispatch(getUserProfile(ownProps.params.userId)),
        follow: (followId, userPageId) => dispatch(followUser(followId, userPageId)),
        getAllJobs: () => dispatch(getAllJobs(ownProps.params.userId))
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePageContainer);
