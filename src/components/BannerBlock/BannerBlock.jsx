import './BannerBlock.scss';
import BannerCarousel from 'components/BannerBlock/BannerCarousel';
import React from 'react';

const BannerBlock = () => {
    return (
        <div className="st-banner-block" >
            <BannerCarousel style={{id: 1, top: 50, left: 50, width: 250, height: 250}}/>
            <BannerCarousel style={{id: 2, top: 400, left: 50, width: 250, height: 250}}/>
            <BannerCarousel style={{id: 3, top: 50, left: 150, width: 250, height: 250}}/>
            <BannerCarousel style={{id: 4, top: 400, left: 150, width: 250, height: 250}}/>
        </div>
    );
};

export default BannerBlock;
