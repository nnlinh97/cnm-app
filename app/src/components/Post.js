import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import * as Actions from '../actions/request';
import './../styles/ModalPost.css';

class Post extends Component {
    getPost = (post, e) => {
        e.preventDefault();
    }

    updateLikePost = (post, e) => {
        e.preventDefault();
        post.likes = post.liked ? (post.likes - 1) : (post.likes + 1);
        post.liked = !post.liked;
        this.props.updateLikePost(post);
    }
    render() {
        const { post } = this.props;
        let avatar = "https://tinyurl.com/yapenv5f";
        return (
            <div className="flex border-b border-solid border-grey-light">
                <div className="w-1/8 text-right pl-3 pt-3">
                    <div>
                        <a href="#">
                            <img src={post.avatarURL} alt="avatar" className="rounded-full h-12 w-12 mr-2" />
                        </a>
                    </div>
                </div>
                <div className="w-7/8 p-3 pl-0">
                    <div className="flex justify-between">
                        <div>
                            <span className="font-bold">
                                <a href="#" className="text-black">{post.username}</a>
                            </span>
                            <span className="text-grey-dark">&nbsp;@{post.username}&nbsp;</span>
                            <span className="text-grey-dark">·</span>
                            <span className="text-grey-dark">&nbsp;{moment(post.creatAt).format('ll')} </span>
                        </div>
                        <div>
                            <a href="#" className="text-grey-dark hover:text-teal">
                                <i className="fa fa-chevron-down" />
                            </a>
                            
                            <div className="modal4 fade" id="myModal4" role="dialog" style={{ display: 'block' }}>
                            <button  type="button" className="close" data-dismiss="modal">
                                    <i className="fa fa-times-circle"></i>
                            </button>
                                <div className="modal4-dialog">
                                    <div className="modal4-content">
                                        {/* <div className="profile-body">
                                            <form className="cd-form floating-labels profile-content" id="ajax-contact">
                                                <fieldset>
                                                    <legend>Edit Profile</legend>
                                                    <div className="icon">
                                                        <label className="cd-label" htmlFor="cd-name">Birthday</label>
                                                        <input className="user" type="text" name="cd-name" id="cd-name" required />
                                                    </div>
                                                    <div className="icon">
                                                        <label className="cd-label" htmlFor="cd-company">Location</label>
                                                        <input className="company" type="text" name="cd-company" id="cd-company" />
                                                    </div>
                                                    <div className="icon">
                                                        <label className="cd-label" htmlFor="cd-email">Intro</label>
                                                        <textarea className="message" name="cd-textarea" id="cd-textarea" required defaultValue={""} />
                                                    </div>
                                                    <div className="p-save">
                                                        <button className="profile-save">Save</button>
                                                    </div>
                                                    <div className="p-cancel">
                                                        <button className="profile-cancel">Cancel</button>
                                                    </div>
                                                </fieldset>
                                            </form>
                                            



                                        </div> */}
            {/* phần này là nội dung post*/ }
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
                                                    <p style={{fontSize:'20px', fontWeight:"bold"}}>{post.content}</p>
                                                
                                                
                                                </div>
                                                <div className="mb-4 text-grey-dark">
                                                    <p>{moment(post.creatAt).format('ll')}</p>
                                                
                                                </div>
                                                <hr className="line-hr"/>
                                                <div className="mb-4 text-grey-dark" style={{marginTop:'10px'}}>
                                                    <span className="mr-8">3 Reweets</span>
                                                    <span className="mr-8">3 Likes</span>
                                                </div>
                                                <hr className="line-hr"/>
                                                <div className="mb-4" style={{marginTop:'20px'}}>
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
                                                                {post.liked ? <i className="fa fa-heart fa-lg mr-2" /> : <i className="fa fa-heart-o fa-lg mr-2" /> }
                                                                {/* <i className="fa fa-heart-o fa-lg mr-2" /> */}
                                                                {/* <i className="fa fa-heart fa-lg mr-2" /> */}
                                                                {post.likes}
                                                            </a>

                                                        </span>
                            
                                                    </div>
                                                </div>
                                                

                                            </div>
                                           
                                        </div>
            {/* phần này input*/ }                            
                                        <div className="flex border-b border-solid border-grey-light backgr">
                                            <div className="headerPost-left w-1/8 text-right pl-3 pt-3">
                                                <a href="#">
                                                    <img src={post.avatarURL} alt="avatar" className="rounded-full h-12 w-12 mr-2 circlePost"/>
                                                </a>   
                                            </div>
                                            <div className="w-7/8 p-3 pl-0">
                                                <textarea name="reply"  placeholder="Write your tweet here" className="form-control user" row="2" ></textarea>
                                                <div className="mb-4 ">
                                                    <div className="imageLeft">
                                                        <label htmlFor="image" style={{ fontSize: '25px', color: '#1DA1F2' }}><i className="fa fa-image" title="Add photo"></i></label>
                                                        <input id="image" type="file" name="image" />
                                                    </div>
                                                    <button className="profile-save rightbtn">Follow</button>
                                                </div>
                                            </div>
                                            
                                        </div>
        {/* phần này là nội dung comment*/ }
                                        <div className="flex border-b border-solid border-grey-light">
                                            <div className="headerPost-left w-1/8 text-right pl-3 pt-3">
                                                    <a href="#">
                                                        <img src={post.avatarURL} alt="avatar" className="rounded-full h-12 w-12 mr-2"/>
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
                                                                {post.liked ? <i className="fa fa-heart fa-lg mr-2" /> : <i className="fa fa-heart-o fa-lg mr-2" /> }
                                                                {/* <i className="fa fa-heart-o fa-lg mr-2" /> */}
                                                                {/* <i className="fa fa-heart fa-lg mr-2" /> */}
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
                                                        <img src={post.avatarURL} alt="avatar" className="rounded-full h-12 w-12 mr-2"/>
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
                                                                {post.liked ? <i className="fa fa-heart fa-lg mr-2" /> : <i className="fa fa-heart-o fa-lg mr-2" /> }
                                                                {/* <i className="fa fa-heart-o fa-lg mr-2" /> */}
                                                                {/* <i className="fa fa-heart fa-lg mr-2" /> */}
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
                                                        <img src={post.avatarURL} alt="avatar" className="rounded-full h-12 w-12 mr-2"/>
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
                                                                {post.liked ? <i className="fa fa-heart fa-lg mr-2" /> : <i className="fa fa-heart-o fa-lg mr-2" /> }
                                                                {/* <i className="fa fa-heart-o fa-lg mr-2" /> */}
                                                                {/* <i className="fa fa-heart fa-lg mr-2" /> */}
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
                    </div>
                    <div>
                        <div className="mb-4">
                            <p className="mb-6">🎉 {post.username} is here!</p>
                            <p style={{ cursor: 'pointer' }} onClick={(e) => this.getPost(post, e)} className="mb-4">{post.content}</p>
                            {/* <p className="mb-4">Learn more in our upgrade guide:</p> */}
                            {/* <p className="mb-6">
                                <a href="#" className="text-teal">github.com/tailwind/ta...</a>
                            </p> */}
                            <p>
                                {post.image == "" ? "" :
                                    <a onClick={(e) => this.getPost(post, e)} href="#">
                                        <img src={post.image} alt="tweet image" className="border border-solid border-grey-light rounded-sm" />
                                    </a>
                                }
                            </p>
                        </div>
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
                                    {post.liked ? <i className="fa fa-heart fa-lg mr-2" /> : <i className="fa fa-heart-o fa-lg mr-2" /> }
                                    {/* <i className="fa fa-heart-o fa-lg mr-2" /> */}
                                    {/* <i className="fa fa-heart fa-lg mr-2" /> */}
                                    {post.likes}
                                </a>

                            </span>
                            {/* <span className="mr-8">
                                <a href="#" className="text-grey-dark hover:no-underline hover:text-teal">
                                    ...
                                </a>
                            </span> */}
                        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Post);