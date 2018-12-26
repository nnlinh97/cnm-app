import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import * as Actions from '../actions/request';
import './../styles/ModalPost.css';
import Comment from "./Comment";
import axios from 'axios';
import PostDetail from './PostDetail';
import transaction from '../lib/tx/index';
import { withRouter } from 'react-router-dom';
import v1 from '../lib/tx/v1';
import $ from 'jquery';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: false,
            user: null,
            react: "like-btn-em like-btn-default",
            btnText: "like-btn-text",
            txtLike: "Like",
            like: 0,
            love: 0,
            haha: 0,
            wow: 0,
            sad: 0,
            angry: 0,
            flag: 0,
            comment: [],
            reply: '',
            listLike: null,
            listLove: null,
            listHaha: null,
            listWow: null,
            listSad: null,
            listAngry: null,
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        document.removeEventListener('mousedown', this.handleClickOutside);
        const publicKey = this.props.match.params.id;
        const { post } = this.props;
        let pUser = axios.get(`http://localhost:4200/users/get-info?idKey=${publicKey}`);
        let pPost = axios.get(`http://localhost:4200/reactions?hash=${post.id}`);
        let pComment = axios.get(`http://localhost:4200/comments?hash=${post.id}`);
        Promise.all([pUser, pPost, pComment]).then(([rUser, rPost, rComment]) => {
            if (rUser.data.status == 200 && rPost.data.status == 200 && rComment.data.status == 200) {
                let listReaction = rPost.data.result;
                let like = 0;
                let love = 0;
                let haha = 0;
                let wow = 0;
                let sad = 0;
                let angry = 0;
                let listLike = [];
                let listLove = [];
                let listHaha = [];
                let listWow = [];
                let listSad = [];
                let listAngry = [];
                let flagReaction = 0;
                let idKey = localStorage.getItem('PUBLIC_KEY');
                listReaction.forEach(item => {
                    if (item.account == idKey) {
                        flagReaction = +item.type;
                    }
                    switch (+item.type) {
                        case 0:
                            break;
                        case 1:
                            like += 1;
                            listLike.push(item.account)
                            break;
                        case 2:
                            love += 1;
                            listLove.push(item.account)
                            break;
                        case 3:
                            haha += 1;
                            listHaha.push(item.account)
                            break;
                        case 4:
                            wow += 1;
                            listWow.push(item.account)
                            break;
                        case 5:
                            sad += 1;
                            listSad.push(item.account)
                            break;
                        case 6:
                            angry += 1;
                            listAngry.push(item.account)
                            break;
                    }
                });
                this.setState({
                    like: like,
                    love: love,
                    haha: haha,
                    wow: wow,
                    sad: sad,
                    angry: angry,
                    flag: flagReaction,
                    user: rUser.data.result,
                    comment: rComment.data.result
                });
                this.getListLike(listLike);
                this.getListLove(listLove);
                this.getListHaha(listHaha);
                this.getListWow(listWow);
                this.getListSad(listSad);
                this.getListAngry(listAngry);
            }
        })
    }

    getListLike = (listLike) => {
        if (listLike.length == 0) {
            return;
        }
        let promise = [];
        listLike.forEach(item => {
            promise.push(axios.get(`http://localhost:4200/users/get-info?idKey=${item}`));
        })
        Promise.all(promise).then((result) => {
            let listName = [];
            result.forEach(item => {
                listName.push(item.data.result.displayName !== "" ? (new Buffer(item.data.result.displayName, "base64")).toString('utf8') : item.data.result.idKey);
            });
            this.setState({
                listLike: listName
            })
        })
    }

    getListLove = (listLike) => {
        if (listLike.length == 0) {
            return;
        }
        let promise = [];
        listLike.forEach(item => {
            promise.push(axios.get(`http://localhost:4200/users/get-info?idKey=${item}`));
        })
        Promise.all(promise).then((result) => {
            let listName = [];
            result.forEach(item => {
                listName.push(item.data.result.displayName !== "" ? (new Buffer(item.data.result.displayName, "base64")).toString('utf8') : item.data.result.idKey);
            });
            this.setState({
                listLove: listName
            })
        })
    }
    getListHaha = (listLike) => {
        if (listLike.length == 0) {
            return;
        }
        let promise = [];
        listLike.forEach(item => {
            promise.push(axios.get(`http://localhost:4200/users/get-info?idKey=${item}`));
        })
        Promise.all(promise).then((result) => {
            let listName = [];
            result.forEach(item => {
                listName.push(item.data.result.displayName !== "" ? (new Buffer(item.data.result.displayName, "base64")).toString('utf8') : item.data.result.idKey);
            });
            this.setState({
                listHaha: listName
            })
        })
    }
    getListWow = (listLike) => {
        if (listLike.length == 0) {
            return;
        }
        let promise = [];
        listLike.forEach(item => {
            promise.push(axios.get(`http://localhost:4200/users/get-info?idKey=${item}`));
        })
        Promise.all(promise).then((result) => {
            let listName = [];
            result.forEach(item => {
                listName.push(item.data.result.displayName !== "" ? (new Buffer(item.data.result.displayName, "base64")).toString('utf8') : item.data.result.idKey);
            });
            this.setState({
                listWow: listName
            })
        })
    }
    getListSad = (listLike) => {
        if (listLike.length == 0) {
            return;
        }
        let promise = [];
        listLike.forEach(item => {
            promise.push(axios.get(`http://localhost:4200/users/get-info?idKey=${item}`));
        })
        Promise.all(promise).then((result) => {
            let listName = [];
            result.forEach(item => {
                listName.push(item.data.result.displayName !== "" ? (new Buffer(item.data.result.displayName, "base64")).toString('utf8') : item.data.result.idKey);
            });
            this.setState({
                listSad: listName
            })
        })
    }
    getListAngry = (listLike) => {
        if (listLike.length == 0) {
            return;
        }
        let promise = [];
        listLike.forEach(item => {
            promise.push(axios.get(`http://localhost:4200/users/get-info?idKey=${item}`));
        })
        Promise.all(promise).then((result) => {
            let listName = [];
            result.forEach(item => {
                listName.push(item.data.result.displayName !== "" ? (new Buffer(item.data.result.displayName, "base64")).toString('utf8') : item.data.result.idKey);
            });
            this.setState({
                listAngry: listName
            })
        })
    }

    onHandleChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value,
            error: '',
            success: ''
        });
    }

    onComment = (e) => {
        e.preventDefault();
        if (this.state.reply == '') {
            return;
        }
        const hash = this.props.post.id;
        const publicKey = localStorage.getItem('PUBLIC_KEY');
        axios.get(`http://localhost:4200/users/get-user?idKey=${publicKey}`).then(res => {
            if (res.data.status == 200) {
                let info = res.data.result;
                let tx = {
                    version: 1,
                    sequence: +info.sequence + 1,
                    memo: Buffer.alloc(0),
                    account: publicKey,
                    operation: "interact",
                    params: {
                        object: hash,
                        content: {
                            type: 1,
                            text: this.state.reply
                        }
                    },
                    signature: new Buffer(64)
                }
                const privateKey = localStorage.getItem('PRIVATE_KEY');
                transaction.sign(tx, privateKey);
                const txEncode = '0x' + transaction.encode(tx).toString('hex');
                axios.post('http://localhost:4200/request', { tx: txEncode }).then((response) => {
                    if (response.status === 200) {
                        this.setState({
                            reply: ''
                        })

                    } else {
                        console.log('error');
                    }
                });
            }
        })
    }

    getPost = (post, e) => {
        // console.log(document.getElementById('body'))
        document.getElementById('html').style.overflow = 'hidden';
        e.preventDefault();
        // // console.log(this.state.comment);
        this.setState({
            detail: true
        })

    }

    updateLikePost = (post, e) => {
        e.preventDefault();
        post.likes = post.liked ? (post.likes - 1) : (post.likes + 1);
        post.liked = !post.liked;
        this.props.updateLikePost(post);
    }

    removeModal = (e) => {
        e.preventDefault();
        this.setState({
            detail: false,
            reply: ''
        })
        document.getElementById('html').style.overflow = 'auto';
    }


    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        document.getElementById('body').style.overflow = 'auto';
    }

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    }

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.removeModal();
        }
    }

    onReaction = (e, type) => {
        e.preventDefault();
        const hash = this.props.post.id;
        const publicKey = localStorage.getItem('PUBLIC_KEY');
        axios.get(`http://localhost:4200/users/get-user?idKey=${publicKey}`).then((res) => {
            if (res.data.status == 200) {
                let info = res.data.result;
                let tx = {
                    version: 1,
                    sequence: +info.sequence + 1,
                    memo: Buffer.alloc(0),
                    account: publicKey,
                    operation: "interact",
                    params: {
                        object: hash,
                        content: {
                            type: 2,
                            reaction: type
                        }
                    },
                    signature: new Buffer(64)
                }
                const privateKey = localStorage.getItem('PRIVATE_KEY');
                transaction.sign(tx, privateKey);
                const txEncode = '0x' + transaction.encode(tx).toString('hex');
                axios.post('http://localhost:4200/request', { tx: txEncode }).then((response) => {
                    if (response.status === 200) {
                        this.setState({
                            flag: type
                        })
                    } else {
                        console.log('error');
                    }
                });
            }
        })
    }
    render() {
        const { user } = this.state;
        const { like, love, haha, wow, sad, angry } = this.state;
        let totalReaction = like + love + haha + wow + sad + angry;
        let cssBtnReaction = 'like-btn-em like-btn-default';
        let txtBtnReaction = 'Like';
        let react = "like-btn-emo like-btn-default";
        let btnText = "like-btn-text";
        let txtLike = "Like";
        switch (this.state.flag) {
            case 1:
                react = "like-btn-emo like-btn-like";
                btnText = "like-btn-text like-btn-text-like active";
                txtLike = "Like";
                break;
            case 2:
                react = "like-btn-emo like-btn-love";
                btnText = "like-btn-text like-btn-text-love active";
                txtLike = "Love";
                break;
            case 3:
                react = "like-btn-emo like-btn-haha";
                btnText = "like-btn-text like-btn-text-haha active";
                txtLike = "Haha";
                break;
            case 4:
                react = "like-btn-emo like-btn-wow";
                btnText = "like-btn-text like-btn-text-wow active";
                txtLike = "Wow";
                break;
            case 5:
                react = "like-btn-emo like-btn-sad";
                btnText = "like-btn-text like-btn-text-sad active";
                txtLike = "Sad";
                break;
            case 6:
                react = "like-btn-emo like-btn-angry";
                btnText = "like-btn-text like-btn-text-angry active";
                txtLike = "Angry";
                break;
        }
        // console.log(user);

        // const {user} = this.state;
        const { post } = this.props;
        const cssModal = this.state.detail ? "block" : "none";
        let avatar = "https://tinyurl.com/yapenv5f";
        let comments = '';
        let listComment = this.state.comment;
        if (listComment.length > 0) {
            comments = listComment.map((comment, index) => {
                return (
                    <Comment
                        key={index}
                        comment={comment}
                    />
                )
            })
        }
        return (
            <div className="flex border-b border-solid border-grey-light">
                <div className="w-1/8 text-right pl-3 pt-3">
                    <div>
                        <a href="#">
                            <img src={user && user.avatar !== "" ? user.avatar : avatar} alt="avatar" className="rounded-full h-12 w-12 mr-2" />
                        </a>
                    </div>
                </div>
                <div className="w-7/8 p-3 pl-0">
                    <div className="flex justify-between">
                        <div>
                            <span className="font-bold">
                                <a href="#" className="text-black">{user ? (new Buffer(user.displayName, "base64")).toString('utf8') : ""}</a>
                            </span>
                            {/* <span className="text-grey-dark">&nbsp;@{post.username}&nbsp;</span> */}
                            <span className="text-grey-dark">&nbsp;</span>
                            <span className="text-grey-dark">&nbsp;{moment(post.createAt).format('ll')} </span>
                        </div>

                        {/* start post detail */}
                        <div style={{ display: cssModal }}>
                            <a href="#" className="text-grey-dark hover:text-teal">
                                <i className="fa fa-chevron-down" />
                            </a>
                            <div className="modal4 fade" id="myModal4" role="dialog" style={{ display: 'block' }}>
                                <div className="modal4-dialog">
                                    <div className="modal4-content" ref={this.state.detail ? this.setWrapperRef : ""}>
                                        <div className="flex border-b border-solid border-grey-light">
                                            <div className="headerPost-left w-1/8 text-right pl-3 pt-3">
                                                <a href="#">
                                                    <img src={user && user.avatar !== "" ? user.avatar : avatar} alt="avatar" className="rounded-full h-12 w-12 mr-2" />
                                                </a>
                                            </div>
                                            <div className="w-7/8 p-3 pl-0">
                                                <div className="flex justify-between">
                                                    <div>
                                                        <span className="font-bold">
                                                            <a href="#" className="text-black">
                                                                {user && user.displayName !== '' ? (new Buffer(user.displayName, "base64")).toString('utf8') : (user ? user.idKey : "")}
                                                            </a>
                                                        </span><br />
                                                        <span className="text-grey-dark">&nbsp;{moment(post.createAt).format('ll')}</span>
                                                    </div>
                                                    <div>
                                                        <a onClick={this.removeModal} href="#" className="text-grey-dark hover:text-teal">
                                                            <i style={{ fontSize: '30px', marginTop: '-9px', marginRight: '-7px' }} className="fa fa-times-circle" />
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    <p style={{ fontSize: '20px', fontWeight: "bold", whiteSpace: 'pre-wrap' }}>
                                                        {v1.decodePost(new Buffer(post.content, "base64")).text}
                                                    </p>
                                                    <br />
                                                </div>
                                                <hr className="line-hr" />
                                                <div className="mb-4" style={{ marginTop: '20px' }}>
                                                    <div className="pb-2">

                                                        <span title="comments" style={{ cursor: 'pointer', fontSize: '14px', marginRight: '19px', fontFamily: 'Ubuntu-Regular', fontWeight: 'bold', color: '#7f7f7f' }} >
                                                            <i style={{ fontSize: '19px' }} className="fa fa-comments"></i>&nbsp;&nbsp;
                                                            {this.state.comment.length}
                                                        </span>

                                                        <a className="facebook-reaction">
                                                            <span className="like-btn">
                                                                {!like ? ''
                                                                    :
                                                                    <span title={this.state.listLike ? this.state.listLike.toString() : ""} className="like-btn-emo like-btn-like"></span>
                                                                }
                                                                {!love ? ''
                                                                    :
                                                                    <span title={this.state.listLove ? this.state.listLove.toString() : ""} className="like-btn-emo like-btn-love"></span>
                                                                }
                                                                {!haha ? ''
                                                                    :
                                                                    <span title={this.state.listHaha ? this.state.listHaha.toString() : ""} className="like-btn-emo like-btn-haha"></span>
                                                                }
                                                                {!wow ? ''
                                                                    :
                                                                    <span title={this.state.listWow ? this.state.listWow.toString() : ""} className="like-btn-emo like-btn-wow"></span>
                                                                }
                                                                {!sad ? ''
                                                                    :
                                                                    <span title={this.state.listSad ? this.state.listSad.toString() : ""} className="like-btn-emo like-btn-sad"></span>
                                                                }
                                                                {!angry ? ''
                                                                    :
                                                                    <span title={this.state.listAngry ? this.state.listAngry.toString() : ""} className="like-btn-emo like-btn-angry"></span>
                                                                }

                                                                {!totalReaction ? ''
                                                                    :
                                                                    <span>{totalReaction}</span>
                                                                }

                                                            </span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex border-b border-solid border-grey-light backgr">
                                            <div className="headerPost-left w-1/8 text-right pl-3 pt-3">
                                            </div>
                                            <div className="w-7/8 p-3 pl-0">
                                                <textarea onChange={this.onHandleChange} value={this.state.reply} name="reply" placeholder="Tweet your reply" className="form-control user" row="2" ></textarea>
                                                <div className="mb-4 ">
                                                    <div className="imageLeft">
                                                        <label htmlFor="image" style={{ fontSize: '25px', color: '#1DA1F2' }}><i className="fa fa-image" title="Add photo"></i></label>
                                                        <input id="image" type="file" name="image" />
                                                    </div>
                                                    <button onClick={this.onComment} className="profile-save rightbtn">Reply</button>
                                                </div>
                                            </div>
                                        </div>
                                        {comments}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end post detail */}


                    </div>
                    <div>
                        <div className="mb-4">
                            <p className="mb-6">🎉 {user ? user.idKey : ''}</p>
                            <p style={{ cursor: 'pointer', whiteSpace: 'pre-wrap' }} onClick={(e) => this.getPost(post, e)} className="mb-4">{v1.decodePost(new Buffer(post.content, "base64")).text}</p>
                            {/* <p>
                                {post.image == "" ? "" :
                                    <a onClick={(e) => this.getPost(post, e)} href="#">
                                        <img src={post.image} alt="tweet image" className="border border-solid border-grey-light rounded-sm" />
                                    </a>
                                }
                            </p> */}
                        </div>

                        {/* <div className="pb-2">
                            <span className="mr-8">
                                <a onClick={(e) => this.getPost(post, e)} href="" className="text-grey-dark hover:no-underline hover:text-blue-light" title="comments">
                                    {post.comments.length > 0 ? <i className="fa fa-comment fa-lg mr-2" /> : <i className="fa fa-comment-o fa-lg mr-2" />}
                                    {post.comments.length}
                                </a>
                            </span>
                            <span className="mr-8">
                                <a href="#" className="text-grey-dark hover:no-underline hover:text-green" title="share">
                                    <i className="fa fa-share fa-lg mr-2" /> {post.retweets}</a>
                            </span>
                            <span className="mr-8">
                                {/* <a onClick={(e) => this.updateLikePost(post, e)} title="like" href="" className="text-grey-dark hover:no-underline hover:text-red">
                                    {post.liked ? <i className="fa fa-heart fa-lg mr-2" /> : <i className="fa fa-heart-o fa-lg mr-2" />}
                                    {post.likes}
                                </a> */}

                        <span onClick={(e) => this.getPost(post, e)} title="comments" style={{ cursor: 'pointer', fontSize: '14px', marginRight: '19px', fontFamily: 'Ubuntu-Regular', fontWeight: 'bold', color: '#7f7f7f' }} >
                            <i style={{ fontSize: '19px' }} className="fa fa-comments"></i>&nbsp;&nbsp;
                            {this.state.comment.length}
                        </span>

                        <a className="facebook-reaction">
                            <span className="like-btn">
                                <span onClick={(e) => this.onReaction(e, 0)} className={react}></span>
                                <span className={btnText}>{txtLike}</span>
                                <ul className="reactions-box">
                                    <li onClick={(e) => this.onReaction(e, 1)} className="reaction reaction-like" data-reaction="Like"></li>
                                    <li onClick={(e) => this.onReaction(e, 2)} className="reaction reaction-love" data-reaction="Love"></li>
                                    <li onClick={(e) => this.onReaction(e, 3)} className="reaction reaction-haha" data-reaction="HaHa"></li>
                                    <li onClick={(e) => this.onReaction(e, 4)} className="reaction reaction-wow" data-reaction="Wow"></li>
                                    <li onClick={(e) => this.onReaction(e, 5)} className="reaction reaction-sad" data-reaction="Sad"></li>
                                    <li onClick={(e) => this.onReaction(e, 6)} className="reaction reaction-angry" data-reaction="Angry"></li>
                                </ul>
                            </span>
                        </a>
                        <a className="facebook-reaction">
                            <span className="like-btn">
                                {!like ? ''
                                    :
                                    <span title={this.state.listLike ? this.state.listLike.toString() : ""} className="like-btn-emo like-btn-like"></span>
                                }
                                {!love ? ''
                                    :
                                    <span title={this.state.listLove ? this.state.listLove.toString() : ""} className="like-btn-emo like-btn-love"></span>
                                }
                                {!haha ? ''
                                    :
                                    <span title={this.state.listHaha ? this.state.listHaha.toString() : ""} className="like-btn-emo like-btn-haha"></span>
                                }
                                {!wow ? ''
                                    :
                                    <span title={this.state.listWow ? this.state.listWow.toString() : ""} className="like-btn-emo like-btn-wow"></span>
                                }
                                {!sad ? ''
                                    :
                                    <span title={this.state.listSad ? this.state.listSad.toString() : ""} className="like-btn-emo like-btn-sad"></span>
                                }
                                {!angry ? ''
                                    :
                                    <span title={this.state.listAngry ? this.state.listAngry.toString() : ""} className="like-btn-emo like-btn-angry"></span>
                                }

                                {!totalReaction ? ''
                                    :
                                    <span>{totalReaction}</span>
                                }

                            </span>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

// export default Post;
const mapStateToProps = (state) => {
    return {
        profile: state.profile
    }
}

const mapDispatchToProps = (dispatch, action) => {
    return {
        updateLikePost: (post) => dispatch(Actions.updateLikePost(post))
    }
}
export default withRouter((Post));