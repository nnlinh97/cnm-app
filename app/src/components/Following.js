import React, { Component } from 'react';


class Following extends Component {
   
    render() {
        const {following} = this.props;
        let btnClass = "btn1 bg-white hover:bg-blue-lightest text-blue font-medium py-2 px-4 rounded-full";
        let descBtn = "Follow";
        if(following.following){
            btnClass = "btn1 bg-blue-light hover:bg-yellow-darker text-white font-medium py-2 px-4 rounded-full";
            descBtn = "Following";
        }
        return (
            <div class="w-full mb-4">
                <div class="ProfileCard">
                    <a class="ProfileCard-bg js-nav" href="#" tabindex="-1" aria-hidden="true">
                        <img src="https://pbs.twimg.com/profile_banners/813286/1502508746/600x200" alt="" />
                    </a>
                    <div class="ProfileCard-content">
                        <a class="ProfileCard-avatarLink js-nav js-tooltip" href="/nnlinh971" title="nnlinh97" tabindex="-1" aria-hidden="true">
                            <img class="ProfileCard-avatarImage js-action-profile-avatar" src={following.avatarURL}
                                alt="" />
                        </a>
                        <div class="ProfileCard-actions">
                            <div class="ProfileCard-userActions with-rightCaret js-userActions">
                                <div class="UserActions   UserActions--small u-textLeft">
                                    <div class="user-actions btn-group not-following not-muting can-dm " data-user-id="18438022" data-screen-name="ShinobiNinja"
                                        data-name="Shinobi Ninja" data-protected="false">
                                        <span class="user-actions-follow-button js-follow-btn follow-button">
                                            {/* <button type="button" class={btnClass}>
                                                <span aria-hidden="true">Follow</span>
                                                <span class="u-hiddenVisually">Follow
                                                                <span class="username u-dir u-textTruncate" dir="ltr">@
                                                                    <b>ShinobiNinja</b>
                                                    </span>
                                                </span>
                                            </button> */}
                                            <button type = "button" class={btnClass}>{descBtn}</button>
                                            {/* <button type="button" class="EdgeButton EdgeButton--primary EdgeButton--small button-text following-text">
                                                <span aria-hidden="true">Following</span>
                                                <span class="u-hiddenVisually">Following
                                                                <span class="username u-dir u-textTruncate" dir="ltr">@
                                                                    <b>ShinobiNinja</b>
                                                    </span>
                                                </span>
                                            </button> */}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="ProfileCard-userFields">
                            <div class="ProfileNameTruncated account-group">
                                <div class="u-textTruncate u-inlineBlock">
                                    <a class="fullname ProfileNameTruncated-link u-textInheritColor js-nav" href="/nnlinh971" data-aria-label-part="">
                                        {following.username}</a>
                                </div>
                                <span class="UserBadges"></span>
                            </div>
                            <span class="ProfileCard-screenname">
                                <a href="/nnlinh971" class="ProfileCard-screennameLink u-linkComplex js-nav" data-aria-label-part="">
                                    <span class="username u-dir" dir="ltr">@
                                            <b class="u-linkComplex-target">nnlinh971</b>
                                    </span>
                                </a>

                            </span>
                            <p class="ProfileCard-bio u-dir" dir="ltr" data-aria-label-part="">{following.desc}</p>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Following;