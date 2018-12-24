import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Actions from '../actions/request';

import Header from '../components/Header';
import CoverImage from '../components/CoverImage';
import MenuTop from '../components/MenuTop';
import Info from '../components/Info';
import Posts from '../components/Posts';
import RightSidebar from '../components/RightSidebar';
import InfoNF from '../components/InfoNF';
import PostsNF from '../components/PostsNF';

class Profile extends Component {
    componentDidMount() {
        if (localStorage.getItem('token') == 'false') {
            this.props.history.push('/login');
            return;
        }
        this.props.getProfile();
        this.props.getListPosts();
        //this.props.getListFollowings();
        this.props.getListFollowers();
    }

    render() {
        return (
            <div>
                <Header />
                {/* <MenuTop tab="tab1" /> */}
                <div className="bg-white shadow">
                    <div className="container mx-auto flex flex-col lg:flex-row items-center lg:relative">
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                    </div>
                </div>
                <div className="container mx-auto flex flex-col lg:flex-row mt-3 text-sm leading-normal">
                    <InfoNF />
                    <PostsNF />
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
        getListPosts: () => dispatch(Actions.getListPosts()),
        //getListFollowings: () => dispatch(Actions.getListFollowings()),
        getListFollowers: () => dispatch(Actions.getListFollowers())
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));