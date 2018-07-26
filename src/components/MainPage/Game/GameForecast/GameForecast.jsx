import './GameForecast.scss';
import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { timeForecastRemain } from 'helpers/diffDateTime';

const propTypes = {
    gameForecast: PropTypes.string.isRequired
};

class GameForecast extends Component {
    constructor (props) {
        super(props);
        this.state = {time: null};
    }
    componentDidMount () {
        this.timer = setInterval(this.handleUpdateTimeRemain, 1000);
    }
    componentWillUnmount () {
        clearInterval(this.timer);
    }
    handleUpdateTimeRemain = () => {
        this.setState({ time: timeForecastRemain(this.props.intl.formatMessage({ id: 'locale' }), this.props.gameForecast) });
    };
    render () {
        return (
            <div className="st-game-forecast-wrap">
                <div className="st-game-forecast-time-icon">
                    <svg fill="#999" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
                    </svg>
                </div>
                <div>
                    <div className="st-game-forecast-time-title">{this.props.intl.formatMessage({ id: 'gameForecast.title' })}</div>
                    <div>{this.state.time}</div>
                </div>
            </div>
        );
    }
}

GameForecast.propTypes = propTypes;

export default injectIntl(GameForecast);
