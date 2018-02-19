import {setSticky, removeSticky} from 'helpers/stickyHelper';
import React from 'react';

const withSticky = (Component, elementLeftId, parentLeftId, elementRightId, parentRightId) => {
    class WithSticky extends React.Component {
        constructor (props) {
            super(props);
        }
        componentDidMount () {
            setSticky(elementLeftId, parentLeftId, elementRightId, parentRightId);
        }
        componentWillUnmount () {
            removeSticky();
        }
        render () {
            return <Component {...this.props}/>;
        }
    }
    return WithSticky;
};

export default withSticky;
