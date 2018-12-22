import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment'
class Following extends Component {
    toProFile = (e) => {
        let publicKey = this.props.following.idKey
        e.preventDefault();
        //const publicKey = localStorage.getItem('PUBLIC_KEY');
        this.props.history.push(`/users/${publicKey}`);
    }
    render() {
        const { following } = this.props;
        const displayName = following.displayName ? following.displayName : following.idKey;
        const bandwidthTime = moment(following.bandwidthTime).format('DD-MM-YYYY');;
        //const bandwidthDate = moment(bandwidthTime).format('DD-MM-YYYY');
        let btnClass = "btn1 bg-blue-light hover:bg-yellow-darker text-white font-medium py-2 px-4 rounded-full";
        let descBtn = "Following";

        // chỗ này bị sai sai
        // if (following.following) {
        //     btnClass = "btn1 bg-white hover:bg-blue-lightest text-blue font-medium py-2 px-4 rounded-full";
        //     descBtn = "Follow";
        // }
        return (
            <div className="w-full mb-4">
                <div className="ProfileCard">
                    <a className="ProfileCard-bg js-nav" href="#" tabIndex="-1" aria-hidden="true">
                        <img src="https://pbs.twimg.com/profile_banners/813286/1502508746/600x200" alt="" />
                    </a>
                    <div className="ProfileCard-content">
                        <a className="ProfileCard-avatarLink js-nav js-tooltip" href="/nnlinh971" title="nnlinh97" tabIndex="-1" aria-hidden="true">
                            <img className="ProfileCard-avatarImage js-action-profile-avatar" src={following.avata}
                                alt="" />
                        </a>
                        <div className="ProfileCard-actions">
                            <div className="ProfileCard-userActions with-rightCaret js-userActions">
                                <div className="UserActions   UserActions--small u-textLeft">
                                    <div className="user-actions btn-group not-following not-muting can-dm " data-user-id="18438022" data-screen-name="ShinobiNinja"
                                        data-name="Shinobi Ninja" data-protected="false">
                                        <span className="user-actions-follow-button js-follow-btn follow-button">
                                            {/* <button type="button" className={btnClass}>
                                                <span aria-hidden="true">Follow</span>
                                                <span className="u-hiddenVisually">Follow
                                                                <span className="username u-dir u-textTruncate" dir="ltr">@
                                                                    <b>ShinobiNinja</b>
                                                    </span>
                                                </span>
                                            </button> */}
                                            <button type="button" className={btnClass}>{descBtn}</button>
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
                            <div className="ProfileNameTruncated account-group" >

                                <div className="u-textTruncate u-inlineBlock" style={{ cursor: 'pointer', color: '#1476d8' }} onClick={(e) => this.toProFile(e)} >
                                    <a className="fullname ProfileNameTruncated-link u-textInheritColor js-nav" data-aria-label-part="" style={{ textAlign: 'center' }}>
                                        {displayName}</a>
                                </div><br />
                                <div className="u-textTruncate u-inlineBlock color" style={{ color: 'black' }}>
                                    <div className="fullname ProfileNameTruncated-link u-textTruncate js-nav" data-aria-label-part="">
                                        Sequence: {following.sequence}</div>
                                    <div className="ProfileNameTruncated-link u-textTruncate js-nav" data-aria-label-part="">
                                        Balance: {following.balance} TRE</div>
                                    <div className="fullname ProfileNameTruncated-link u-textTruncate js-nav" data-aria-label-part="">
                                        Energy: {following.bandwidth} OXY</div>


                                    <div className="fullname ProfileNameTruncated-link u-textTruncate js-nav" data-aria-label-part="">
                                        BandwidthTime: {bandwidthTime}</div>


                                </div>



                                <span className="UserBadges"></span>
                            </div>

                            <p className="ProfileCard-bio u-dir" dir="ltr" data-aria-label-part="">{following.desc}</p>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default withRouter(Following);