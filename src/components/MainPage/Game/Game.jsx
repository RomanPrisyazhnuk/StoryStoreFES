import './Game.scss';
import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
// import { openPopupShare } from 'redux/actions/utils/popup';
import PropTypes from 'prop-types';
import VisibilitySensor from 'react-visibility-sensor';

const propTypes = {
    currentUserId: PropTypes.string,
    currentUserName: PropTypes.string,
    searchUsers: PropTypes.func,
    showNotification: PropTypes.func,
    // game: PropTypes.object.isRequired,
    // getComments: PropTypes.func.isRequired,
    deleteGame: PropTypes.func.isRequired,
    updateGame: PropTypes.func.isRequired,
    getLinkParse: PropTypes.func.isRequired,
    // goProfileAuthor: PropTypes.func.isRequired,
    goGroup: PropTypes.func.isRequired,
    isSignIn: PropTypes.bool.isRequired
};

class Game extends Component {
    constructor (props) {
        super(props);
        this.state = {
            dropDownOpen: false,
            isExpired: this.props.game.hasOwnProperty('expired_bars'),
            deals: [],
            isModalGame: false,
            isModalUpdateGame: false,
            popoverOpen: false,
            isModalCollaborators: false,
            isVisible: false,
            activeTabModal: '1'
        };
    }
    onChangeVisibility = (isVisible) => {
        this.setState({isVisible});
    };
    render () {
        return (
            <VisibilitySensor
                onChange={this.onChangeVisibility}
                partialVisibility={true}>
                <div>someGame</div>

            </VisibilitySensor>
        );
    }
}

Game.propTypes = propTypes;

export default injectIntl(Game);
