// import './AboutUser.scss';
// import { FormattedMessage, injectIntl } from 'react-intl';
// import moment from 'moment';
// import PropTypes from 'prop-types';
// import React from 'react';
// import {timeCreate} from 'helpers/diffDateTime';
//
// const propTypes = {
//     userStatus: PropTypes.string,
//     profileUserId: PropTypes.string,
//     currentUserId: PropTypes.string,
//     userJoin: PropTypes.string.isRequired,
//     onlineOffline: PropTypes.bool.isRequired,
//     intl: PropTypes.object.isRequired
// };
//
// const AboutUser = ({intl, userStatus, currentUserId, profileUserId, userJoin, onlineOffline, lastedAt }) => {
//     const lastVisitAgo = lastedAt ? timeCreate(intl.formatMessage({ id: 'locale' }), lastedAt) : null;
//     const handleClickBackToTop = () => window.scroll(0, 0);
//     return (
//         <div className="st-about-user-wrap">
//             <div className="st-about-user-header">
//                 {intl.formatMessage({ id: currentUserId === profileUserId ? 'aboutMe.headerTitle' : 'aboutUser.headerTitle' })}
//             </div>
//             <div className="st-about-user-content">
//                 {userStatus ? <div className="about-user-test">{intl.formatMessage({ id: 'aboutUser.statusTitle' })}: {userStatus}</div> : null}
//                 { onlineOffline
//                     ? <span className="st-profile-page-status-text st-profile-page-online-status">Online</span>
//                     : lastedAt
//                         ? <span className="st-profile-page-status-text st-profile-page-offline-status">{intl.formatMessage({ id: 'profileAboutBlock.lastVisit' })}: {lastVisitAgo}</span>
//                         : null }
//                 <div>{intl.formatMessage({ id: 'aboutUser.contentTitle' })}: {moment(userJoin).format('DD/MM/YYYY, HH:mm:ss')}</div>
//             </div>
//             <div id="back-to-top" className='st-back-to-top-wrap invisible' onClick={handleClickBackToTop}>
//                 <div className="st-back-to-top"><FormattedMessage id="button.backToTop"/></div>
//                 <img className="st-back-to-top-icon" src="/static/images/icons/backToTop.svg"/>
//             </div>
//         </div>
//     );
// };
//
// AboutUser.propTypes = propTypes;
//
// export default injectIntl(AboutUser);
