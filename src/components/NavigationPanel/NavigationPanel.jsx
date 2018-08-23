import './NavigationPanel.scss';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    reward: PropTypes.any
};

export const NavigationPanel = () => {
    return (
        <div className="st-navigation-panel">
        </div>
    );
};

NavigationPanel.propTypes = propTypes;

export default injectIntl(NavigationPanel);
