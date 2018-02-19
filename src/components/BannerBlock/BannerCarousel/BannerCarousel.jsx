import './BannerCarousel.scss';
import {Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption} from 'reactstrap';
import React, { Component } from 'react';

class BannerCarousel extends Component {
    constructor (props) {
        super(props);
        this.state = { activeIndex: 0 };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting () {
        this.animating = true;
    }

    onExited () {
        this.animating = false;
    }

    next () {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === this.props.items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous () {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.props.items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex (newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render () {
        const { activeIndex } = this.state;

        const slides = this.props.items.map((item) => {
            return (
                <CarouselItem
                    className={`custom-tag custom-tag-${item.id}-${this.props.style.id}`}
                    tag="div"
                    key={item.id}
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                >
                    <CarouselCaption className="text-danger" captionText={item.caption} captionHeader={item.altText} />
                </CarouselItem>
            );
        });

        return (
            <div>
                <style>
                    {
                        `.ch-banner-carousel-${this.props.style.id} {
                            position: absolute;
                            ${this.props.style.top ? 'top:' + this.props.style.top : 'bottom:' + this.props.style.bottom}px;
                            ${this.props.style.left ? 'left:' + this.props.style.left : 'right:' + this.props.style.right}px;

                            width: ${this.props.style.width}px;
                            height: ${this.props.style.height}px;
                        }
                        .custom-tag-1-${this.props.style.id}{
                            background-image: url(${this.props.items[0].src});
                        }
                        .custom-tag-2-${this.props.style.id}{
                            background-image: url(${this.props.items[1].src});
                        }
                        .custom-tag-3-${this.props.style.id}{
                            background-image: url(${this.props.items[2].src});
                        }
                      `
                    }
                </style>
                <div className={`ch-banner-carousel-${this.props.style.id}`}>
                    <Carousel
                        activeIndex={activeIndex}
                        next={this.next}
                        previous={this.previous}
                    >
                        <CarouselIndicators items={this.props.items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                        {slides}
                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                    </Carousel>
                </div>
            </div>
        );
    }
}

export default BannerCarousel;
