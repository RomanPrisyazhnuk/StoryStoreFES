import './ProfileNavBar.scss';
import { injectIntl, FormattedPlural } from 'react-intl';
import FollowButton from 'components/ProfilePage/FollowButton/FollowButton';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    followersCount: PropTypes.number,
    followingCount: PropTypes.number,
    currentUserId: PropTypes.string,
    intl: PropTypes.object.isRequired,
    profileUserId: PropTypes.string.isRequired,
    toggle: PropTypes.func.isRequired,
    activeTab: PropTypes.string.isRequired
};

const ProfileNavBar = ({intl, currentUserId, profileUserId, followersCount, followingCount, followUser, followType, toggle, activeTab}) => {
    return (
        <div className="st-profile-image-block-item">
            <div className="st-tabs-wrap st-profile-image-block-item-tabs">
                <div id='tab1' className={activeTab === '1' ? 'st-tab active' : 'st-tab'} onClick={toggle.bind(this, '1') }>{intl.formatMessage({ id: 'profileImageBlock.tabs.timeline' })}</div>
                <div id='tab2' className={activeTab === '2' ? 'st-tab active' : 'st-tab'} onClick={toggle.bind(this, '2') }>{intl.formatMessage({ id: 'profileImageBlock.tabs.contacts' })}</div>
                <div id='tab3' className={activeTab === '3' ? 'st-tab active' : 'st-tab'} onClick={toggle.bind(this, '3') }>
                    <span dir="ltr" className="st-profile-image-block-item-count">{followingCount}</span>
                    <FormattedPlural
                        value={followingCount}
                        zero={intl.formatMessage({ id: 'profileImageBlock.tabs.otherFollowings' })}
                        one={intl.formatMessage({ id: 'profileImageBlock.tabs.oneFollowing' })}
                        few={intl.formatMessage({ id: 'profileImageBlock.tabs.fewFollowings' })}
                        other={intl.formatMessage({ id: 'profileImageBlock.tabs.otherFollowings' })}/>
                </div>
                <div id='tab4' className={activeTab === '4' ? 'st-tab active' : 'st-tab'} onClick={toggle.bind(this, '4') }>
                    <span dir="ltr" className="st-profile-image-block-item-count">{followersCount}</span>
                    <FormattedPlural
                        value={followersCount}
                        zero={intl.formatMessage({ id: 'profileImageBlock.tabs.otherFollowers' })}
                        one={intl.formatMessage({ id: 'profileImageBlock.tabs.oneFollower' })}
                        few={intl.formatMessage({ id: 'profileImageBlock.tabs.fewFollowers' })}
                        other={intl.formatMessage({ id: 'profileImageBlock.tabs.otherFollowers' })}/>
                </div>
            </div>
            <FollowButton followType={followType}
                followUser={followUser}
                followId={profileUserId}
                currentUserId={currentUserId}/>
        </div>
    );
};

ProfileNavBar.propTypes = propTypes;

export default injectIntl(ProfileNavBar);
