import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Follower extends Component {
   
    toProFile = (idKey, e) => {
        e.preventDefault();
        this.props.history.push(`/tweets/${idKey}`);
    }
    render() {
        const {follower} = this.props;
        let avatar = "https://tinyurl.com/yapenv5f";
        const displayName = follower.displayName ? follower.displayName : follower.idKey;
        // let btnClass = "btn1 bg-white hover:bg-blue-lightest text-blue font-medium py-2 px-4 rounded-full";
        // let descBtn = "Follow";
        // if(follower.following){
        //     btnClass = "btn1 bg-blue-light hover:bg-yellow-darker text-white font-medium py-2 px-4 rounded-full";
        //     descBtn = "Following";
        return (
            <div className="w-full mb-4">
                <div className="ProfileCard">
                    <a className="ProfileCard-bg js-nav" href="#" tabIndex="-1" aria-hidden="true">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_tailwind_bg.jpg" alt="" />
                    </a>
                    <div className="ProfileCard-content">
                        <a className="ProfileCard-avatarLink js-nav js-tooltip" href="/nnlinh971" title="nnlinh97" tabIndex="-1" aria-hidden="true">
                            <img className="ProfileCard-avatarImage js-action-profile-avatar" src={follower.avatar ? follower.avatar : avatar}
                                alt="" />
                        </a>
                        <div className="ProfileCard-actions">
                            <div className="ProfileCard-userActions with-rightCaret js-userActions">
                                <div className="UserActions   UserActions--small u-textLeft">
                                    <div className="user-actions btn-group not-following not-muting can-dm " data-user-id="18438022" data-screen-name="ShinobiNinja"
                                        data-name="Shinobi Ninja" data-protected="false">
                                        <span className="user-actions-follow-button js-follow-btn follow-button">
                                            {/* <button onClick={() => this.unFollow(following.idKey)} title="unFollow" type="button" className="btn1 bg-blue-light hover:bg-yellow-darker text-white font-medium py-2 px-4 rounded-full">
                                                unFollow
                                            </button> */}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ProfileCard-userFields">
                            <div className="ProfileNameTruncated account-group" >

                                <div className="u-textTruncate u-inlineBlock" style={{ cursor: 'pointer', color: '#1476d8' }}
                                    onClick={(e) => this.toProFile(follower.idKey, e)} >
                                    <a className="fullname ProfileNameTruncated-link u-textInheritColor js-nav" data-aria-label-part=""
                                        style={{ textAlign: 'center', fontSize: '13px' }}>
                                        {displayName}</a>
                                </div><br />
                                <div className="u-textTruncate u-inlineBlock color" style={{ color: 'black' }}>
                                    <div style={{ fontSize: '12px' }} className="fullname ProfileNameTruncated-link u-textTruncate js-nav" data-aria-label-part="">
                                        Sequence: {follower.sequence}
                                    </div>
                                    <div style={{ fontSize: '12px' }} className="ProfileNameTruncated-link u-textTruncate js-nav" data-aria-label-part="">
                                        Balance: {follower.balance} CEL
                                        </div>
                                    {/* <div style={{ fontSize: '12px' }} className="fullname ProfileNameTruncated-link u-textTruncate js-nav" data-aria-label-part="">
                                        Energy: {following.bandwidth} OXY
                                        </div>
                                    <div style={{ fontSize: '12px' }} className="fullname ProfileNameTruncated-link u-textTruncate js-nav" data-aria-label-part="">
                                        BandwidthTime: {bandwidthTime}
                                    </div> */}

                                </div>
                                <span className="UserBadges"></span>
                            </div>

                            {/* <p className="ProfileCard-bio u-dir" dir="ltr" data-aria-label-part="">{following.desc}</p> */}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

// export default Follower;
export default withRouter(Follower);