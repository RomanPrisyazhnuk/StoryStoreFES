import './UserPreview.scss';
import React, { Component } from 'react';
import { country } from 'components/data/countryData';
import FollowButton from 'components/ProfilePage/FollowButton/FollowButton';
import { injectIntl } from 'react-intl';
import moment from 'moment';
import PropTypes from 'prop-types';

const propTypes = {
    currentUserId: PropTypes.string,
    userId: PropTypes.string.isRequired,
    goProfileAuthor: PropTypes.func.isRequired,
    follow: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    position: PropTypes.shape({
        top: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number,
        right: PropTypes.number
    }).isRequired
};

class UserPreview extends Component {
    constructor (props) {
        super(props);
        this.state = {userInfo: null};
    }
    componentDidMount () {
        this.props.getUser().then((data) => {
            this.setState({userInfo: data}, () => {
                if (this.container) {
                    if (this.container.getBoundingClientRect().top < 60) {
                        this.container.style.right = `${this.props.position.right}px`;
                        this.container.style.left = `${this.props.position.left}px`;
                        this.container.style.top = `${this.props.position.top}px`;
                        this.arrowTop.classList.remove('invisible');
                        this.arrowBottom.classList.add('invisible');
                    } else {
                        this.container.style.left = `${this.props.position.left}px`;
                        this.container.style.right = `${this.props.position.right}px`;
                        this.container.style.bottom = `${this.props.position.bottom}px`;
                    }
                }
            });
        });
    }
    followUser = () => {
        this.props.follow(this.state.userInfo.id).then(() => {
            const userInfo = {...this.state.userInfo, followed: !this.state.userInfo.followed };
            this.setState({userInfo});
        });
    };
    render () {
        const avatarImage = this.state.userInfo && this.state.userInfo.image_medium ? this.state.userInfo.image_medium : '/static/images/avatar.jpg';
        const backgroundImage = this.state.userInfo && this.state.userInfo.background_image ? this.state.userInfo.background_image : '/static/images/defaultBackground.png';
        return (
            this.state.userInfo
                ? <div className="st-preview-user-wrap" ref={(div) => this.container = div }>
                    <div className="st-preview-user-arrow-top invisible" ref={(div) => this.arrowTop = div }/>
                    <div className="st-preview-user-block">
                        <header className="st-preview-user-header">
                            <img className="st-preview-user-background" src={backgroundImage}/>
                            <div className="st-preview-user-avatar-block">
                                <img className="st-preview-user-avatar" src={avatarImage} onClick={this.props.goProfileAuthor.bind(this, this.props.userId)}/>
                                <a className="st-preview-user-name" onClick={this.props.goProfileAuthor.bind(this, this.props.userId)}>{this.state.userInfo.name}</a>
                            </div>
                        </header>
                        <div className="st-preview-user-container">
                            {this.state.userInfo.country
                                ? <span>
                                    {this.props.intl.formatMessage({ id: 'settingsBodyGeneral.countryTitle' })}: {country[this.props.intl.formatMessage({ id: 'locale'})][this.state.userInfo.country]}
                                </span>
                                : null }
                            <span>{this.props.intl.formatMessage({ id: 'aboutUser.contentTitle' })}: {moment(this.state.userInfo.created_at).format('DD/MM/YYYY, HH:mm:ss')}</span>
                        </div>
                        <footer className="st-preview-user-footer">
                            <FollowButton
                                followId={this.state.userInfo.id}
                                followUser={this.followUser}
                                currentUserId={this.props.currentUserId}
                                followType={this.state.userInfo.followed}/>
                        </footer>
                    </div>
                    <div className="st-preview-user-arrow-bottom" ref={(div) => this.arrowBottom = div }/>
                </div> : null
        );
    }
}

UserPreview.propTypes = propTypes;

export default injectIntl(UserPreview);
