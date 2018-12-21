import React, { Component } from 'react';

class InfoNF extends Component {
    render() {
        const { following } = this.props;
        let btnClass = "btn1 bg-blue-light hover:bg-yellow-darker text-white font-medium py-2 px-4 rounded-full";
        let descBtn = "Following";
        return (
            <div className="w-full lg:w-1/4 pl-4 lg:pl-0 pr-6 mb-4">
                <div className="ProfileCard" style={{ marginTop: "0px" }}>
                    <a className="ProfileCard-bg js-nav" href="#" tabindex="-1" aria-hidden="true">
                        <img src="https://pbs.twimg.com/profile_banners/813286/1502508746/600x200" alt="" />
                    </a>
                    <div className="ProfileCard-content">
                        <a className="ProfileCard-avatarLink js-nav js-tooltip" href="/nnlinh971" title="nnlinh97" tabindex="-1" aria-hidden="true">
                            <img className="ProfileCard-avatarImage js-action-profile-avatar" src="https://abs.twimg.com/sticky/default_profile_images/default_profile_bigger.png   "
                                alt="" />
                        </a>

                        <div className="ProfileCard-userFields">
                            <div className="ProfileNameTruncated account-group">
                                <div className="u-textTruncate u-inlineBlock">
                                    <a className="fullname ProfileNameTruncated-link u-textInheritColor js-nav" href="/nnlinh971" data-aria-label-part="">
                                        tdhuan</a>
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
                        </div>
                    </div>
                    <div class="ProfileCardStats">
                        <div class="ProfileCardStats">
                            <ul className="list-reset flex">
                                <li class="text-center py-3 px-4 border-b-2 border-solid border-transparent border-teal">
                                    <a href="#" class="text-grey-darker no-underline hover:no-underline">
                                        <div class="text-sm font-bold tracking-tight mb-1">Tweets</div>
                                        <div class="text-lg tracking-tight font-bold text-teal">60</div>
                                    </a>
                                </li>
                                <li class="text-center py-3 px-4 border-b-2 border-solid border-transparent hover:border-teal">
                                    <a href="#" class="text-grey-darker no-underline hover:no-underline">
                                        <div class="text-sm font-bold tracking-tight mb-1">Following</div>
                                        <div class="text-lg tracking-tight font-bold hover:text-teal">4</div>
                                    </a>
                                </li>
                                <li class="text-center py-3 px-4 border-b-2 border-solid border-transparent hover:border-teal">
                                    <a href="#" class="text-grey-darker no-underline hover:no-underline">
                                        <div class="text-sm font-bold tracking-tight mb-1">Follower</div>
                                        <div class="text-lg tracking-tight font-bold hover:text-teal">4</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InfoNF;