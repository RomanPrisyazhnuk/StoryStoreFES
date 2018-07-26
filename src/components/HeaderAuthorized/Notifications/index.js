import { getNoticeNotificationsState,
    getNoticeUnreadCountState, getNoticeHasMoreState } from 'redux/selectors/entities/noticeSelectors';
import { getNotifications,
    checkNotifications,
    deleteNotification,
    acceptCollaborator,
    declineCollaboration,
    acceptGroupMember,
    declineGroupMember,
    acceptCompanyMember,
    declineCompanyMember } from 'redux/actions/entities/noticeActions';
import { connect } from 'react-redux';
import Notifications from './Notifications';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';

const propTypes = {
    notice: PropTypes.array.isRequired,
    unreadCount: PropTypes.number.isRequired,
    hasMore: PropTypes.bool.isRequired,
    acceptCollaborator: PropTypes.func.isRequired,
    declineCollaboration: PropTypes.func.isRequired,
    acceptGroupMember: PropTypes.func.isRequired,
    declineGroupMember: PropTypes.func.isRequired,
    acceptCompanyMember: PropTypes.func.isRequired,
    declineCompanyMember: PropTypes.func.isRequired,
    getNextData: PropTypes.func.isRequired,
    checkNotifications: PropTypes.func.isRequired
};

const NotificationsContainer = (props) => <Notifications {...props}/>;

NotificationsContainer.propTypes = propTypes;

function mapStateToProps (state) {
    return {
        notice: getNoticeNotificationsState(state),
        unreadCount: getNoticeUnreadCountState(state),
        hasMore: getNoticeHasMoreState(state)
    };
}

function mapDispatchToProps (dispatch) {
    return {
        acceptCollaborator: (gameId) => dispatch(acceptCollaborator(gameId)),
        declineCollaboration: (gameId) => dispatch(declineCollaboration(gameId)),
        acceptGroupMember: (groupId) => dispatch(acceptGroupMember(groupId)),
        declineGroupMember: (groupId) => dispatch(declineGroupMember(groupId)),
        acceptCompanyMember: (companyId) => dispatch(acceptCompanyMember(companyId)),
        declineCompanyMember: (companyId) => dispatch(declineCompanyMember(companyId)),
        deleteNotification: (notificationId) => dispatch(deleteNotification(notificationId)),
        getNextData: () => dispatch(getNotifications()),
        checkNotifications: () => dispatch(checkNotifications())
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer));
