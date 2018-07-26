import './FollowButton.scss';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    currentUserId: PropTypes.string,
    getFollowers: PropTypes.func,
    intl: PropTypes.object.isRequired,
    followId: PropTypes.string.isRequired
};

const FollowButton = ({ intl, followId, followUser, currentUserId, followType }) => {
    const handleClickFollow = () => {
        followUser(followId);
    };
    let button = null;
    if (followType) {
        button = <div className="st-follow-button">
            <button onClick={handleClickFollow}
                className="btn btn-danger">{intl.formatMessage({id: 'profileImageBlock.button.unfollow'})}</button>
        </div>;
    } else if (followId === currentUserId || (!currentUserId && followId)) {
        button = null;
    } else {
        button = <div className="st-follow-button">
            <button onClick={handleClickFollow}
                className="btn btn-primary">{intl.formatMessage({id: 'profileImageBlock.button.follow'})}</button>
        </div>;
    }
    return (
        <div className="st-follow-button-wrap">
            {button}
        </div>
    );
};

FollowButton.propTypes = propTypes;

export default injectIntl(FollowButton);
