import './HeaderAuthorized.scss';
// import Avatar from 'components/Avatar';
import { Link } from 'react-router';
// import Notifications from 'components/HeaderAuthorized/Notifications';
import PropTypes from 'prop-types';
import React from 'react';
// import SignOutButton from 'components/HeaderAuthorized/SignOutButton';

const propTypes = {
    currentUserId: PropTypes.string,
    language: PropTypes.string
};

// const HeaderAuthorized = ({currentUserId, language}) => {
const HeaderAuthorized = ({language}) => {
    return (
        <div className='st-header-div'>
            <div className="st-header-wrap">
                <Link to="/" className="st-header__logo">
                    <img src="/static/images/investarena_logo.png"/>
                </Link>
                <div className="st-tool-panel st-margin-right-small d-flex justify-content-between align-items-center">
                    <div className="st-margin-right-large" id="broker">
                    </div>
                    <Link className="st-header__image st-margin-right-large" to="/settings" >
                        <img src="/static/images/icons/settings.svg" id="settings"/>
                    </Link>
                    <Link className={`"st-header__image ${language === 'ru' ? 'st-header__image st-margin-right-large' : null}`} to="/help">
                    </Link>
                </div>
            </div>
        </div>
    );
};

HeaderAuthorized.propTypes = propTypes;

export default HeaderAuthorized;
