import './ProfileImageBlock.scss';
import ImageWithModal from '../../ImageWithModal/ImageWithModal';
import ModalChangeAvatar from 'components/Modals/ModalChangeAvatar';
import ModalChangeBackground from 'components/Modals/ModalChangeBackground';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    userAvatar: PropTypes.string,
    userAvatarMedium: PropTypes.string,
    currentUserId: PropTypes.string,
    profileUserId: PropTypes.string,
    userName: PropTypes.string.isRequired
};

const ProfileImageBlock = ({currentUserId, profileUserId, userAvatarMedium, userAvatar, userBackground, userName}) => {
    const avatarImage = userAvatar !== null ? userAvatar : '/static/images/avatar.jpg';
    const avatarImageMedium = userAvatarMedium !== null ? userAvatarMedium : '/static/images/avatar.jpg';
    const backgroundImage = userBackground !== null ? userBackground : '/static/images/defaultBackground.png';
    const iconChangeAvatar = (currentUserId === profileUserId)
        ? (<div className="st-profile-image-block-svg-icons-wrap">
            <ModalChangeAvatar avatarType="user" avatar={avatarImage}/>
        </div>)
        : (null);
    const iconChangeBackground = (currentUserId === profileUserId)
        ? (<div className="st-profile-image-block-svg-icons-wrap">
            <ModalChangeBackground backgroundType="user" background={backgroundImage}/>
        </div>)
        : (null);
    return (
        <div className="st-profile-image-block-header">
            <img className="st-profile-image-block-background-image" src={backgroundImage}/>
            {iconChangeBackground}
            <div className="st-profile-image-block-avatar-wrap">
                <ImageWithModal classForImg="st-profile-image-block-avatar" image={avatarImage} imageMedium={avatarImageMedium} isProfile={true}/>
                {iconChangeAvatar}
                <div className="st-profile-image-block-name">{userName}</div>
            </div>
        </div>
    );
};

ProfileImageBlock.propTypes = propTypes;

export default ProfileImageBlock;
