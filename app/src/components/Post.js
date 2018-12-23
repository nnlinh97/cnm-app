import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import * as Actions from '../actions/request';
import './../styles/ModalPost.css';
import axios from 'axios';
import PostDetail from './PostDetail';
import { withRouter } from 'react-router-dom';


class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: false,
            user: null
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        document.removeEventListener('mousedown', this.handleClickOutside);
        const publicKey = this.props.match.params.id;
        axios.get(`http://localhost:4200/users/get-info?idKey=${publicKey}`).then((user) => {
            if (user.data.status == 200) {
                this.setState({
                    user: user.data.result
                });
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

    removeModal = () => {
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
    render() {
        const {user} = this.state;
        console.log(user);
        const { post } = this.props;
        const cssModal = this.state.detail ? "block" : "none";
        let avatar = "https://tinyurl.com/yapenv5f";
        let comments = '';
        // if (post.comments.length > 0) {
        //     comments = post.comments.map((comment, index) => {
        //         return (
        //             <div key={index} className="flex border-b border-solid border-grey-light">
        //                 <div className="headerPost-left w-1/8 text-right pl-3 pt-3">
        //                     <a href="#">
        //                         <img src={comment.avatarURL} alt="avatar" className="rounded-full h-12 w-12 mr-2" />
        //                     </a>
        //                 </div>
        //                 <div className="w-7/8 p-3 pl-0">
        //                     <div className="flex justify-between">
        //                         <div>
        //                             <span className="font-bold">
        //                                 <a href="#" className="text-black">{comment.username}</a>
        //                             </span>
        //                             <span className="text-grey-dark">&nbsp;@{comment.username}&nbsp;</span>
        //                             <span className="text-grey-dark">&nbsp;{moment(post.createAt).format('ll')}&nbsp;</span>
        //                         </div>
        //                         <div>
        //                             <a href="#" className="text-grey-dark hover:text-teal">
        //                                 <i className="fa fa-chevron-down" />
        //                             </a>
        //                         </div>
        //                     </div>
        //                     <div className="mb-4">
        //                         <p >{comment.comment}</p>
        //                     </div>
        //                     {/* <div className="mb-4" >
        //                         <div className="pb-2">
        //                             <span className="mr-8">
        //                                 <a onClick={(e) => this.getPost(post, e)} href="" className="text-grey-dark hover:no-underline hover:text-blue-light" title="comments">
        //                                     {post.comments.length > 0 ? <i className="fa fa-comment fa-lg mr-2" /> : <i className="fa fa-comment-o fa-lg mr-2" />}
        //                                     {post.comments.length}
        //                                 </a>
        //                             </span>
        //                             <span className="mr-8">
        //                                 <a href="#" className="text-grey-dark hover:no-underline hover:text-green" title="share">
        //                                     <i className="fa fa-share fa-lg mr-2" /> {post.retweets}</a>
        //                             </span>
        //                             <span className="mr-8">
        //                                 <a onClick={(e) => this.updateLikePost(post, e)} title="like" href="" className="text-grey-dark hover:no-underline hover:text-red">
        //                                     {post.liked ? <i className="fa fa-heart fa-lg mr-2" /> : <i className="fa fa-heart-o fa-lg mr-2" />}
        //                                     {post.likes}
        //                                 </a>
        //                             </span>
        //                         </div>
        //                     </div> */}
        //                 </div>
        //             </div>
        //         )
        //     })
        // }
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
                                <a href="#" className="text-black">@{user ? user.displayName : ""}</a>
                            </span>
                            {/* <span className="text-grey-dark">&nbsp;@{post.username}&nbsp;</span> */}
                            <span className="text-grey-dark">·</span>
                            <span className="text-grey-dark">&nbsp;{moment(post.createAt).format('ll')} </span>
                        </div>

                        {/* start post detail */}
                        {/* <div style={{ display: cssModal }}>
                            <a href="#" className="text-grey-dark hover:text-teal">
                                <i className="fa fa-chevron-down" />
                            </a>
                            <div className="modal4 fade" id="myModal4" role="dialog" style={{ display: 'block' }}>
                                <button onClick={this.removeModal} type="button" className="close" data-dismiss="modal">
                                    <i className="fa fa-times-circle"></i>
                                </button>
                                <div className="modal4-dialog">
                                    <div className="modal4-content" ref={this.state.detail ? this.setWrapperRef : ""}>
                                        <div className="flex border-b border-solid border-grey-light">
                                            <div className="headerPost-left w-1/8 text-right pl-3 pt-3">
                                                <a href="#">
                                                    <img src={post.avatarURL} alt="avatar" className="rounded-full h-12 w-12 mr-2" />
                                                </a>
                                            </div>
                                            <div className="w-7/8 p-3 pl-0">
                                                <div className="flex justify-between">
                                                    <div>
                                                        <span className="font-bold">
                                                            <a href="#" className="text-black">{post.username}</a>
                                                        </span><br />
                                                        <span className="text-grey-dark">@{post.username}&nbsp;</span>
                                                    </div>
                                                    <div>
                                                        <a href="#" className="text-grey-dark hover:text-teal">
                                                            <i className="fa fa-chevron-down" />
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    <p style={{ fontSize: '20px', fontWeight: "bold" }}>{post.content}</p>
                                                    <br />
                                                    {post.image != "" ?
                                                        <img src={post.image} alt="avatar" style={{ width: '90%' }} />
                                                        : ""}
                                                </div>
                                                <div className="mb-4 text-grey-dark">
                                                    <p>{moment(post.creatAt).format('ll')}</p>
                                                </div>
                                                <hr className="line-hr" />
                                                <div className="mb-4 text-grey-dark" style={{ marginTop: '10px' }}>
                                                    <span className="mr-8">{post.retweets} Reweets</span>
                                                    <span className="mr-8">{post.likes} Likes</span>
                                                </div>
                                                <hr className="line-hr" />
                                                <div className="mb-4" style={{ marginTop: '20px' }}>
                                                    <div className="pb-2">
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
                                                            <a onClick={(e) => this.updateLikePost(post, e)} title="like" href="" className="text-grey-dark hover:no-underline hover:text-red">
                                                                {post.liked ? <i className="fa fa-heart fa-lg mr-2" /> : <i className="fa fa-heart-o fa-lg mr-2" />}
                                                                {post.likes}
                                                            </a>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex border-b border-solid border-grey-light backgr">
                                            <div className="headerPost-left w-1/8 text-right pl-3 pt-3">
                                                <a href="#">
                                                    <img src={post.avatarURL} alt="avatar" className="rounded-full h-12 w-12 mr-2 circlePost" />
                                                </a>
                                            </div>
                                            <div className="w-7/8 p-3 pl-0">
                                                <textarea name="reply" placeholder="Tweet your reply" className="form-control user" row="2" ></textarea>
                                                <div className="mb-4 ">
                                                    <div className="imageLeft">
                                                        <label htmlFor="image" style={{ fontSize: '25px', color: '#1DA1F2' }}><i className="fa fa-image" title="Add photo"></i></label>
                                                        <input id="image" type="file" name="image" />
                                                    </div>
                                                    <button className="profile-save rightbtn">Reply</button>
                                                </div>
                                            </div>
                                        </div>

                                        {comments}
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        {/* end post detail */}


                    </div>
                    <div>
                        <div className="mb-4">
                            <p className="mb-6">🎉 {user ? user.idKey : ''}</p>
                            <p style={{ cursor: 'pointer', whiteSpace: 'pre-wrap' }} onClick={(e) => this.getPost(post, e)} className="mb-4">{post.content}</p>
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
                                <a onClick={(e) => this.updateLikePost(post, e)} title="like" href="" className="text-grey-dark hover:no-underline hover:text-red">
                                    {post.liked ? <i className="fa fa-heart fa-lg mr-2" /> : <i className="fa fa-heart-o fa-lg mr-2" />}
                                    {post.likes}
                                </a>

                            </span>
                        </div> */}
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));