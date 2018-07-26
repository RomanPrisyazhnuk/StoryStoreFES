import App from './App';
import { connect } from 'react-redux';
import { getLanguageState } from 'redux/selectors/entities/languageSelectors';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    children: PropTypes.node.isRequired,
    language: PropTypes.string.isRequired
};

const AppContainer = (props) => <App {...props}/>;

AppContainer.propTypes = propTypes;

function mapStateToProps (state) {
    return {
        language: getLanguageState(state)
    };
}

export default connect(mapStateToProps)(AppContainer);
