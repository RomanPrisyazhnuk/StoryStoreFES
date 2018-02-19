import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
    getNextData: PropTypes.func.isRequired
};

const withInfiniteScroll = (Component, classNameContainer, offSetTop, relativeWindow) => {
    class WithInfiniteScroll extends React.Component {
        componentDidMount () {
            this.container = document.querySelector(classNameContainer);
            if (this.container) {
                this.attachScrollListener();
            }
        }
        componentDidUpdate () {
            if (this.container && this.container.offsetParent && this.container.offsetHeight !== 0) {
                this.attachScrollListener();
            } else if (this.container && this.container.offsetHeight === 0) {
                this.container = document.querySelector(classNameContainer);
                if (this.container && this.container.offsetHeight !== 0) {
                    this.attachScrollListener();
                } else {
                    this.detachScrollListener();
                }
            }
        }
        componentWillUnmount () {
            this.detachScrollListener();
        }
        attachScrollListener = () => {
            if (this.props.hasMore) {
                if (this.container.offsetHeight < offSetTop) {
                    this.onScroll();
                }
                if (relativeWindow) {
                    window.addEventListener('scroll', this.onScroll);
                } else {
                    this.container.addEventListener('scroll', this.onScroll);
                }
            }
        };
        detachScrollListener = () => {
            if (relativeWindow) {
                window.removeEventListener('scroll', this.onScroll);
            } else if (!relativeWindow && this.container) {
                this.container.removeEventListener('scroll', this.onScroll);
            }
        };
        onScroll = () => {
            let scrollTop = 0;
            let offset = 0;
            if (relativeWindow) {
                const parentOffSetTop = this.container.offsetParent ? this.container.offsetParent.offsetTop : 0;
                scrollTop = window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
                offset = (this.container.offsetTop + parentOffSetTop) + (this.container.offsetHeight - scrollTop - window.innerHeight);
            } else {
                scrollTop = this.container.scrollTop;
                offset = (this.container.offsetTop + (this.container.offsetHeight - scrollTop));
            }
            if (offset < offSetTop) {
                this.detachScrollListener();
                this.props.getNextData();
            }
        };

        render () {
            return <Component {...this.props} />;
        }
    }
    WithInfiniteScroll.propTypes = propTypes;
    return WithInfiniteScroll;
};

export default withInfiniteScroll;
