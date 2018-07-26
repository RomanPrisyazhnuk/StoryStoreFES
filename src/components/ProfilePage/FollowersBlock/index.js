import { connect } from 'react-redux';
import Followers from './Followers';
import { getFollowers } from 'redux/actions/entities/followerActions';
import { getFollowersHasMoreState } from 'redux/selectors/entities/profileSelectors';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    hasMore: PropTypes.bool.isRequired,
    getNextData: PropTypes.func.isRequired,
    userPageId: PropTypes.string.isRequired
};

const FollowersContainer = (props) => <Followers {...props} />;

FollowersContainer.propTypes = propTypes;

function mapStateToProps (state) {
    return {
        hasMore: getFollowersHasMoreState(state)
    };
}
function mapDispatchToProps (dispatch, ownProps) {
    return {
        getNextData: () => dispatch(getFollowers(ownProps.userPageId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowersContainer);
