import './BannerBlock.scss';
import BannerCarousel from 'components/BannerBlock/BannerCarousel';
import React from 'react';

const BannerBlock = () => {
    return (
        <div className="st-banner-block" >
            <BannerCarousel style={{id: 1, top: 100, left: 50, width: 450, height: 250}}/>
            <BannerCarousel style={{id: 2, bottom: 65, left: 50, width: 450, height: 250}}/>
            <BannerCarousel style={{id: 3, top: 100, right: 50, width: 450, height: 250}}/>
            <BannerCarousel style={{id: 4, bottom: 65, right: 50, width: 450, height: 250}}/>
        </div>
    );
};

export default BannerBlock;
