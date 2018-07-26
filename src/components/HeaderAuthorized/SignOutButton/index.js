import { connect } from 'react-redux';
import { getUserIsLoadingState } from 'redux/selectors/entities/userSelectors';
import PropTypes from 'prop-types';
import React from 'react';
import SignOutButton from './SignOutButton';
import { signOutRequest } from 'redux/actions/entities/authenticateActions';

const propTypes = {
    isLoading: PropTypes.bool,
    signOut: PropTypes.func.isRequired
};

const SignOutButtonContainer = (props) => <SignOutButton {...props} />;

SignOutButtonContainer.propTypes = propTypes;

function mapStateToProps (state) {
    return {
        isLoading: getUserIsLoadingState(state)
    };
}

function mapDispatchToProps (dispatch) {
    return ({
        signOut: () => dispatch(signOutRequest())
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(SignOutButtonContainer);
