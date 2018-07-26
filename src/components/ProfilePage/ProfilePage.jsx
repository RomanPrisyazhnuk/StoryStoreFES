import './ProfilePage.scss';
import React, { Component } from 'react';
import { TabContent, TabPane} from 'reactstrap';
import _ from 'lodash';
import AboutUser from 'components/ProfilePage/AboutUser';
import Followers from 'components/ProfilePage/FollowersBlock';
import Followings from 'components/ProfilePage/FollowingBlock';
// import GamesBlock from 'components/MainPage/GamesBlock';
import ProfileContacts from 'components/ProfilePage/ProfileContacts';
import ProfileImageBlock from 'components/ProfilePage/ProfileImageBlock';
import ProfileNavBar from 'components/ProfilePage/ProfileNavBar';
import PropTypes from 'prop-types';
import withSticky from 'components/HOC/withSticky';

const propTypes = {
    image: PropTypes.string,
    imageMedium: PropTypes.string,
    backgroundImage: PropTypes.string,
    currentUserId: PropTypes.string,
    jobs: PropTypes.object,
    followers: PropTypes.object.isRequired,
    followings: PropTypes.object.isRequired,
    followersCount: PropTypes.number.isRequired,
    followingsCount: PropTypes.number.isRequired,
    userInfoProfile: PropTypes.object.isRequired,
    follow: PropTypes.func.isRequired,
    getAllJobs: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired
};

export class ProfilePage extends Component {
    constructor (props) {
        super(props);
        this.state = {activeTab: '1'};
    }
    componentWillMount () {
        this.props.clearStore().then(() => {
            this.props.getUser();
            this.props.getAllJobs();
        });
    }
    componentDidUpdate (prevProps) {
        if (this.props.params.userId !== prevProps.params.userId) {
            this.props.clearStore().then(() => {
                this.setState({activeTab: '1'});
                this.props.getUser();
            });
        }
    }
    followUser = (followId) => {
        this.props.follow(followId, this.props.params.userId);
    };
    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({activeTab: tab});
        }
    };
    render () {
        const userInfoProfile = this.props.userInfoProfile;
        return (
            <div key={this.props.userInfoProfile ? this.props.userInfoProfile.id : null} className="st-profile-page">
                {!_.isEmpty(userInfoProfile)
                    ? <div className="container">
                        <div className="st-profile-image-block-wrap">
                            <ProfileImageBlock
                                profileUserId={userInfoProfile.id}
                                currentUserId={this.props.currentUserId}
                                userAvatarMedium={this.props.currentUserId === this.props.params.userId ? this.props.imageMedium : userInfoProfile.image_medium}
                                userAvatar={this.props.currentUserId === this.props.params.userId ? this.props.image : userInfoProfile.image}
                                userBackground={this.props.currentUserId === this.props.params.userId ? this.props.backgroundImage : userInfoProfile.background_image}
                                userName={userInfoProfile.name}/>
                            <ProfileNavBar
                                activeTab={this.state.activeTab}
                                currentUserId={this.props.currentUserId}
                                profileUserId={userInfoProfile.id}
                                followUser={this.followUser}
                                followType={userInfoProfile.followed}
                                followersCount={this.props.followersCount}
                                followingCount={this.props.followingsCount}
                                toggle={this.toggle}/>
                        </div>
                        <div className="st-profile-page-content">
                            <div className="st-grid">
                                <div id="aboutUserParent" className="st-left-area">
                                    <div id="aboutUser">
                                        <AboutUser userStatus={userInfoProfile.status}
                                            userJoin={userInfoProfile.created_at}
                                            currentUserId={this.props.currentUserId}
                                            profileUserId={userInfoProfile.id}
                                            onlineOffline={this.props.onlineOffline}
                                            lastedAt={this.props.lastedAt}/>
                                    </div>
                                </div>
                                <div className="st-center-area">
                                    <TabContent activeTab={this.state.activeTab}>
                                        <TabPane className="st-tab-content" tabId="1">
                                            {/* <GamesBlock */}
                                            {/* userId={this.props.params.userId } */}
                                            {/* gamesType={{user_id: this.props.params.userId}}/> */}
                                        </TabPane>
                                        <TabPane className="st-tab-content" tabId="2">
                                            {this.state.activeTab === '2'
                                                ? <ProfileContacts userInfo={userInfoProfile} jobs={this.props.jobs}/>
                                                : null }
                                        </TabPane>
                                        <TabPane className="st-tab-content" tabId="3">
                                            {this.state.activeTab === '3'
                                                ? <Followings
                                                    userPageId={this.props.params.userId}
                                                    currentUserId={this.props.currentUserId}
                                                    followUser={this.followUser}
                                                    followingsProfile={this.props.followings}/>
                                                : null }
                                        </TabPane>
                                        <TabPane className="st-tab-content" tabId="4">
                                            {this.state.activeTab === '4'
                                                ? <Followers
                                                    userPageId={this.props.params.userId}
                                                    currentUserId={this.props.currentUserId}
                                                    followUser={this.followUser}
                                                    followersProfile={this.props.followers}/> : null }
                                        </TabPane>
                                    </TabContent>
                                </div>
                                <div className="st-right-area"/>
                            </div>
                        </div>
                    </div>
                    : null
                }
            </div>
        );
    }
}

ProfilePage.propTypes = propTypes;

export default withSticky(ProfilePage, 'aboutUser', 'aboutUserParent', null, null);
