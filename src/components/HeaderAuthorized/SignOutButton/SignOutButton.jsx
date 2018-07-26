import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    isLoading: PropTypes.bool,
    signOut: PropTypes.func.isRequired
};

const SignOutButton = ({signOut, isLoading}) => {
    return <div className="st-header__image st-sign-out"
        disabled={isLoading}
        onClick={signOut}>
        <img src="/static/images/icons/power.svg" />
    </div>;
};

SignOutButton.propTypes = propTypes;

export default SignOutButton;
