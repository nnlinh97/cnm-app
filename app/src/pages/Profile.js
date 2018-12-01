import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as Actions from '../actions/request';

import Header from '../components/Header';
import CoverImage from '../components/CoverImage';
import MenuTop from '../components/MenuTop';
import Info from '../components/Info';
import Posts from '../components/Posts';
import RightSidebar from '../components/RightSidebar';

class Profile extends Component {
    componentDidMount() {
        this.props.getProfile();
        this.props.getListPosts();
    }

    render() {
        return (
            <div>
                <Header />
                <CoverImage />
                <MenuTop tab="tab1" />
                <div className="container mx-auto flex flex-col lg:flex-row mt-3 text-sm leading-normal">
                    <Info />
                    <Posts />
                    <RightSidebar />
                </div>
            </div>
        );
    }
}

// export default Profile;
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
export default connect(mapStateToProps, mapDispatchToProps)(Profile);