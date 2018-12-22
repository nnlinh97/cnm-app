import React, { Component } from 'react';

class Follower extends Component {
   
    render() {
        const {follower} = this.props;
        let btnClass = "btn1 bg-white hover:bg-blue-lightest text-blue font-medium py-2 px-4 rounded-full";
        let descBtn = "Follow";
        if(follower.following){
            btnClass = "btn1 bg-blue-light hover:bg-yellow-darker text-white font-medium py-2 px-4 rounded-full";
            descBtn = "Following";
        }
        return (
            <div className="w-full mb-4">
                <div className="ProfileCard">
                    <a className="ProfileCard-bg js-nav" href="#" tabIndex="-1" aria-hidden="true">
                        <img src="https://pbs.twimg.com/profile_banners/813286/1502508746/600x200" alt="" />
                    </a>
                    <div className="ProfileCard-content">
                        <a className="ProfileCard-avatarLink js-nav js-tooltip" href="/nnlinh971" title="nnlinh97" tabIndex="-1" aria-hidden="true">
                            <img className="ProfileCard-avatarImage js-action-profile-avatar " src={follower.avatarURL}
                                alt="" />
                        </a>
                        <div className="ProfileCard-actions">
                            <div className="ProfileCard-userActions with-rightCaret js-userActions">
                                <div className="UserActions   UserActions--small u-textLeft">
                                    <div className="user-actions btn-group not-following not-muting can-dm " data-user-id="18438022" data-screen-name="ShinobiNinja"
                                        data-name="Shinobi Ninja" data-protected="false">
                                        <span className="user-actions-follow-button js-follow-btn follow-button">
                                            {/* <button type="button" class={btnClass}>
                                                <span aria-hidden="true">Follow</span>
                                                <span className="u-hiddenVisually">Follow
                                                                <span className="username u-dir u-textTruncate" dir="ltr">@
                                                                    <b>ShinobiNinja</b>
                                                    </span>
                                                </span>
                                            </button> */}
                                            <button type = "button" className={btnClass}>{descBtn}</button>
                                            {/* <button type="button" className="EdgeButton EdgeButton--primary EdgeButton--small button-text following-text">
                                                <span aria-hidden="true">Following</span>
                                                <span className="u-hiddenVisually">Following
                                                                <span className="username u-dir u-textTruncate" dir="ltr">@
                                                                    <b>ShinobiNinja</b>
                                                    </span>
                                                </span>
                                            </button> */}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ProfileCard-userFields">
                            <div className="ProfileNameTruncated account-group">
                                <div className="u-textTruncate u-inlineBlock">
                                    <a className="fullname ProfileNameTruncated-link u-textInheritColor js-nav" href="/nnlinh971" data-aria-label-part="">
                                        {follower.username}</a>
                                </div>
                                <span className="UserBadges"></span>
                            </div>
                            <span className="ProfileCard-screenname">
                                <a href="/nnlinh971" className="ProfileCard-screennameLink u-linkComplex js-nav" data-aria-label-part="">
                                    <span className="username u-dir" dir="ltr">@
                                            <b className="u-linkComplex-target">nnlinh971</b>
                                    </span>
                                </a>

                            </span>
                            <p className="ProfileCard-bio u-dir" dir="ltr" data-aria-label-part="">{follower.desc}</p>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Follower;