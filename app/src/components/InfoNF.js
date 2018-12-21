import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class InfoNF extends Component {
    componentDidMount() {
        console.log(this.props.match.params.id);
    }
    
    toProfile = (e) => {
        e.preventDefault();
        const publicKey = localStorage.getItem('PUBLIC_KEY');
        this.props.history.push(`/users/${publicKey}`);
    }
    render() {
        // const { following } = this.props;
        let btnClass = "btn1 bg-blue-light hover:bg-yellow-darker text-white font-medium py-2 px-4 rounded-full";
        let descBtn = "Following";
        return (
            <div className="w-full lg:w-1/4 pl-4 lg:pl-0 pr-6 mb-4">
                <div className="ProfileCard" style={{marginTop:"0px"}}>
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
                                <div onClick={this.toProfile} className="u-textTruncate u-inlineBlock">
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
                </div>
            </div>
        );
    }
}

// export default InfoNF;
const mapStateToProp = (state) => {
    return {
    }
}
const mapDispathToProp = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProp, mapDispathToProp)(withRouter(InfoNF));