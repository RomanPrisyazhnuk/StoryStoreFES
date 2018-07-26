import { getIsSignInState, getCurrentUserIdState, getCurrentUserAvatarSmallState } from 'redux/selectors/entities/userSelectors';
import Avatar from './Avatar';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { toggleModal } from 'redux/actions/ui/modalsActions';

const propTypes = {
    currentUserAvatar: PropTypes.string,
    userAvatar: PropTypes.string,
    currentUserId: PropTypes.string,
    userId: PropTypes.string,
    positionPreview: PropTypes.shape({
        top: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number,
        right: PropTypes.number
    }),
    className: PropTypes.string.isRequired,
    isSignIn: PropTypes.bool.isRequired,
    goProfile: PropTypes.func.isRequired,
    withUserPreview: PropTypes.bool.isRequired
};

const AvatarContainer = (props) => <Avatar {...props}/>;

AvatarContainer.propTypes = propTypes;

function mapStateToProps (state) {
    return {
        currentUserId: getCurrentUserIdState(state),
        currentUserAvatar: getCurrentUserAvatarSmallState(state),
        isSignIn: getIsSignInState(state)
    };
}

function mergeProps (stateProps, dispatchProps, ownProps) {
    const { isSignIn } = stateProps;
    const { dispatch } = dispatchProps;
    return {
        ...stateProps,
        ...ownProps,
        goProfile: (userId) => {
            if (isSignIn) {
                browserHistory.push(`/profile/${userId}`);
            } else {
                dispatch(toggleModal('authorizeSingleGame'));
            }
        }
    };
}

export default connect(mapStateToProps, null, mergeProps)(AvatarContainer);
