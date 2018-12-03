import React, { Component } from 'react';
import moment from 'moment';

class PostDetail extends Component {
    render() {
        const {post} = this.props;
        return (
            <div style={{ display: 'block' }}>
                <a href="#" className="text-grey-dark hover:text-teal">
                    <i className="fa fa-chevron-down" />
                </a>
                <div className="modal4 fade" id="myModal4" role="dialog" style={{ display: 'block' }}>
                    <button type="button" className="close" data-dismiss="modal">
                        <i className="fa fa-times-circle"></i>
                    </button>
                    <div className="modal4-dialog">
                        <div className="modal4-content">
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
                                        <div className="p-save btn-follow">
                                            <button className="profile-save ">Follow</button>
                                        </div>
                                        <div>

                                            <a href="#" className="text-grey-dark hover:text-teal">
                                                <i className="fa fa-chevron-down" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <p style={{ fontSize: '20px', fontWeight: "bold" }}>{post.content}</p>


                                    </div>
                                    <div className="mb-4 text-grey-dark">
                                        <p>{moment(post.creatAt).format('ll')}</p>

                                    </div>
                                    <hr className="line-hr" />
                                    <div className="mb-4 text-grey-dark" style={{ marginTop: '10px' }}>
                                        <span className="mr-8">3 Reweets</span>
                                        <span className="mr-8">3 Likes</span>
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
                                    <textarea name="reply" placeholder="Write your tweet here" className="form-control user" row="2" ></textarea>
                                    <div className="mb-4 ">
                                        <div className="imageLeft">
                                            <label htmlFor="image" style={{ fontSize: '25px', color: '#1DA1F2' }}><i className="fa fa-image" title="Add photo"></i></label>
                                            <input id="image" type="file" name="image" />
                                        </div>
                                        <button className="profile-save rightbtn">Follow</button>
                                    </div>
                                </div>

                            </div>
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
                                            </span>
                                            <span className="text-grey-dark">&nbsp;@{post.username}&nbsp;</span>
                                            <span className="text-grey-dark">&nbsp;{moment(post.creatAt).format('ll')}&nbsp;</span>
                                        </div>
                                        <div>

                                            <a href="#" className="text-grey-dark hover:text-teal">
                                                <i className="fa fa-chevron-down" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <p >{post.content}</p>


                                    </div>



                                    <div className="mb-4" >
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
                                            </span>
                                            <span className="text-grey-dark">&nbsp;@{post.username}&nbsp;</span>
                                            <span className="text-grey-dark">&nbsp;{moment(post.creatAt).format('ll')}&nbsp;</span>
                                        </div>
                                        <div>

                                            <a href="#" className="text-grey-dark hover:text-teal">
                                                <i className="fa fa-chevron-down" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <p >{post.content}</p>


                                    </div>



                                    <div className="mb-4" >
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
                                            </span>
                                            <span className="text-grey-dark">&nbsp;@{post.username}&nbsp;</span>
                                            <span className="text-grey-dark">&nbsp;{moment(post.creatAt).format('ll')}&nbsp;</span>
                                        </div>
                                        <div>

                                            <a href="#" className="text-grey-dark hover:text-teal">
                                                <i className="fa fa-chevron-down" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <p >{post.content}</p>
                                    </div>
                                    <div className="mb-4" >
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
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PostDetail;