import './CountNotifications.scss';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    unreadCount: PropTypes.number
};

const CountNotifications = ({unreadCount}) => {
    let count = unreadCount > 0
        ? unreadCount > 99
            ? '99+'
            : unreadCount
        : null;
    return (
        <div className="st-count-notifications-wrap">
            <div className="st-count-notifications-number">{count}</div>
        </div>
    );
};

CountNotifications.propTypes = propTypes;

export default CountNotifications;
