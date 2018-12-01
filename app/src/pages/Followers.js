import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {connect} from 'react-redux';

import * as Actions from '../actions/request';

import Header from '../components/Header';
import CoverImage from '../components/CoverImage';
import MenuTop from '../components/MenuTop';
import Info from '../components/Info';
import Posts from '../components/Posts';
import RightSidebar from '../components/RightSidebar';


class Followers extends Component {
    componentDidMount() {
        this.props.getProfile();
        this.props.getListPosts();
    }

    render() {
        return (
            <div>
                <Header />
                <CoverImage />
                <MenuTop tab="tab3"/>
                <div className="container mx-auto flex flex-col lg:flex-row mt-3 text-sm leading-normal">
                    <Info />
                    list followers
                </div>
            </div>
        );
    }
}

// export default withRouter(Followers);

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch, action) => {
    return {
        getProfile: () => dispatch(Actions.getProfile()),
        getListPosts: () => dispatch(Actions.getListPosts())
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Followers));