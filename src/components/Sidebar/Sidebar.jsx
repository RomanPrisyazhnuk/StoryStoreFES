import './Sidebar.scss';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    reward: PropTypes.any
};

export const Sidebar = () => {
    return (
        <div className="st-sidebar">
        </div>
    );
};

Sidebar.propTypes = propTypes;

export default injectIntl(Sidebar);
