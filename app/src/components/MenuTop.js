import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getListFollowings } from './../actions/request';
import { checkOXY } from '../utils/helper';
import axios from 'axios';
import * as actions from '../actions/index';
import _ from 'lodash';
import v1 from '../lib/tx/v1';
import transaction from '../lib/tx/index';
import base32 from 'base32.js';

class MenuTop extends Component {
    constructor(props) {
        super(props);
        this.changeAvatar = React.createRef();
        this.state = {
            idKey: '',
            displayName: '',
            tweets: '',
            followings: '',
            followers: '',
            history: '',
            avatar: '',
            // them ben uploadImage
            modal: 'none',
            content: '',
            isModal: false,
            editModal: 'none',
            isEditModal: false,
            isEditImage: false,
            editImage: 'none',
            originalImage: '',
            previewImage: '',
            error: '',
            success: '',
            listFollowings: [],
            followingOfCurrentUser: []
        }
    }

    componentWillReceiveProps(nextProps) {
        const publicKey = nextProps.match.params.id;
        const current = localStorage.getItem('PUBLIC_KEY');
        let pFollower = axios.get(`http://localhost:4200/follow/followerID?idKey=${publicKey}`);
        let pFollowing = axios.get(`http://localhost:4200/follow/followingID?idKey=${publicKey}`);
        let pFollowingCurrent = axios.get(`http://localhost:4200/follow/followingID?idKey=${current}`);
        let pAccount = axios.get(`http://localhost:4200/account/get-account?idKey=${publicKey}`);
        let pTweet = axios.get(`http://localhost:4200/post/get-list-posts?idKey=${publicKey}`);
        let pHistory = axios.get(`http://localhost:4200/transactions?idKey=${publicKey}`);
        Promise.all([pAccount, pFollower, pFollowing, pTweet, pHistory, pFollowingCurrent]).then(([account, follower, following, tweet, history, currentFollowing]) => {
            if (account && follower && following && tweet && history && currentFollowing) {
                let count = 0;
                history.data.result.forEach(item => {
                    if (item.tx.operation == 'payment') {
                        count += 1;
                    }
                });
                this.setState({
                    displayName: account.data.status == 200 ? account.data.result.displayName : "",
                    avatar: account.data.status == 200 ? account.data.result.avatar : "",
                    followers: follower.data.count,
                    followings: following.data.count,
                    tweets: tweet.data.count,
                    history: count,
                    listFollowings: following.data.result,
                    followingOfCurrentUser: currentFollowing.data.result,
                    visitor: publicKey == current ? false : true
                });
            }
        });

    }
    componentDidMount() {
        const publicKey = this.props.match.params.id;
        const current = localStorage.getItem('PUBLIC_KEY');
        let pFollower = axios.get(`http://localhost:4200/follow/followerID?idKey=${publicKey}`);
        let pFollowing = axios.get(`http://localhost:4200/follow/followingID?idKey=${publicKey}`);
        let pFollowingCurrent = axios.get(`http://localhost:4200/follow/followingID?idKey=${current}`);
        let pAccount = axios.get(`http://localhost:4200/account/get-account?idKey=${publicKey}`);
        let pTweet = axios.get(`http://localhost:4200/post/get-list-posts?idKey=${publicKey}`);
        let pHistory = axios.get(`http://localhost:4200/transactions?idKey=${publicKey}`);
        Promise.all([pAccount, pFollower, pFollowing, pTweet, pHistory, pFollowingCurrent]).then(([account, follower, following, tweet, history, currentFollowing]) => {
            if (account && follower && following && tweet && history && currentFollowing) {
                let count = 0;
                history.data.result.forEach(item => {
                    if (item.tx.operation == 'payment') {
                        count += 1;
                    }
                });
                this.setState({
                    displayName: account.data.status == 200 ? account.data.result.displayName : "",
                    avatar: account.data.status == 200 ? account.data.result.avatar : "",
                    followers: follower.data.count,
                    followings: following.data.count,
                    tweets: tweet.data.count,
                    history: count,
                    listFollowings: following.data.result,
                    followingOfCurrentUser: currentFollowing.data.result,
                    visitor: publicKey == current ? false : true
                });
            }
        });

    }

