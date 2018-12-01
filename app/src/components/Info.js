import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class Info extends Component {

    render() {
        console.log(this.props.profile);
        const { profile } = this.props;
        let tag = '';
        let joined = '';
        let location = '';
        let birthday = '';
        if (profile) {
            tag = '@' + profile.username;
            joined = (
                <div className="mb-4">
                    <i className="fa fa-calendar fa-lg text-grey-darker mr-1" />
                    <a href="#" className="text-teal no-underline hover:underline"> Joined {moment(profile.createAt).format('ll')}</a>
                </div>
            );
            location = (
                <div className="mb-4">
                    &nbsp;<i className="fa fa-map-marker" />
                    <a href="#" className="text-teal no-underline hover:underline">&nbsp;&nbsp;&nbsp;&nbsp;{ profile.location}</a>
                </div>
            );
            birthday = (
                <div className="mb-4">
                    <i className="fa fa-birthday-cake" />
                    <a href="#" className="text-teal no-underline hover:underline"> &nbsp;{moment(profile.birthday).format('ll').split(", ")[0]}</a>
                </div>
            )
            
        }
        return (
            <div style={{'marginTop': '0rem'}} className="w-full lg:w-1/4 pl-4 lg:pl-0 pr-6 mt-8 mb-4">
                <h1>
                    <a href="#" className="text-black font-bold no-underline hover:underline">{profile ? profile.username : ''}</a>
                </h1>
                <div className="mb-4">
                    <a href="#" className="text-grey-darker no-underline hover:underline">{tag}</a>
                </div>
                <div className="mb-4">
                    {profile ? profile.desc : ''}
                        {/* <a href="#" className="text-teal no-underline hover:underline">@adamwathan</a>,
                        <a href="#" className="text-teal no-underline hover:underline">@reinink</a>,
                        <a href="#" className="text-teal no-underline hover:underline">@davidhemphill</a>, and
                        <a href="#" className="text-teal no-underline hover:underline">@steveschoger</a>. */}
                </div>
                {location}
                {joined}
                {birthday}
                {/* <div className="mb-4">
                    <button className="bg-teal hover:bg-teal-dark text-white font-medium py-2 px-4 rounded-full w-full h-10">Tweet to Tailwind CSS</button>
                </div> */}
                {/* <div className="mb-4">
                    <i className="fa fa-user fa-lg text-grey-dark mr-1" />
                    <a href="#" className="text-teal no-underline hover:underline">27 Followers you know</a>
                </div>
                <div className="mb-4">
                    <a href="#">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follower01.jpg" alt="avatar" className="rounded-full h-12 w-12" />
                    </a>
                    <a href="#">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follower02.jpg" alt="avatar" className="rounded-full h-12 w-12" />
                    </a>
                    <a href="#">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follower03.jpg" alt="avatar" className="rounded-full h-12 w-12" />
                    </a>
                    <a href="#">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follower04.jpg" alt="avatar" className="rounded-full h-12 w-12" />
                    </a>
                    <a href="#">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follower05.jpg" alt="avatar" className="rounded-full h-12 w-12" />
                    </a>
                    <a href="#">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follower06.jpg" alt="avatar" className="rounded-full h-12 w-12" />
                    </a>
                    <a href="#">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follower07.jpg" alt="avatar" className="rounded-full h-12 w-12" />
                    </a>
                    <a href="#">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follower08.jpg" alt="avatar" className="rounded-full h-12 w-12" />
                    </a>
                    <a href="#">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follower09.jpg" alt="avatar" className="rounded-full h-12 w-12" />
                    </a>
                    <a href="#">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follower10.jpg" alt="avatar" className="rounded-full h-12 w-12" />
                    </a>
                </div> */}
                {/* <div className="mb-4">
                    <i className="fa fa-picture-o fa-lg text-grey-dark mr-1" />
                    <a href="#" className="text-teal">Photos and videos</a>
                </div>
                <div className="mb-4">
                    <a href="#">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_photo1.jpg" alt="photo" className="h-20 w-20 mr-1 mb-1" />
                    </a>
                    <a href="#">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_photo2.jpg" alt="photo" className="h-20 w-20 mr-1 mb-1" />
                    </a>
                    <a href="#">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_photo3.jpg" alt="photo" className="h-20 w-20 mr-1 mb-1" />
                    </a>
                    <a href="#">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_photo4.jpg" alt="photo" className="h-20 w-20 mr-1 mb-1" />
                    </a>
                    <a href="#">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_photo5.jpg" alt="photo" className="h-20 w-20 mr-1 mb-1" />
                    </a>
                </div> */}
            </div>
        );
    }
}

// export default Info;
const mapStateToProps = (state) => {
    return {
        profile: state.profile
    }
}

const mapDispatchToProps = (dispatch, action) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Info);