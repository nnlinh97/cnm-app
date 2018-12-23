import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as Actions from '../actions/request';
import * as actions from '../actions/index';

import Header from '../components/Header';
import CoverImage from '../components/CoverImage';
import MenuTop from '../components/MenuTop';
import Info from '../components/Info';
import Posts from '../components/Posts';
import RightSidebar from '../components/RightSidebar';
import Following from '../components/Following'
import axios from 'axios';


class Followings extends Component {
    constructor(props) {
        super(props);
        this.state={
            error: '',
            followings: [],
            idKey: ''
            
        }
    }
    componentWillReceiveProps(nextProps){

    }
    componentDidMount() {
        if(localStorage.getItem('token') == 'false'){
            this.props.history.push('/');
            return;
        }
        let idKey=this.props.match.params.id;
        axios.get(`http://localhost:4200/follow/following?idKey=${idKey}`).then(data =>{
            if(data.data.status === 200){
                // this.props.getListFollowings(data.data.result)
                this.setState({
                    followings: data.data.result
                })
            }
        })
        this.props.getProfile();
        this.props.getListPosts();
       // this.props.getListFollowings(idKey);
    }

    render() {
        const {followings} = this.state;
        let listFollowing = '';
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
                <MenuTop tab="tab2" />
                <div className="container mx-auto flex flex-col lg:flex-row mt-3 text-sm leading-normal">
                    <Info />
                    <div className="w-full lg:w-3/4 bg-white mb-4">
                        <div className="grid border-b border-solid border-grey-light">
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
        getListFollowings: (followings) => dispatch(actions.getListFollowings(followings))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Followings);