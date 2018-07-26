import './Followers.scss';
import _ from 'lodash';
import Follower from './Follower';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import withInfiniteScroll from 'components/HOC/withInfiniteScroll';

const propTypes = {
    followersProfile: PropTypes.object,
    currentUserId: PropTypes.string,
    hasMore: PropTypes.bool.isRequired,
    getNextData: PropTypes.func.isRequired,
    followUser: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired
};

const Followers = ({intl, currentUserId, followersProfile, followUser}) => {
    return (
        <div className="st-followers-wrap">
            <h2 className="st-followers-title">{intl.formatMessage({id: 'followers.title'})}</h2>
            {followersProfile
                ? (_.map(followersProfile, (follower) =>
                    <div key={follower.id}>
                        <Follower followUser={followUser}
                            follower={follower}
                            currentUserId={currentUserId}/>
                    </div>
                ))
                : (null)}
        </div>
    );
};

Followers.propTypes = propTypes;

export default withInfiniteScroll(injectIntl(Followers), '.st-followers-wrap', 800, true);
