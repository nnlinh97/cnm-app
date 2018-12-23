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
    // componentDidMount() {
    //     this.props.getProfile();
    //     this.props.getListPosts();
    //     this.props.getListFollowers();
    // }
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
                // this.props.getListFollowings(data.data.result)
                this.setState({
                    followers: data.data.result
                })
            }
        })
    //     this.props.getProfile();
    //     this.props.getListPosts();
    //    // this.props.getListFollowings(idKey);
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
                            {/* <div class="w-full mb-4">
                                <div class="ProfileCard">
                                    <a class="ProfileCard-bg js-nav" href="#" tabindex="-1" aria-hidden="true">
                                        <img src="https://pbs.twimg.com/profile_banners/813286/1502508746/600x200" alt="" />
                                    </a>
                                    <div class="ProfileCard-content">
                                        <a class="ProfileCard-avatarLink js-nav js-tooltip" href="/nnlinh971" title="nnlinh97" tabindex="-1" aria-hidden="true">
                                            <img class="ProfileCard-avatarImage js-action-profile-avatar" src="https://abs.twimg.com/sticky/default_profile_images/default_profile_bigger.png"
                                                alt="" />
                                        </a>
                                        <div class="ProfileCard-actions">
                                            <div class="ProfileCard-userActions with-rightCaret js-userActions">
                                                <div class="UserActions   UserActions--small u-textLeft">
                                                    <div class="user-actions btn-group not-following not-muting can-dm " data-user-id="18438022" data-screen-name="ShinobiNinja"
                                                        data-name="Shinobi Ninja" data-protected="false">
                                                        <span class="user-actions-follow-button js-follow-btn follow-button">
                                                            <button type="button" class="EdgeButton EdgeButton--secondary EdgeButton--small button-text follow-text">
                                                                <span aria-hidden="true">Follow</span>
                                                                <span class="u-hiddenVisually">Follow
                                                                <span class="username u-dir u-textTruncate" dir="ltr">@
                                                                    <b>ShinobiNinja</b>
                                                                    </span>
                                                                </span>
                                                            </button>
                                                            <button type="button" class="EdgeButton EdgeButton--primary EdgeButton--small button-text following-text">
                                                                <span aria-hidden="true">Following</span>
                                                                <span class="u-hiddenVisually">Following
                                                                <span class="username u-dir u-textTruncate" dir="ltr">@
                                                                    <b>ShinobiNinja</b>
                                                                    </span>
                                                                </span>
                                                            </button>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="ProfileCard-userFields">
                                            <div class="ProfileNameTruncated account-group">
                                                <div class="u-textTruncate u-inlineBlock">
                                                    <a class="fullname ProfileNameTruncated-link u-textInheritColor js-nav" href="/nnlinh971" data-aria-label-part="">
                                                        nnlinh97</a>
                                                </div>
                                                <span class="UserBadges"></span>
                                            </div>
                                            <span class="ProfileCard-screenname">
                                                <a href="/nnlinh971" class="ProfileCard-screennameLink u-linkComplex js-nav" data-aria-label-part="">
                                                    <span class="username u-dir" dir="ltr">@
                                            <b class="u-linkComplex-target">nnlinh971</b>
                                                    </span>
                                                </a>
                                                
                                            </span>
                                            <p class="ProfileCard-bio u-dir" dir="ltr" data-aria-label-part="">Sharing things I'm learning through my foundation work and other interests.</p>                                            
                                        </div>
                                    </div>
                                </div>

                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// export default withRouter(Followers);

const mapStateToProps = (state) => {
    return {
        followers: state.followers
    }
}

const mapDispatchToProps = (dispatch, action) => {
    return {
        // getProfile: () => dispatch(Actions.getProfile()),
        // getListPosts: () => dispatch(Actions.getListPosts()),
        // getListFollowers: () => dispatch(Actions.getListFollowers())
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Followers));