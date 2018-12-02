import React, { Component } from 'react';
import {connect} from 'react-redux';

import * as Actions from '../actions/request';

import Header from '../components/Header';
import CoverImage from '../components/CoverImage';
import MenuTop from '../components/MenuTop';
import Info from '../components/Info';
import Posts from '../components/Posts';
import RightSidebar from '../components/RightSidebar';

class Following extends Component {

    componentDidMount() {
        this.props.getProfile();
        this.props.getListPosts();
        this.props.getListFollowings();
    }

    render() {
        console.log('followings page');
        console.log(this.props.followings);
        return (
            <div>
                <Header />
                <CoverImage />
                <MenuTop tab="tab2" />
                <div className="container mx-auto flex flex-col lg:flex-row mt-3 text-sm leading-normal">
                    <Info />
                    list following
                </div>
            </div>
        );
    }
}

// export default Following;

const mapStateToProps = (state) => {
    return {
        followings: state.followings
    }
}

const mapDispatchToProps = (dispatch, action) => {
    return {
        getProfile: () => dispatch(Actions.getProfile()),
        getListPosts: () => dispatch(Actions.getListPosts()),
        getListFollowings: () => dispatch(Actions.getListFollowings())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Following);