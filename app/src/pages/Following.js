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
import Axios from 'axios';


class Followings extends Component {
    constructor(props) {
        super(props);
        this.state={
            error: '',
            following: [],
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
        let idKey=this.props.match.params.username
        console.log('username ' + idKey)
        //const idKey = 'GAXVLYJUYND6QKGHK4FGM44XK3U77KJY54VTUJNIORYASOUOHWO63Q7Q'
        Axios.get(`http://localhost:4200/follow/following?idKey=${idKey}`).then(res =>{
            //console.log(res.data)
            if(res.status === 200){
                if(res.data.message === 'success'){
                    this.setState({
                        following:res.data.result
                    })
                }else{
                    this.setState({
                        error: 'Bạn chưa follow ai!'
                    })
                }
            }else{
                return;
            }

        })
        this.props.getProfile();
        this.props.getListPosts();
       // this.props.getListFollowings(idKey);
    }

    render() {
        //const {followings} = this.props;
        let listFollowing ='';
        if(this.state.error !== ''){
            alert(this.state.error)
        }
        let followings = this.state.following;
        console.log(followings)
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
        //followings: state.followings
    }
}

const mapDispatchToProps = (dispatch, action) => {
    return {
        getProfile: () => dispatch(Actions.getProfile()),
        getListPosts: () => dispatch(Actions.getListPosts()),
        //getListFollowings: (idKey) => dispatch(Actions.getListFollowings(idKey))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Followings);