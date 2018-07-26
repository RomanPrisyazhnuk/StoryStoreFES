import './Avatar.scss';
import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import UserPreview from 'components/UserPreview';

const propTypes = {
    currentUserAvatar: PropTypes.string,
    userAvatar: PropTypes.string,
    currentUserId: PropTypes.string,
    userId: PropTypes.string,
    positionPreview: PropTypes.shape({
        top: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number,
        right: PropTypes.number
    }),
    className: PropTypes.string.isRequired,
    isSignIn: PropTypes.bool.isRequired,
    goProfile: PropTypes.func.isRequired,
    withUserPreview: PropTypes.bool.isRequired
};

export class Avatar extends Component {
    constructor (props) {
        super(props);
        this.state = {
            popoverOpen: false
        };
    }
    componentDidMount () {
        this.mounted = true;
    }
    componentWillUnmount () {
        this.mounted = false;
    }
    handleMouseEnterUserPreview = () => {
        this.userPreviewTimer = setTimeout(() => {
            if (this.mounted) {
                this.setState({ popoverOpen: true});
            }
        }, 1000);
    };
    handleMouseLeaveUserPreview = () => {
        if (this.mounted) {
            clearInterval(this.userPreviewTimer);
            this.userPreviewTimer = null;
            this.setState({ popoverOpen: false});
        }
    };
    render () {
        let avatarImage;
        let generalBlock;
        let userPreview;
        if (this.props.userAvatar === undefined || this.props.currentUserId === this.props.userId) {
            avatarImage = this.props.currentUserAvatar !== null ? this.props.currentUserAvatar : '/static/images/avatar.jpg';
        } else {
            avatarImage = this.props.userAvatar !== null ? this.props.userAvatar : '/static/images/avatar.jpg';
        }
        if (this.props.userId === undefined) {
            generalBlock = <img className={this.props.className} src={avatarImage}/>;
        } else {
            generalBlock = <img className={this.props.className + ' st-avatar-link'}
                src={avatarImage}
                onClick={this.props.goProfile.bind(this, this.props.userId)}
                onMouseEnter={this.props.withUserPreview ? this.handleMouseEnterUserPreview : null }/>;
        }
        if (this.props.userId && this.props.currentUserId && this.props.withUserPreview && this.props.isSignIn && this.props.positionPreview && this.state.popoverOpen) {
            userPreview = <UserPreview
                userId={this.props.userId}
                currentUserId={this.props.currentUserId}
                goProfileAuthor = {this.props.goProfile}
                position={this.props.positionPreview}/>;
        }
        return (
            <div className="st-avatar-wrap" onMouseLeave={this.handleMouseLeaveUserPreview}>
                {userPreview}
                {generalBlock}
            </div>
        );
    }
}

Avatar.propTypes = propTypes;

export default injectIntl(Avatar);
