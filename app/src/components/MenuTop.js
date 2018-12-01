import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class MenuTop extends Component {

    preventDefault = (e) => {
        e.preventDefault();
    }

    getTweets = (e) => {
        e.preventDefault();
        const user = this.props.match.params.username;
        this.props.history.push(`/${user}`);      
    }

    getFollowings = (e) => {
        e.preventDefault();
        const user = this.props.match.params.username;
        this.props.history.push(`/${user}/followings`);      
    }

    getFollowers = (e) => {
        e.preventDefault();
        const user = this.props.match.params.username;
        this.props.history.push(`/${user}/followers`);      
    }

    render() {
        const { profile } = this.props;
        let avatar = "https://tinyurl.com/yapenv5f";
        if (profile) {
            avatar = profile.avatarURL;
        }
        console.log(this.props.tab);
        const {tab} = this.props;
        let tab1 = " hover:no-underline";
        let tab2 = " hover:no-underline";
        let tab3 = " hover:no-underline";

        let text1 = " hover:text-teal";
        let text2 = " hover:text-teal";
        let text3 = " hover:text-teal";
        if(tab == "tab1"){
            tab1 = " border-teal";
            text1 = " text-teal";
        } else if(tab == "tab2"){
            tab2 = " border-teal";
            text2 = " text-teal";
        } else if(tab == 'tab3'){
            tab3 = " border-teal";
            text3 = " text-teal";
        }
        return (
            <div className="bg-white shadow">
                <div className="container mx-auto flex flex-col lg:flex-row items-center lg:relative">
                    <div className="w-full lg:w-1/4">
                        <img src={avatar} alt="logo" className="rounded-full h-48 w-48 lg:absolute lg:pin-l lg:pin-t lg:-mt-24" />
                    </div>
                    <div className="w-full lg:w-1/2">
                        <ul className="list-reset flex">
                            <li className={`text-center py-3 px-4 border-b-2 border-solid border-transparent${tab1}`}>
                                <a onClick={(e) => this.getTweets(e)} href="" className="text-grey-darker no-underline hover:no-underline">
                                    <div className="text-sm font-bold tracking-tight mb-1">{profile ? "Tweets" : ""}</div>
                                    <div className={`text-lg tracking-tight font-bold${text1}`}>{profile ? profile.tweets : ""}</div>
                                </a>
                            </li>
                            <li className={`text-center py-3 px-4 border-b-2 border-solid border-transparent${tab2}`}>
                                <a onClick={(e) => this.getFollowings(e)} href="" className="text-grey-darker no-underline hover:no-underline">
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
                            {/* <li className="text-center py-3 px-4 border-b-2 border-solid border-transparent hover:border-teal">
                                <a href="#" className="text-grey-darker no-underline hover:no-underline">
                                    <div className="text-sm font-bold tracking-tight mb-1">Likes</div>
                                    <div className="text-lg tracking-tight font-bold hover:text-teal">9</div>
                                </a>
                            </li>
                            <li className="text-center py-3 px-4 border-b-2 border-solid border-transparent hover:border-teal">
                                <a href="#" className="text-grey-darker no-underline hover:no-underline">
                                    <div className="text-sm font-bold tracking-tight mb-1">Moments</div>
                                    <div className="text-lg tracking-tight font-bold hover:text-teal">1</div>
                                </a>
                            </li> */}
                        </ul>
                    </div>
                    <div className="w-full lg:w-1/4 flex my-4 lg:my-0 lg:justify-end items-center">
                        <div className="mr-6">
                            <button className="bg-teal hover:bg-teal-dark text-white font-medium py-2 px-4 rounded-full">
                                Edit Profile
                            </button>
                        </div>
                        <div>
                            <a onClick={(e) => this.preventDefault(e)} href="" className="text-grey-dark">
                                <i className="fa fa-ellipsis-v fa-lg" />
                            </a>
                        </div>
                    </div>
                </div>
                {/* end container */}
            </div>

        );
    }
}

// export default MenuTop;
const mapStateToProps = (state) => {
    return {
        profile: state.profile
    }
}

const mapDispatchToProps = (dispatch, action) => {
    return {
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuTop));