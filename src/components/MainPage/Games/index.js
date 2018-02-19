import { deleteGame, updateGame, getFollowersGame} from 'redux/actions/entities/postsActions';
import { getIsSignInState, getCurrentUserIdState,
    getCurrentUserNameState} from 'redux/selectors/entities/userSelectors';
import { getGamesState, getHasMoreGamesState, getNewFollowersGames } from 'redux/selectors/entities/postsSelectors';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Games from './Games';
import { getComments } from 'redux/actions/entities/commentsActions';
import { getGames } from 'redux/actions/entities/postsActions';
import { getLinkParse } from 'redux/actions/entities/parseLinksActions';
import { getQuotesSettingsState } from 'redux/selectors/entities/quotesSettingsSelectors';
import PropTypes from 'prop-types';
import React from 'react';
import { searchUsers } from 'redux/actions/entities/userActions';
import { showNotification } from 'redux/actions/ui/notificationActions';
import { toggleModal } from 'redux/actions/ui/modalsActions';
import withInfiniteScroll from 'components/HOC/withInfiniteScroll';

const propTypes = {
    currentUserId: PropTypes.string,
    currentUserName: PropTypes.string,
    quotesSettings: PropTypes.object,
    newFollowersGames: PropTypes.array.isRequired,
    games: PropTypes.array.isRequired,
    hasMore: PropTypes.bool.isRequired,
    searchUsers: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    getNextData: PropTypes.func.isRequired,
    getComments: PropTypes.func.isRequired,
    deleteGame: PropTypes.func.isRequired,
    updateGame: PropTypes.func.isRequired,
    getLinkParse: PropTypes.func.isRequired,
    getFollowersGame: PropTypes.func.isRequired,
    getGameOpenDeals: PropTypes.func.isRequired,
    goProfileAuthor: PropTypes.func.isRequired,
    goGroup: PropTypes.func.isRequired,
    isSignIn: PropTypes.bool.isRequired
};

const GamesContainer = (props) => <Games {...props} />;

GamesContainer.propTypes = propTypes;

function mapStateToProps (state) {
    return {
        currentUserId: getCurrentUserIdState(state),
        currentUserName: getCurrentUserNameState(state),
        posts: getGamesState(state),
        hasMore: getHasMoreGamesState(state),
        isSignIn: getIsSignInState(state),
        newFollowersGames: getNewFollowersGames(state)
    };
}

function mapDispatchToProps (dispatch, ownProps) {
    return {
        getNextData: () => dispatch(getGames(ownProps.postsType)),
        getComments: (postId) => dispatch(getComments('Game', postId)),
        deleteGame: (postId) => dispatch(deleteGame(postId)),
        updateGame: (postId, data) => dispatch(updateGame(postId, data)),
        getFollowersGame: (postIds) => dispatch(getFollowersGame(postIds)),
        getLinkParse: (data) => dispatch(getLinkParse(data)),
        goProfileAuthor: (userId) => browserHistory.push(`/profile/${userId}`),
        goGroup: (groupId) => browserHistory.push(`/group/${groupId}`),
        searchUsers: (data) => dispatch(searchUsers(data)),
        showNotification: (status, message) => dispatch(showNotification({status, message})),
    };
}

export default (connect(mapStateToProps, mapDispatchToProps)(withInfiniteScroll(GamesContainer, '.st-posts', 800, true)));
