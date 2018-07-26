import { connect } from 'react-redux';
import Followings from './Followings';
import { getFollowings } from 'redux/actions/entities/followerActions';
import { getFollowingsHasMoreState } from 'redux/selectors/entities/profileSelectors';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    hasMore: PropTypes.bool.isRequired,
    getNextData: PropTypes.func.isRequired,
    userPageId: PropTypes.string.isRequired
};

const FollowingsContainer = (props) => <Followings {...props} />;

FollowingsContainer.propTypes = propTypes;

function mapStateToProps (state) {
    return {
        hasMore: getFollowingsHasMoreState(state)
    };
}
function mapDispatchToProps (dispatch, ownProps) {
    return {
        getNextData: () => dispatch(getFollowings(ownProps.userPageId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowingsContainer);
