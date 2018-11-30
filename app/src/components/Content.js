import React, { Component } from 'react';
import Info from './Info';
import Posts from './Posts';
import RightSidebar from './RightSidebar';

class Content extends Component {
    render() {
        return (
            <div className="container mx-auto flex flex-col lg:flex-row mt-3 text-sm leading-normal">
                <Info />
                <Posts/>
                <RightSidebar/>
            </div>

        );
    }
}

export default Content;