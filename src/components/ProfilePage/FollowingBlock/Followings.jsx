import './Followings.scss';
import _ from 'lodash';
import Following from './Following';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import withInfiniteScroll from 'components/HOC/withInfiniteScroll';

const propTypes = {
    followingsProfile: PropTypes.object,
    currentUserId: PropTypes.string,
    followUser: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired
};

const Followings = ({intl, currentUserId, followingsProfile, followUser}) => {
    return (
        <div className="st-followings-wrap">
            <h2 className="st-followings-title">{intl.formatMessage({id: 'followings.title'})}</h2>
            {followingsProfile
                ? (_.map(followingsProfile, (following) =>
                    <div key={following.id}>
                        <Following followUser={followUser}
                            following={following}
                            currentUserId={currentUserId}/>
                    </div>
                ))
                : (null)}
        </div>
    );
};

Followings.propTypes = propTypes;

export default withInfiniteScroll(injectIntl(Followings), '.st-followings-wrap', 800, true);