    toTweets = (e) => {
        e.preventDefault();
        const user = this.props.match.params.username;
        this.props.history.push(`/tweets/${this.props.match.params.id}`);
    }

    toFollowing = (e) => {
        e.preventDefault();
        const publicKey = this.props.match.params.id;
        this.props.history.push(`/followings/${publicKey}`);
    }

    toFollowers = (e) => {
        e.preventDefault();
        const publicKey = this.props.match.params.id;
        this.props.history.push(`/followers/${publicKey}`);
    }
    toHistory = (e) => {
        e.preventDefault();
        const publicKey = this.props.match.params.id;
        this.props.history.push(`/history/${publicKey}`);
    }

    onLoadAvatar = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        e.target.value = null;
        reader.onloadend = () => {
            if (file) {
                this.setState({
                    originalImage: file,
                    previewImage: reader.result,
                    error: '',
                    success: ''
                });
            }
        }
        reader.readAsDataURL(file);
    }

    saveChangesAvatar = () => {
        if (this.state.originalImage !== '') {
            let reader = new FileReader();
            let avatarEncode = null
            reader.onload = () => {
                avatarEncode = new Buffer(reader.result, 'binary');
                this.requestToServer(avatarEncode);
            }
            reader.readAsBinaryString(this.state.originalImage);
        }

    }
    requestToServer = (avatarEncode) => {
        const publicKey = localStorage.getItem('PUBLIC_KEY');
        let check = null;
        axios.get(`http://localhost:4200/users/get-user?idKey=${publicKey}`).then(user => {
            if (user.data.status === 200) {
                const info = user.data.result;
                let tx = {
                    version: 1,
                    sequence: +info.sequence + 1,
                    memo: Buffer.alloc(0),
                    account: info.idKey,
                    operation: "update_account",
                    params: {
                        key: 'picture',
                        value: avatarEncode
                    },
                    signature: new Buffer(64)
                }
                try {
                    transaction.encode(tx).toString('hex')
                } catch (error) {
                    this.setState({
                        error: "You don't have enough OXY to update this image!"
                    });
                    this.removeEditModal();
                    return;
                }
                const privateKey = localStorage.getItem('PRIVATE_KEY');
                transaction.sign(tx, privateKey);
                // console.log(check);
                const txEncode = '0x' + transaction.encode(tx).toString('hex');
                check = checkOXY(info, transaction.encode(tx).toString('base64'), new Date()) > +info.bandwidthLimit;
                // console.log(checkOXY(info, transaction.encode(tx).toString('base64'), new Date()));
                // console.log(+info.bandwidthLimit);
                // console.log(check);
                if (check) {
                    this.setState({
                        error: "You don't have enough OXY to update avatar!"
                    });
                    this.removeEditModal();
                    return;
                }
                axios.post('http://localhost:4200/request/image', { tx: txEncode }).then((response) => {
                    // console.log(response);
                    if (response.status === 200) {
                        this.setState({
                            success: 'SUCCESS: Upload successfully!'
                        });
                        this.removeEditModal();
                        return;
                    } else {
                        this.setState({
                            error: 'ERROR: Upload fail fail!'
                        });
                        this.removeEditModal();
                        return;
                    }
                });
            } else {
                this.setState({
                    error: 'ERROR: Get your info fail!'
                });
                return;
            }
        });
    }
    removeEditModal = () => {
        this.setState({
            previewImage: '',
            originalImage: '',
            error: '',
            success: ''
        });
    }

    handleChangeAvatar() {
        this.changeAvatar.current.click()
    }

    onHandleFollow = () => {
        let follow = this.state.followingOfCurrentUser;
        let index = -1;
        // console.log(follow)
        index = _.findIndex(follow, (item) => {
            return this.props.match.params.id == item;
        });
        // console.log(index)
        if (index !== -1) {
            follow.splice(index, 1);
        } else {
            follow.push(this.props.match.params.id);
        }
        const publicKey = localStorage.getItem('PUBLIC_KEY');
        axios.get(`http://localhost:4200/users/get-user?idKey=${publicKey}`).then((user) => {
            if (user.data.status == 200) {
                let addresses = []
                follow.forEach((item) => {
                    addresses.push(Buffer.from(base32.decode(item)))
                });
                const tx = {
                    version: 1,
                    sequence: +user.data.result.sequence + 1,
                    memo: Buffer.alloc(0),
                    account: publicKey,
                    operation: "update_account",
                    params: {
                        key: 'followings',
                        value: {
                            addresses: addresses
                        }
                    },
                    signature: new Buffer(64)
                }
                const privateKey = localStorage.getItem('PRIVATE_KEY');
                transaction.sign(tx, privateKey);
                const txEncode = '0x' + transaction.encode(tx).toString('hex');
                axios.post('http://localhost:4200/request', { tx: txEncode }).then((response) => {
                    if (response.status === 200) {
                        console.log('success');
                    }
                });
            }
        })
    }
    render() {

        if (this.state.error !== '') {
            alert(this.state.error)
        }
        if (this.state.success !== '') {
            alert(this.state.success)
        }

        const count = this.state;
        let avatar = "https://tinyurl.com/yapenv5f";
        const publicKey = localStorage.getItem('PUBLIC_KEY');
        let visitor = false;
        if (this.props.match.params.id !== publicKey) {
            visitor = true;
        }
        const followingOfCurrentUser = count.followingOfCurrentUser;
        let index = -1;
        let btnFollow = '';
        index = _.findIndex(followingOfCurrentUser, (item) => {
            return item == this.props.match.params.id;
        });
        if (index !== -1) {
            btnFollow = 'unfollow'
        } else {
            btnFollow = 'follow'
        }
        const { tab } = this.props;
        let tab1 = " hover:no-underline";
        let tab2 = " hover:no-underline";
        let tab3 = " hover:no-underline";
        let tab4 = " hover:no-underline";

        let text1 = " hover:text-teal";
        let text2 = " hover:text-teal";
        let text3 = " hover:text-teal";
        let text4 = " hover:text-teal";

        if (tab == "tab1") {
            tab1 = " border-teal";
            text1 = " text-teal";
        } else if (tab == "tab2") {
            tab2 = " border-teal";
            text2 = " text-teal";
        } else if (tab == 'tab3') {
            tab3 = " border-teal";
            text3 = " text-teal";
        }

        else if (tab == 'tab4') {
            tab4 = " border-teal";
            text4 = " text-teal";
        }
        return (
            <div className="bg-white shadow">
                <div className="container mx-auto flex flex-col lg:flex-row items-center lg:relative">
                    <div className="avatar w-full lg:w-1/4">
                        <img src={count.avatar ? count.avatar : avatar} alt="logo" className="rounded-full h-48 w-48 lg:absolute lg:pin-l lg:pin-t lg:-mt-24" />

                        {this.state.visitor ? '' :
                            <div className="overlay rounded-full h-48 w-48 lg:absolute lg:pin-l lg:pin-t lg:-mt-24">
                                <div style={{ height: "90px" }}></div>
                                <label style={{ fontSize: '20px' }} onClick={this.handleChangeAvatar.bind(this)}>
                                    <div className="icon">
                                        <i className="fa fa-camera" title="Add photo" style={{ padding: "30px 10px 10px 10px" }}></i>
                                    </div>
                                </label>
                                <input id="image2" type="file" accept="image/*" ref={this.changeAvatar} onChange={(e) => this.onLoadAvatar(e)} />
                            </div>
                        }

                        <div className="modal3 " id="myModal3" role="dialog" style={{ display: this.state.previewImage == '' ? 'none' : 'block' }} >
                            <div className="center-parent" style={{ zIndex: 1 }}>
                                <button onClick={this.removeEditModal} style={{ color: "red", backgroundColor: "antiquewhite" }}>
                                    <i className="fa fa-times-circle"></i>
                                </button>
                                <div className="previewImage">
                                    <img src={this.state.previewImage} id="pre" />
                                </div>
                            </div>
                            <div style={{ marginRight: "530px", marginTop: "80px" }}>
                                <button style={{ marginTop: '65px' }} onClick={this.saveChangesAvatar} type="button" className="btn btn-primary radius-button " data-dismiss="modal">
                                    Save Changes
                            </button >
                                <button onClick={this.removeEditModal} style={{ backgroundColor: '#bbb', marginTop: '65px' }} type="button" className="btn btn-primary radius-button " data-dismiss="modal">
                                    Cancel
                            </button>
                            </div>
                        </div>

                    </div>
                    <div className="w-full lg:w-1/2">
                        <ul className="list-reset flex">
                            <li className={`text-center py-3 px-4 border-b-2 border-solid border-transparent${tab1}`}>
                                <a onClick={this.toTweets} href="" className="text-grey-darker no-underline hover:no-underline">
                                    <div className="text-sm font-bold tracking-tight mb-1">Tweets</div>
                                    <div className={`text-lg tracking-tight font-bold${text1}`}>{count.tweets}</div>
                                </a>
                            </li>
                            <li className={`text-center py-3 px-4 border-b-2 border-solid border-transparent${tab2}`}>
                                <a onClick={(e) => this.toFollowing(e)} href="" className="text-grey-darker no-underline hover:no-underline">
                                    <div className="text-sm font-bold tracking-tight mb-1">Followings</div>
                                    <div className={`text-lg tracking-tight font-bold${text2}`}>{count.followings}</div>
                                </a>
                            </li>
                            <li className={`text-center py-3 px-4 border-b-2 border-solid border-transparent${tab3}`}>
                                <a onClick={(e) => this.toFollowers(e)} href="" className="text-grey-darker no-underline hover:no-underline">
                                    <div className="text-sm font-bold tracking-tight mb-1">Followers</div>
                                    <div className={`text-lg tracking-tight font-bold${text3}`}>{count.followers}</div>
                                </a>
                            </li>
                            <li className={`text-center py-3 px-4 border-b-2 border-solid border-transparent${tab4}`}>
                                <a onClick={(e) => this.toHistory(e)} href="" className="text-grey-darker no-underline hover:no-underline">
                                    <div className="text-sm font-bold tracking-tight mb-1">Payment</div>
                                    <div className={`text-lg tracking-tight font-bold${text4}`}>{count.history}</div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    {!visitor ? ''
                        :
                        <div className="w-full lg:w-1/4 flex my-4 lg:my-0 lg:justify-end items-center">
                            <div className="mr-6">
                                {index !== -1
                                    ?
                                    <button onClick={this.onHandleFollow} className="bg-teal hover:bg-teal-dark text-white font-medium py-2 px-4 rounded-full">
                                        unfollow
                                    </button>
                                    :
                                    <button onClick={this.onHandleFollow} className="bg-teal hover:bg-teal-dark text-white font-medium py-2 px-4 rounded-full">
                                        Follow
                                    </button>
                                }

                            </div>
                        </div>
                    }
                    {/* <div className="w-full lg:w-1/4 flex my-4 lg:my-0 lg:justify-end items-center">
                        <div className="mr-6">
                            <div className="modal2 " id="myModal2" role="dialog" style={{ display: 'none' }} >
                                <div className="modal-dialog">
                                    <div className="modal2-content ">
                                        <div className="grid-container">
                                            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_tailwind_bg.jpg" id="headerImage" className="headerModal" />
                                           
                                            <div className="footerModal">
                                                <div className="picture">
                                                    <div className="lg:justify-end items-center">
                                                        <label htmlFor="image2" style={{ fontSize: '50px' }}><i className="fa fa-camera" title="Add photo"></i></label>
                                                        <input id="image2" type="file" name="image2" onChange={(event) => this.loadFile(event)} />
                                                    </div>
                                                    <div className="w-full lg:w-1/4 pictureAva">

                                                         <img src={avatar} id="avatar" alt="logo" className="circle2" />
                                                        <form className="form2-control">
                                                            <input type="text" className='input-edit' placeholder="Ten" name="user" /><br />
                                                            <input type="text" className='input-edit' placeholder="Vi trí" name="birth" />
                                                            <input type="text" className='input-edit' placeholder="Ten" name="user" /><br />
                                                            <textarea name="reply" placeholder="Tweet your reply" className="input-edit" row="4" ></textarea>
                                                        </form>
                                                    </div>
                                                    <div className="locationBtn w-full lg:w-1/4 flex my-4 lg:my-0 lg:justify-end items-center">
                                                        <div className="mr-6">
                                                            <button style={{ backgroundColor: '#bbb' }} type="button" className="btn btn-primary radius-button " data-dismiss="modal">
                                                                Cancel
                                                            </button>
                                                            <button type="button" className="btn btn-primary radius-button " data-dismiss="modal">
                                                                Save Changes
                                                            </button>

                                                        </div>
                                                    </div>


                                                    <div className="col-sm-10">

                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                     
                    </div> */}
                </div>

                {/* end container */}
            </div>

        );
    }
}

