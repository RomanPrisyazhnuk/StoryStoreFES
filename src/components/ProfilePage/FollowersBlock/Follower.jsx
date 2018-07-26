import './Follower.scss';
import Avatar from 'components/Avatar';
import FollowButton from 'components/ProfilePage/FollowButton/FollowButton';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    currentUserId: PropTypes.string,
    followUser: PropTypes.func.isRequired,
    follower: PropTypes.object.isRequired
};

const Follower = ({follower, followUser, currentUserId}) => {
    return (
        <div className="st-follower-wrap">
            <div className="d-flex w-100">
                <Avatar
                    userAvatar={follower.image_small}
                    userId={follower.id}
                    className="st-game__avatar"
                    withUserPreview={false} />
                <div className="st-follower-info-wrap">
                    <Link to={`/profile/${follower.id}`} className="st-follower-follower-name">{follower.name}</Link>
                    <div className="st-follower-follower-email">{follower.email}</div>
                </div>
            </div>
            <FollowButton followUser={followUser}
                followType={follower.followed}
                followId={follower.id}
                currentUserId={currentUserId}/>
        </div>
    );
};

Follower.propTypes = propTypes;

export default Follower;
