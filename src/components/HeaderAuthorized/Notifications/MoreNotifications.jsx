import './MoreNotifications.scss';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    intl: PropTypes.object.isRequired,
    getNextData: PropTypes.func.isRequired
};

const MoreNotifications = ({intl, getNextData}) => {
    return <div className="st-notifications-more">
        <a onClick={getNextData}>{intl.formatMessage({id: 'moreNotifications.title'})}</a>
    </div>;
};

MoreNotifications.propTypes = propTypes;

export default injectIntl(MoreNotifications);
