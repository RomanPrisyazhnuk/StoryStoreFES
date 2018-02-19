import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';

const propTypes = {
    clearStore: PropTypes.func.isRequired
};

const withClearStore = (Component) => {
    class WithClearStore extends React.Component {
        constructor (props) {
            super(props);
        }
        componentWillMount () {
            this.props.clearStore();
        }
        componentWillUpdate (nextProps) {
            if (this.props.location.pathname !== nextProps.location.pathname) {
                this.props.clearStore();
            }
        }
        render () {
            return <Component {...this.props}/>;
        }
    }
    WithClearStore.propTypes = propTypes;
    return withRouter(WithClearStore);
};

export default withClearStore;
