import React, { Component } from 'react';

class Post extends Component {
    getPost = (post, e) => {
        e.preventDefault();
        console.log(post);
    }
    render() {
        const { post } = this.props;
        
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
                            <span className="text-grey-dark">&nbsp;@{post.username}</span>
                            <span className="text-grey-dark">·</span>
                            <span className="text-grey-dark">1 Dec 2017</span>
                        </div>
                        <div>
                            <a href="#" className="text-grey-dark hover:text-teal">
                                <i className="fa fa-chevron-down" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <div className="mb-4">
                            <p className="mb-6">🎉 {post.username} is here!</p>
                            <p style={{cursor: 'pointer'}} onClick={(e) => this.getPost(post, e)} className="mb-4">{post.content}</p>
                            {/* <p className="mb-4">Learn more in our upgrade guide:</p> */}
                            {/* <p className="mb-6">
                                <a href="#" className="text-teal">github.com/tailwind/ta...</a>
                            </p> */}
                            <p>
                                { post.image == "" ? "" :
                                    <a onClick={(e) => this.getPost(post, e)} href="#">
                                        <img src={post.image} alt="tweet image" className="border border-solid border-grey-light rounded-sm" />
                                    </a>
                                }
                            </p>
                        </div>
                        <div className="pb-2">
                            <span className="mr-8">
                                <a  onClick={(e) => this.getPost(post, e)} href="" className="text-grey-dark hover:no-underline hover:text-blue-light">
                                    <i className="fa fa-comment fa-lg mr-2" /> {post.comments.length}</a>
                            </span>
                            <span className="mr-8">
                                <a href="#" className="text-grey-dark hover:no-underline hover:text-green">
                                    <i className="fa fa-retweet fa-lg mr-2" /> {post.retweets}</a>
                            </span>
                            <span className="mr-8">
                                <a href="#" className="text-grey-dark hover:no-underline hover:text-red">
                                    <i className="fa fa-heart fa-lg mr-2" /> {post.likes}</a>
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

export default Post;