// export default MenuTop;
const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        posts: state.posts,
        following: state.followings,
        count: state.countMenuTop
    }
}

const mapDispatchToProps = (dispatch, action) => {
    return {
        getListFollow: (publicKey) => dispatch(getListFollowings(publicKey)),
        countMenuTop: (count) => dispatch(actions.countMenuTop(count))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuTop));



{/* <div className="modal2 bg-white shadow" id="myModal2" role="dialog" style={{ display: 'block'}} >
<div className="modal-dialog">
    <div className="modal2-content container mx-auto flex flex-col lg:flex-row items-center lg:relative">
        
        <div className="w-full lg:w-1/4">
            <img src={avatar} alt="logo" className="rounded-full h-48 w-48 lg:absolute lg:pin-l lg:pin-t lg:-mt-24" />
        </div>
        <div className="w-full lg:w-1/2">
            <ul className="list-reset flex">
                <li className={`text-center py-3 px-4 border-b-2 border-solid border-transparent${tab1}`}>
                    <a onClick={(e) => this.toTweets(e)} href="" className="text-grey-darker no-underline hover:no-underline">
                        <div className="text-sm font-bold tracking-tight mb-1">{profile ? "Tweets" : ""}</div>
                        <div className={`text-lg tracking-tight font-bold${text1}`}>{profile ? profile.tweets : ""}</div>
                    </a>
                </li>
                <li className={`text-center py-3 px-4 border-b-2 border-solid border-transparent${tab2}`}>
                    <a onClick={(e) => this.toFollowing(e)} href="" className="text-grey-darker no-underline hover:no-underline">
                        <div className="text-sm font-bold tracking-tight mb-1">{profile ? "Following" : ""}</div>
                        <div className={`text-lg tracking-tight font-bold${text2}`}>{profile ? profile.following : ""}</div>
                    </a>
                </li>
                <li  className={`text-center py-3 px-4 border-b-2 border-solid border-transparent${tab3}`}>
                    <a onClick={(e) => this.getFollowers(e)} href="" className="text-grey-darker no-underline hover:no-underline">
                        <div className="text-sm font-bold tracking-tight mb-1">{profile ? "Followers" : ""}</div>
                        <div className={`text-lg tracking-tight font-bold${text3}`}>{profile ? profile.follower : ""}</div>
                    </a>
                </li>

            </ul>
        </div>
    </div>
</div>
</div> */}