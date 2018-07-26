import './Notification.scss';
import { browserHistory } from 'react-router';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    intl: PropTypes.object.isRequired,
    notification: PropTypes.object.isRequired,
    acceptCollaborator: PropTypes.func.isRequired,
    declineCollaboration: PropTypes.func.isRequired,
    deleteNotification: PropTypes.func.isRequired,
    acceptGroupMember: PropTypes.func.isRequired,
    declineGroupMember: PropTypes.func.isRequired
};

const Notification = (props) => {
    const {notification,
        deleteNotification,
        intl,
        acceptGroupMember,
        declineGroupMember,
        acceptCompanyMember,
        declineCompanyMember,
        acceptCollaborator,
        declineCollaboration} = props;
    const handleClick = (id, type) => {
        browserHistory.replace(`/${type}/${id}`);
    };
    const generationContent = () => {
        switch (notification.content.type) {
        case 'follow':
            return <div className="st-notification-block" onClick={handleClick.bind(this, notification.content.author_id, 'profile')}>
                <div><img className="st-notification-image" src={notification.content.image || '/static/images/avatar.jpg'}/></div>
                <div className="st-notification-content">
                    <span className="st-notification-content-author-name">{notification.content.author_name}</span>
                    <span>{` ${intl.formatMessage({id: `notice.content.${notification.content.type}`})}`}</span>
                </div>
            </div>;
        case 'unfollow':
            return <div className="st-notification-block" onClick={handleClick.bind(this, notification.content.author_id, 'profile')}>
                <div><img className="st-notification-image" src={notification.content.image || '/static/images/avatar.jpg'}/></div>
                <div className="st-notification-content">
                    <span className="st-notification-content-author-name">{notification.content.author_name}</span>
                    <span>{` ${intl.formatMessage({id: `notice.content.${notification.content.type}`})}`}</span>
                </div>
            </div>;
        case 'add_member':
            return <div className="st-notification-block" onClick={handleClick.bind(this, notification.target_id, notification.type_id === 'groups' ? 'group' : 'company')}>
                <div><img className="st-notification-image" src={notification.content.image || '/static/images/avatar.jpg'}/></div>
                <div className="st-notification-content">
                    <span className="st-notification-content-author-name">{notification.content.author_name}</span>
                    <span>{` ${intl.formatMessage({id: `notice.content.${notification.content.type}_${notification.type_id}`})} `}</span>
                    <span className="st-notification-content-author-name">{notification.content.name}</span>
                </div>
            </div>;
        case 'invite_member':
            return <div className="w-100">
                <div className="st-notification-block" onClick={handleClick.bind(this, notification.target_id, notification.type_id === 'groups' ? 'group' : 'company')}>
                    <div><img className="st-notification-image" src={notification.content.image || '/static/images/avatar.jpg'}/></div>
                    <div className="st-notification-content">
                        <span className="st-notification-content-author-name">{notification.content.author_name}</span>
                        <span>{` ${intl.formatMessage({id: `notice.content.${notification.content.type}_${notification.type_id}`})} `}</span>
                        <span className="st-notification-content-author-name">{notification.content.name}</span>
                    </div>
                </div>
                { !notification.content.confirmed
                    ? <div className="st-notification-btn-wrap">
                        <button
                            className="btn btn-primary st-notification-btn"
                            onClick={notification.type_id === 'groups'
                                ? acceptGroupMember.bind(this, notification.target_id)
                                : acceptCompanyMember.bind(this, notification.target_id)}>
                            {` ${intl.formatMessage({id: `notice.btn.accept`})}`}
                        </button>
                        <button
                            className="btn btn-danger st-notification-btn"
                            onClick={notification.type_id === 'groups'
                                ? declineGroupMember.bind(this, notification.target_id)
                                : declineCompanyMember.bind(this, notification.target_id)}>
                            {` ${intl.formatMessage({id: `notice.btn.decline`})}`}
                        </button>
                    </div> : null }
            </div>;
        case 'add_collaborator':
            return <div className="st-notification-block" onClick={handleClick.bind(this, notification.target_id, 'games')}>
                <div><img className="st-notification-image" src={notification.content.image || '/static/images/avatar.jpg'}/></div>
                <div className="st-notification-content">
                    <span className="st-notification-content-author-name">{notification.content.author_name}</span>
                    <span>{` ${intl.formatMessage({id: `notice.content.${notification.content.type}`})}`}</span>
                </div>
            </div>;
        case 'invite_collaborator':
            return <div>
                <div className="st-notification-block" onClick={handleClick.bind(this, notification.target_id, 'games')}>
                    <div><img className="st-notification-image" src={notification.content.image || '/static/images/avatar.jpg'}/></div>
                    <div className="st-notification-content">
                        <span className="st-notification-content-author-name">{notification.content.author_name}</span>
                        <span>{` ${intl.formatMessage({id: `notice.content.${notification.content.type}`})}`}</span>
                    </div>
                </div>
                {!notification.content.confirmed
                    ? <div className="st-notification-btn-wrap">
                        <button className="btn btn-primary st-notification-btn" onClick={acceptCollaborator.bind(this, notification.target_id)}>{` ${intl.formatMessage({id: `notice.btn.accept`})}`}</button>
                        <button className="btn btn-danger st-notification-btn" onClick={declineCollaboration.bind(this, notification.target_id)}>{` ${intl.formatMessage({id: `notice.btn.decline`})}`}</button>
                    </div> : null }
            </div>;
        }
    };
    return (
        <div className="st-notification-wrap">
            {generationContent()}
            <div onClick={deleteNotification.bind(this, notification.id)} className="st-notification-icon-wrap">
                <svg className="st-notification-delete" fill="#9b9d9e" height="24" viewBox="0 0 24 24" width="16px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                </svg>
            </div>
        </div>
    );
};

Notification.propTypes = propTypes;

export default injectIntl(Notification);
