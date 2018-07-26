import './HeaderAuthorized.scss';
// import Avatar from 'components/Avatar';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
// import Notifications from 'components/HeaderAuthorized/Notifications';
import PropTypes from 'prop-types';
import React from 'react';
// import SignOutButton from 'components/HeaderAuthorized/SignOutButton';
import { UncontrolledTooltip } from 'reactstrap';

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
                    {/* <Avatar */}
                    {/* className="st-header__avatar" */}
                    {/* userId={currentUserId} */}
                    {/* withUserPreview={false}/> */}
                    {/* <div className="st-margin-right-large" id="notification"> */}
                    {/* <Notifications/> */}
                    {/* </div> */}
                    <div className="st-margin-right-large" id="broker">
                    </div>
                    <Link className="st-header__image st-margin-right-large" to="/settings" >
                        <img src="/static/images/icons/settings.svg" id="settings"/>
                    </Link>
                    <Link className={`"st-header__image ${language === 'ru' ? 'st-header__image st-margin-right-large' : null}`} to="/help">
                    </Link>
                    {/* <div id="signOut"> */}
                    {/* <SignOutButton/> */}
                    {/* </div> */}
                    <UncontrolledTooltip placement="bottom" target="broker" delay={{show: 0, hide: 0}}>
                        <FormattedMessage id="broker.title"/>
                    </UncontrolledTooltip>
                    <UncontrolledTooltip placement="bottom" target="settings" delay={{show: 0, hide: 0}}>
                        <FormattedMessage id="settings.title"/>
                    </UncontrolledTooltip>
                    {/* <UncontrolledTooltip placement="bottom" target="help" delay={{show: 0, hide: 0}}> */}
                    {/* <FormattedMessage id="help.title"/> */}
                    {/* </UncontrolledTooltip> */}
                    {/* <UncontrolledTooltip placement="bottom" target="signOut" delay={{show: 0, hide: 0}}> */}
                    {/* <FormattedMessage id="logout.title"/> */}
                    {/* </UncontrolledTooltip> */}
                </div>
            </div>
        </div>
    );
};

HeaderAuthorized.propTypes = propTypes;

export default HeaderAuthorized;
