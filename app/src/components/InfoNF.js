import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getListFollowings } from './../actions/request';
import * as actions from '../actions/index';
import axios from 'axios';
class InfoNF extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idKey: '',
            displayName: '',
            tweets: '',
            followings: '',
            followers: ''
        }
    }
    componentWillReceiveProps(nextProps) {
        let id = nextProps.match.params.id
        this.setState({
            idKey: nextProps.match.params.id,
        })
        if (id !== this.props.match.params.id) {
            this.props.getListFollow(id);
        }
    }
    componentDidMount() {
        //const publicKey = localStorage.getItem('PUBLIC_KEY');
        //const publicKey = 'GAXVLYJUYND6QKGHK4FGM44XK3U77KJY54VTUJNIORYASOUOHWO63Q7Q'
        console.log(this.state.displayName);
        const publicKey = localStorage.getItem("PUBLIC_KEY");
        let pFollower = axios.get(`http://localhost:4200/follow/followerID?idKey=${publicKey}`);
        let pFollowing = axios.get(`http://localhost:4200/follow/followingID?idKey=${publicKey}`);
        let pAccount = axios.get(`http://localhost:4200/account/get-account?idKey=${publicKey}`);
        let pTweet = axios.get(`http://localhost:4200/post/get-list-posts?idKey=${publicKey}`);
        Promise.all([pAccount, pFollower, pFollowing, pTweet]).then(([account, follower, following, tweet]) => {
            if (account && follower && following && tweet) {
                this.props.getProfileNF({
                    avatar: account.data.result.avatar,
                    displayName: account.data.result.displayName,
                    followers: follower.data.count,
                    followings: following.data.count,
                    tweets: tweet.data.count
                })
                this.setState({
                    avatar: account.data.result.avatar,
                    displayName: account.data.result.displayName,
                    followers: follower.data.count,
                    followings: following.data.count,
                    tweets: tweet.data.count
                });
            }
        });
        // .then((account) => {
        //     if (account.data.status === 200){
        //         const info = account.data.result;
        //         this.setState({
        //             displayName: info.displayName
        //         })
        //     }
        // })
        // this.setState({
        //     idKey:this.props.match.params.id
        // })
        // if(this.state.idKey){
        //     this.props.getListFollow(this.state.idKey);
        // }

    }

    toProfile = (e) => {
        e.preventDefault();
        const publicKey = localStorage.getItem('PUBLIC_KEY');
        this.props.history.push(`/tweets/${publicKey}`);
    }
    toFollowing = (e) => {
        e.preventDefault();
        const publicKey = localStorage.getItem('PUBLIC_KEY');
        this.props.history.push(`/followings/${publicKey}`);
    }
    toFollower = (e) => {
        e.preventDefault();
        const publicKey = localStorage.getItem('PUBLIC_KEY');
        this.props.history.push(`/followers/${publicKey}`);
    }
    render() {
        let { following } = this.props;
        let avatar = "https://tinyurl.com/yapenv5f";
        let numberFoll = following.count ? following.count : 0;
        let btnClass = "btn1 bg-blue-light hover:bg-yellow-darker text-white font-medium py-2 px-4 rounded-full";
        let descBtn = "Following";
        const profileNF = this.state;
        return (
            <div className="w-full lg:w-1/4 pl-4 lg:pl-0 pr-6 mb-4">
                <div className="ProfileCard" style={{ marginTop: "0px" }}>
                    <a className="ProfileCard-bg js-nav" href="#" tabindex="-1" aria-hidden="true">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_tailwind_bg.jpg" alt="" />
                    </a>
                    <div className="ProfileCard-content">
                        <a className="ProfileCard-avatarLink js-nav js-tooltip" href="/nnlinh971" title="nnlinh97" tabindex="-1" aria-hidden="true">
                            <img className="ProfileCard-avatarImage js-action-profile-avatar" 
                            src={profileNF.avatar !== '' ? profileNF.avatar : avatar}
                                alt="" />
                        </a>

                        <div className="ProfileCard-userFields">
                            <div className="ProfileNameTruncated account-group">
                                <div onClick={this.toProfile} className="u-textTruncate u-inlineBlock">
                                    <a className="fullname ProfileNameTruncated-link u-textInheritColor js-nav" href="" data-aria-label-part="">
                                        {profileNF.displayName}</a>
                                </div>
                                <span className="UserBadges"></span>
                            </div>
                            {/* <span className="ProfileCard-screenname">
                                <a href="/nnlinh971" className="ProfileCard-screennameLink u-linkComplex js-nav" data-aria-label-part="">
                                    <span className="username u-dir" dir="ltr">@
                                            <b className="u-linkComplex-target">nnlinh971</b>
                                    </span>
                                </a>

                            </span> */}
                        </div>
                    </div>
                    <div class="ProfileCardStats">
                        <div class="ProfileCardStats">
                            <ul className="list-reset flex">
                                <li class="text-center py-3 px-4 border-b-2 border-solid border-transparent border-teal">
                                    <a onClick={this.toProfile} href="" class="text-grey-darker no-underline hover:no-underline">
                                        <div class="text-sm font-bold tracking-tight mb-1">Tweets</div>
                                        <div class="text-lg tracking-tight font-bold text-teal">{profileNF.tweets}</div>
                                    </a>
                                </li>

                                <li class="text-center py-3 px-4 border-b-2 border-solid border-transparent hover:border-teal"
                                    onClick={(e) => this.toFollowing(e)}>
                                    <a href="#" class="text-grey-darker no-underline hover:no-underline">
                                        <div class="text-sm font-bold tracking-tight mb-1" >Following</div>
                                        <div class="text-lg tracking-tight font-bold hover:text-teal">{profileNF.followings}</div>
                                    </a>
                                </li>
                                <li class="text-center py-3 px-4 border-b-2 border-solid border-transparent hover:border-teal"
                                     onClick={(e) => this.toFollower(e)}>
                                    <a href="#" class="text-grey-darker no-underline hover:no-underline">
                                        <div class="text-sm font-bold tracking-tight mb-1">Follower</div>
                                        <div class="text-lg tracking-tight font-bold hover:text-teal">{profileNF.followers}</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// export default InfoNF;
const mapStateToProp = (state) => {
    return {
        following: state.followings,
        profileNF: state.profileNF
    }
}
const mapDispathToProp = (dispatch) => {
    return {
        getListFollow: (publicKey) => dispatch(getListFollowings(publicKey)),
        getProfileNF: (profileNF) => dispatch(actions.getProfileNF(profileNF))
    }
}
export default connect(mapStateToProp, mapDispathToProp)(withRouter(InfoNF));