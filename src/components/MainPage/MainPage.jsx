import './MainPage.scss';
import Games from 'components/MainPage/Games';
import HeaderAuthorized from 'components/HeaderAuthorized/HeaderAuthorized';
import NavigationPanel from 'components/NavigationPanel';
import React from 'react';
import Sidebar from 'components/Sidebar';

const MainPage = () => {
    return (
        <React.Fragment>
            <HeaderAuthorized/>
            <div className='col-12'>
                <div className='st-grid'>
                    <div className='st-left-area'>
                        <NavigationPanel/>
                    </div>
                    <div className='st-center-area'>
                        <Games />
                    </div>
                    <div className='st-right-area'>
                        <Sidebar/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default MainPage;
