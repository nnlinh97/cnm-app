import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as Actions from '../actions/request';

import Header from '../components/Header';
import CoverImage from '../components/CoverImage';
import MenuTop from '../components/MenuTop';
import Info from '../components/Info';
import Posts from '../components/Posts';
import RightSidebar from '../components/RightSidebar';
import Following from '../components/Following'


class Followings extends Component {

    componentDidMount() {
        this.props.getProfile();
        this.props.getListPosts();
        this.props.getListFollowings();
    }

    render() {
        const {followings} = this.props;
        let listFollowing ='';
        if(followings.length > 0){
            listFollowing = followings.map((following, index) => {
                return (
                    <Following
                        key={index}
                        following={following}
                    />
                )
            })
        }
        return (
            <div>
                <Header />
                <CoverImage />
                <MenuTop tab="tab3" />
                <div className="container mx-auto flex flex-col lg:flex-row mt-3 text-sm leading-normal">
                    <Info />
                    <div class="w-full lg:w-3/4 bg-white mb-4">
                        <div class="grid border-b border-solid border-grey-light">
                            {listFollowing}
                            
                        </div>
                    </div>
                    
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
export default connect(mapStateToProps, mapDispatchToProps)(Followings);