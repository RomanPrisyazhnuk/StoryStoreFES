import { connect } from 'react-redux';
import { followUser } from 'redux/actions/entities/followerActions';
import { getUserPreview } from 'redux/actions/entities/userActions';
import PropTypes from 'prop-types';
import React from 'react';
import UserPreview from './UserPreview';
import { withRouter } from 'react-router';

const propTypes = {
    currentUserId: PropTypes.string,
    userId: PropTypes.string.isRequired,
    goProfileAuthor: PropTypes.func.isRequired,
    follow: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    position: PropTypes.shape({
        top: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number,
        right: PropTypes.number
    }).isRequired
};

const UserPreviewContainer = (props) => <UserPreview {...props} />;

UserPreview.propTypes = propTypes;

function mapDispatchToProps (dispatch, ownProps) {
    return ({
        getUser: () => dispatch(getUserPreview(ownProps.userId)),
        follow: (followId) => dispatch(followUser(followId, ownProps.params.userId))
    });
}

export default withRouter(connect(null, mapDispatchToProps)(UserPreviewContainer));
