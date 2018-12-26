import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import * as Actions from '../actions/request';

import Header from '../components/Header';
import CoverImage from '../components/CoverImage';
import MenuTop from '../components/MenuTop';
import Info from '../components/Info';
import Posts from '../components/Posts';
import RightSidebar from '../components/RightSidebar';
import Follower from '../components/Follower';
import axios from 'axios';



class Followers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            followers: []
        }
    }
    

    componentDidMount() {
        if(localStorage.getItem('token') == 'false'){
            this.props.history.push('/');
            return;
        }
        let idKey=this.props.match.params.id;
        axios.get(`http://localhost:4200/follow/follower?idKey=${idKey}`).then(data =>{
            if(data.data.status === 200){
                this.setState({
                    followers: data.data.result
                })
            }
        })
    }

    render() {
        const {followers} = this.state;
        let listFollowers ='';
        if(followers.length > 0){
            listFollowers = followers.map((follower, index) => {
                return (
                    <Follower
                        key={index}
                        follower={follower}
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
                    <div className="w-full lg:w-3/4 bg-white mb-4">
                        <div className="grid border-b border-solid border-grey-light">
                            {listFollowers}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Followers);

