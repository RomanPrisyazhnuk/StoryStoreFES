import './MainPage.scss';
import Games from 'components/MainPage/Games';
import HeaderAuthorized from 'components/HeaderAuthorized/HeaderAuthorized';
import React from 'react';

const MainPage = () => {
    return (
        <React.Fragment>
            <HeaderAuthorized/>
            <div className="col-12">
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
        </React.Fragment>
    );
};

export default MainPage;
