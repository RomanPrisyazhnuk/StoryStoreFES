import './Notifications.scss';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import React, { Component } from 'react';
import CountNotifications from './CountNotifications';
import { injectIntl } from 'react-intl';
import MoreNotifications from './MoreNotifications';
import Notification from 'components/HeaderAuthorized/Notifications/Notification';
import PropTypes from 'prop-types';
import { UncontrolledTooltip } from 'reactstrap';
import { withRouter } from 'react-router';

const propTypes = {
    notice: PropTypes.array.isRequired,
    unreadCount: PropTypes.number.isRequired,
    hasMore: PropTypes.bool.isRequired,
    acceptCollaborator: PropTypes.func.isRequired,
    declineCollaboration: PropTypes.func.isRequired,
    getNextData: PropTypes.func.isRequired,
    checkNotifications: PropTypes.func.isRequired,
    acceptGroupMember: PropTypes.func.isRequired,
    declineGroupMember: PropTypes.func.isRequired,
    acceptCompanyMember: PropTypes.func.isRequired,
    declineCompanyMember: PropTypes.func.isRequired
};

class Notifications extends Component {
    constructor (props) {
        super(props);
        this.state = { dropdownOpen: false };
    }
    componentWillMount () {
        this.props.getNextData();
    }
    componentDidUpdate (nextProps) {
        if (this.state.dropdownOpen === true && this.props.unreadCount > 0) {
            this.props.checkNotifications();
        } else if (this.props.location.pathname !== nextProps.location.pathname && this.state.dropdownOpen) {
            this.toggle();
        }
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.hasMore && nextProps.notice.length === 0) {
            this.props.getNextData();
        }
    }
    toggle = () => { this.setState({dropdownOpen: !this.state.dropdownOpen}) };
    render () {
        const moreNotifications = this.props.hasMore
            ? <MoreNotifications getNextData = {this.props.getNextData}/>
            : null;
        return (
            <div>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle tag="div" className="st-header__image" id="notifications">
                        <img src="/static/images/icons/notifications.svg" alt=""/>
                        <CountNotifications unreadCount = {this.props.unreadCount}/>
                    </DropdownToggle>
                    <UncontrolledTooltip placement="bottom" target="notifications" delay={{show: 0, hide: 0}}>
                        {this.props.intl.formatMessage({id: `notifications.title`})}
                    </UncontrolledTooltip>
                    <DropdownMenu className="st-dropdown-notifications-wrap">
                        <div className="st-notifications">
                            { this.props.notice.length !== 0 || this.props.hasMore ? this.props.notice.map((notification) =>
                                <div key={notification.id} >
                                    <Notification notification={notification}
                                        deleteNotification = {this.props.deleteNotification}
                                        acceptCollaborator={this.props.acceptCollaborator}
                                        declineCollaboration={this.props.declineCollaboration}
                                        acceptGroupMember={this.props.acceptGroupMember}
                                        declineGroupMember={this.props.declineGroupMember}
                                        acceptCompanyMember={this.props.acceptCompanyMember}
                                        declineCompanyMember={this.props.declineCompanyMember}/>
                                </div>
                            ) : <div className="st-notifications-no-message-title">{this.props.intl.formatMessage({id: `notifications.empty`})}</div> }
                            {moreNotifications}
                        </div>
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    }
}

Notifications.propTypes = propTypes;

export default withRouter(injectIntl(Notifications));
