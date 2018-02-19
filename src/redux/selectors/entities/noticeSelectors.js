import _ from 'lodash';
import { createSelector } from 'reselect';
// selector
const getNoticeState = (state) => state.entities.notice;
// reselect function
export const getNoticeNotificationsState = createSelector(
    [ getNoticeState ],
    (notice) => notice.notifications
);
export const getNoticeUnreadCountState = createSelector(
    [ getNoticeState ],
    (notice) => notice.unreadCount
);
export const getNoticeHasMoreState = createSelector(
    [ getNoticeState ],
    (notice) => notice.hasMore
);
export const getLastNoticeCreatedAtState = (state) => {
    const lastNotification = _.last(getNoticeNotificationsState(state));
    return lastNotification ? lastNotification.created_at : '';
};
