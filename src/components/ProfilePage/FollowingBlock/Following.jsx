import './Following.scss';
import Avatar from 'components/Avatar';
import FollowButton from 'components/ProfilePage/FollowButton/FollowButton';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    currentUserId: PropTypes.string,
    followUser: PropTypes.func.isRequired,
    following: PropTypes.object.isRequired
};

const Following = ({following, followUser, currentUserId}) => {
    return (
        <div className="st-following-wrap">
            <div className="d-flex w-100">
                <Avatar
                    userAvatar={following.image_small}
                    userId={following.id}
                    className="st-game__avatar"
                    withUserPreview={true} />
                <div className="st-following-info-wrap">
                    <Link to={`/profile/${following.id}`} className="st-following-following-name">{following.name}</Link>
                    <div className="st-following-following-email">{following.email}</div>
                </div>
            </div>
            <FollowButton followUser={followUser}
                followType={following.followed}
                followId={following.id}
                currentUserId={currentUserId}/>
        </div>
    );
};

Following.propTypes = propTypes;

export default Following;
