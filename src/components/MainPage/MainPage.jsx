import './MainPage.scss';
import Games from 'components/MainPage/Games';
import HeaderAuthorized from 'components/HeaderAuthorized/HeaderAuthorized';
import React from 'react';

const MainPage = () => {
    return (
        <div>
            <HeaderAuthorized/>
            <div className="st-main-page">
                <div className="container">
                    <div className="st-grid">
                        <div className="st-left-area">
                            {/* <Sidebar/> */}
                        </div>
                        <div className="st-center-area">
                            <Games />
                        </div>
                        <div className="st-right-area ">
                            {/* <SidebarWidget/> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
