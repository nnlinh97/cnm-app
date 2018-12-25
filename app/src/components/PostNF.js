import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import * as Actions from '../actions/request';
import './../styles/ModalPost.css';
import axios from 'axios';
import PostDetail from './PostDetail';
import { withRouter } from 'react-router-dom';
import Comment from "./Comment";
import v1 from '../lib/tx/v1';
import transaction from '../lib/tx/index';
// import $ from 'jquery';

class PostNF extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: false,
            page: 1,

            account: null,
            address: null,
            operation: null,
            post: null,
            amount: null,
            follow: null,
            avatar: null,
            createAt: null,
            content: null,
            displayName: null,
            avatar: null,


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
            reply: ''
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        document.removeEventListener('mousedown', this.handleClickOutside);
        let { tx } = this.props;
        const publicKey = localStorage.getItem("PUBLIC_KEY");
        axios.get(`http://localhost:4200/users/get-info?idKey=${tx.account}`).then((res) => {
            if (res.data.status == 200) {
                // console.log(tx);
                let operation = tx.operation;
                switch (tx.operation) {
                    case 'create_account':
                        axios.get(`http://localhost:4200/users/get-info?idKey=${tx.address}`).then((address) => {
                            if (address.data.status == 200) {
                                this.setState({
                                    operation: 'created account',
                                    account: res.data.result,
                                    address: address.data.result,
                                    createAt: tx.createAt
                                })
                            }
                        })
                        break;
                    case 'payment':
                        axios.get(`http://localhost:4200/users/get-info?idKey=${tx.address}`).then((address) => {
                            if (address.data.status == 200) {
                                this.setState({
                                    operation: 'sent to',
                                    account: res.data.result,
                                    address: address.data.result,
                                    amount: tx.amount,
                                    createAt: tx.createAt
                                })
                            }
                        })
                        // console.log('payment');
                        break;
                    case 'update_account':
                        // console.log('update_account');
                        switch (tx.tx.params.key) {
                            case 'name':
                                // console.log(tx);
                                // console.log('name');
                                this.setState({
                                    account: res.data.result,
                                    operation: 'updated name',
                                    displayName: tx.displayName,
                                    createAt: tx.createAt
                                })
                                break;
                            case 'picture':
                                this.setState({
                                    account: res.data.result,
                                    operation: 'updated avatar',
                                    avatar: tx.picture,
                                    createAt: tx.createAt
                                })
                                // console.log('picture');
                                break;
                            case 'followings':
                                // console.log(tx);
                                // console.log(tx.followed);
                                if (tx.followed !== "") {
                                    let listFollowed = tx.followed.split(",");
                                    let promise = [];
                                    listFollowed.forEach(item => {
                                        promise.push(axios.get(`http://localhost:4200/users/get-info?idKey=${item}`));
                                    });
                                    Promise.all(promise).then((result) => {
                                        // console.log(result);
                                        let list = [];
                                        result.forEach(item => {
                                            if (item.data.status == 200) {
                                                list.push(item.data.result)
                                            }
                                        });
                                        // console.log(list);
                                        this.setState({
                                            account: res.data.result,
                                            operation: 'update followed',
                                            follow: list,
                                            createAt: tx.createAt
                                        });
                                    });
                                } else {
                                    this.setState({
                                        account: res.data.result,
                                        operation: 'update followed',
                                        follow: [],
                                        createAt: tx.createAt
                                    });
                                }

                                // console.log('followings');
                                break;
                        }
                        // axios.get(`http://localhost:4200/users/get-user?idKey=${tx.account}`)
                        break;
                    case 'post':
                        // console.log(tx);
                        this.setState({
                            account: res.data.result,
                            operation: 'posted',
                            content: tx.content,
                            createAt: tx.createAt
                        })

                        break;
                }
                let pReaction = axios.get(`http://localhost:4200/reactions?hash=${tx.hash}`);
                let pComment = axios.get(`http://localhost:4200/comments?hash=${tx.hash}`);
                Promise.all([pReaction, pComment]).then(([reaction, comment]) => {
                    if (reaction.data.status === 200 && reaction.data.status == 200) {
                        let listReaction = reaction.data.result;
                        let like = 0;
                        let love = 0;
                        let haha = 0;
                        let wow = 0;
                        let sad = 0;
                        let angry = 0;
                        let flagReaction = 0;
                        listReaction.forEach(item => {
                            if (item.account == publicKey) {
                                flagReaction = +item.type;
                            }
                            switch (+item.type) {
                                case 0:
                                    break;
                                case 1:
                                    like += 1;
                                    break;
                                case 2:
                                    love += 1;
                                    break;
                                case 3:
                                    haha += 1;
                                    break;
                                case 4:
                                    wow += 1;
                                    break;
                                case 5:
                                    sad += 1;
                                    break;
                                case 6:
                                    angry += 1;
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
                            comment: comment.data.result
                        });
                    }
                })
            }
        })


    }


    getPost = (post, e) => {
        e.preventDefault();
        this.setState({
            detail: true
        })
        document.getElementById('body').style.overflow = 'hidden';
    }

    updateLikePost = (post, e) => {
        e.preventDefault();
        post.likes = post.liked ? (post.likes - 1) : (post.likes + 1);
        post.liked = !post.liked;
        this.props.updateLikePost(post);
    }

    removeModal = (e) => {
        e.preventDefault()
        this.setState({
            detail: false
        })
        document.getElementById('body').style.overflow = 'auto';
    }


    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    }

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.removeModal();
        }
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
    onReaction = (e, type) => {
        console.log(type);
        console.log(this.props.tx.hash);
        e.preventDefault();
        const hash = this.props.tx.hash;
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
    toProfile = (e) => {
        e.preventDefault();
        // console.log(this.props.tx.account);
        this.props.history.push(`/tweets/${this.props.tx.account}`)
    }
    onComment = (e) => {
        e.preventDefault();
        if (this.state.reply == '') {
            return;
        }
        const hash = this.props.tx.hash;
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
    render() {
        const user = this.state.account;
        const { post } = this.props;
        const { address, follow, content, displayName } = this.state;
        let picture = this.state.avatar;
        const cssModal = this.state.detail ? "block" : "none";
        let avatar = "https://tinyurl.com/yapenv5f";
        let listFollow = '';
        if (follow && follow.length) {
            listFollow = follow.map((item, index) => {
                return (
                    <strong key={index}>{item.displayName !== "" ? item.displayName : item.idKey}<br /></strong>
                )
            })
        }

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
                                <a onClick={this.toProfile} href="" className="text-black">{user && user.displayName !== '' ? user.displayName : (user ? user.idKey : "")}</a>
                            </span>
                            <span className="text-grey-dark">&nbsp;{this.state.createAt ? moment(this.state.createAt).format('ll') : ""}&nbsp;</span>
                            {/* <span className="text-grey-dark">·</span> */}
                            {/* <span className="text-grey-dark">&nbsp;{moment(post.createAt).format('ll')} </span> */}
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
                                                            <a href="#" className="text-black">{user && user.displayName !== '' ? user.displayName : (user ? user.idKey : "")}</a>
                                                        </span><br />
                                                        <span className="text-grey-dark">&nbsp;{this.state.createAt ? moment(this.state.createAt).format('ll') : ""}</span>
                                                    </div>
                                                    <div>
                                                        <a onClick={this.removeModal} href="#" className="text-grey-dark hover:text-teal">
                                                            <i style={{ fontSize: '30px', marginTop: '-9px', marginRight: '-7px' }} className="fa fa-times-circle" />
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    {/* <p style={{ fontSize: '20px', fontWeight: "bold", whiteSpace: 'pre-wrap' }}>{post.content}</p> */}
                                                    <p className="mb-6"> {this.state.operation}</p>
                                                    <p style={{whiteSpace: 'pre-wrap'}}>
                                                        <strong>{address && address.displayName !== "" ? address.displayName : (address ? address.idKey : null)}</strong>
                                                        &nbsp; {this.state.amount ? `${this.state.amount} CEL` : null}
                                                        {listFollow !== "" ? listFollow : null}
                                                        {content ? content : null}
                                                        {displayName ? <strong>{displayName}</strong> : null}
                                                        {picture ? <img src={picture} /> : null}
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
                                                                    <span className="like-btn-emo like-btn-like"></span>
                                                                }
                                                                {!love ? ''
                                                                    :
                                                                    <span className="like-btn-emo like-btn-love"></span>
                                                                }
                                                                {!haha ? ''
                                                                    :
                                                                    <span className="like-btn-emo like-btn-haha"></span>
                                                                }
                                                                {!wow ? ''
                                                                    :
                                                                    <span className="like-btn-emo like-btn-wow"></span>
                                                                }
                                                                {!sad ? ''
                                                                    :
                                                                    <span className="like-btn-emo like-btn-sad"></span>
                                                                }
                                                                {!angry ? ''
                                                                    :
                                                                    <span className="like-btn-emo like-btn-angry"></span>
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
                        <div  onClick={(e) => this.getPost(post, e)} style={{cursor: 'pointer'}} className="mb-4">
                            <p className="mb-6"> {this.state.operation}</p>
                            {/* <p style={{ cursor: 'pointer', whiteSpace: 'pre-wrap' }} onClick={(e) => this.getPost(post, e)} className="mb-4">{post.content}</p> */}
                            {/* <img src={this.state.avatar} /> */}
                            <p>
                                <strong>{address && address.displayName !== "" ? address.displayName : (address ? address.idKey : null)}</strong>
                                &nbsp; {this.state.amount ? `${this.state.amount} CEL` : null}
                                {listFollow !== "" ? listFollow : null}
                                {content ? content : null}
                                {displayName ? <strong>{displayName}</strong> : null}
                                {picture ? <img src={picture} /> : null}
                            </p>
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
                                    <span className="like-btn-emo like-btn-like"></span>
                                }
                                {!love ? ''
                                    :
                                    <span className="like-btn-emo like-btn-love"></span>
                                }
                                {!haha ? ''
                                    :
                                    <span className="like-btn-emo like-btn-haha"></span>
                                }
                                {!wow ? ''
                                    :
                                    <span className="like-btn-emo like-btn-wow"></span>
                                }
                                {!sad ? ''
                                    :
                                    <span className="like-btn-emo like-btn-sad"></span>
                                }
                                {!angry ? ''
                                    :
                                    <span className="like-btn-emo like-btn-angry"></span>
                                }

                                {!totalReaction ? ''
                                    :
                                    <span>{totalReaction}</span>
                                }

                            </span>
                        </a>

                        {/* </span> */}
                        {/* <a className="facebook-reaction">
                            <span className="like-btn">
                                <span className="like-btn-emo like-btn-default"></span>
                                <span className="like-btn-text">Like</span>
                                <ul className="reactions-box">
                                    <li className="reaction reaction-like" data-reaction="Like"></li>
                                    <li className="reaction reaction-love" data-reaction="Love"></li>
                                    <li className="reaction reaction-haha" data-reaction="HaHa"></li>
                                    <li className="reaction reaction-wow" data-reaction="Wow"></li>
                                    <li className="reaction reaction-sad" data-reaction="Sad"></li>
                                    <li className="reaction reaction-angry" data-reaction="Angry"></li>
                                </ul>
                            </span>


                            <div className="like-stat">
                                <span className="like-emo">
                                    <span className="like-btn-like"></span>
                                </span>
                                <span class="like-details">Arkaprava Majumder and 1k others</span>
                            </div>
                        </a> */}
                        {/* </span> */}
                        {/* </div> */}
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostNF));