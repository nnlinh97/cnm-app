import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { relative } from 'path';

class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: 'none',
            content: '',
            isModal: false,
            editModal: 'none',
            isEditModal: false,
            listImages: [],
            previewImage: [],
            isEditImage: false,
            editImage: 'none',
        }
    }

    toggleEditModal = (profile, e) => {
        e.preventDefault();
        this.setState({
            editModal: 'block',
            isEditModal: true
        })
        document.getElementById('body').style.overflow = 'hidden';
    }

    removeEditModal = () => {
        this.setState({
            editModal: 'none'
        })
        document.getElementById('body').style.overflow = 'auto';
    }

    saveChanges = () => {
        this.removeEditModal()
    }
    render() {

        // console.log(this.props.profile);
        const { profile } = this.props;
        // let tag = '';
        // let joined = '';
        // let location = '';
        // let birthday = '';
        // if (profile) {
        //     tag = '@' + profile.username;
        // joined = (
        //     <div className="mb-4">
        //         <i className="fa fa-calendar fa-lg text-grey-darker mr-1" />
        //         <a href="#" className="text-teal no-underline hover:underline"> Joined {moment(profile.createAt).format('ll')}</a>
        //     </div>
        // );
        // location = (
        //     <div className="mb-4">
        //         &nbsp;<i className="fa fa-map-marker" />
        //         <a href="#" className="text-teal no-underline hover:underline">&nbsp;&nbsp;&nbsp;&nbsp;{profile.location}</a>
        //     </div>
        // );
        // birthday = (
        //     <div className="mb-4">
        //         <i className="fa fa-birthday-cake" />
        //         <a href="#" className="text-teal no-underline hover:underline"> &nbsp;{moment(profile.birthday).format('ll').split(", ")[0]}</a>
        //     </div>
        // )

        // }
        return (
            <div style={{ 'marginTop': '1rem' }} className="w-full lg:w-1/4 pl-4 lg:pl-0 pr-6 mt-8 mb-4">
                <div className="mb-4">
                    <a style={{ fontSize: "20px" }} href="" className="text-black font-bold no-underline hover:underline">huantd &nbsp;</a>
                    <i onClick={(e) => this.toggleEditModal(profile, e)} class="fa fa-pencil fa-lg text-grey-darker ml-1"></i>
                    {/* <a href="#" className="text-black font-bold no-underline hover:underline">{profile ? profile.username : ''}</a> */}
                </div>
                <div className="mb-4" style={{ display: this.state.editModal }} >
                    <div className="w-full lg:w-1/4 pictureAva">
                        {/* <input onChange={this.onHandleChange} value={this.state.name} type="text" className='input-edit' placeholder="Intro" name="name" /><br /> */}
                        <input style={{ fontSize: "20px" }} onChange={this.onHandleChange} value="huantd" type="text" className='input-edit' placeholder="Intro" name="name" /><br />
                    </div>
                    <div className="mr-6">
                        <button onClick={this.removeEditModal} style={{ backgroundColor: '#bbb' }} type="button" className="btn btn-primary radius-button " data-dismiss="modal">
                            Cancel
                        </button>
                        <button onClick={this.saveChanges} type="button" className="btn btn-primary radius-button " data-dismiss="modal">
                            Save Changes
                         </button>

                    </div>
                </div>

                <div className="mb-4">
                    {/* <a href="#" className="text-grey-darker no-underline hover:underline">{tag}</a> */}
                    <a href="#" className="text-grey-darker no-underline hover:underline">
                        @huantd
                    </a>
                </div>
                <div className="modal3 " id="myModal3" role="dialog" style={{ display: this.state.editModal }} >
                    <div className="center-parent" style={{ zIndex: 1 }}>
                        <button onClick={this.removeEditModal} style={{ color: "red" }}>
                            <i className="fa fa-times fa-lg"></i>
                        </button>
                        
                        <div className="previewImage">

                            <img src="https://api.adorable.io/avatars/256/GCD6DHTSLKVMQWOXE4T4S72ZO3T2AMHXZ3DNKMQFSCFQNDYQ5A5VNHTM.png" id="pre" />

                        </div>
                    </div>
                    <div style={{ marginRight: "450px", marginTop: "80px" }}>
                        <button onClick={this.saveChanges} type="button" className="btn btn-primary radius-button " data-dismiss="modal">
                            Save Changes
                            </button>
                        <button onClick={this.removeEditModal} style={{ backgroundColor: '#bbb' }} type="button" className="btn btn-primary radius-button " data-dismiss="modal">
                            Cancel
                            </button>

                    </div>

                </div>



                {/* <div className="mb-4">
                    {profile ? profile.desc : ''} */}
                {/* <a href="#" className="text-teal no-underline hover:underline">@adamwathan</a>,
                        <a href="#" className="text-teal no-underline hover:underline">@reinink</a>,
                        <a href="#" className="text-teal no-underline hover:underline">@davidhemphill</a>, and
                        <a href="#" className="text-teal no-underline hover:underline">@steveschoger</a>. */}
                {/* </div> */}
                {/* {location} */}
                {/* {joined} */}
                {/* {birthday} */}
                <div className="mb-4">
                    <p title="F8F5D98CF83B03F68C5E2E04CE409804B57EAD1D0BAB24531E769D4A267A45A1"
                        style={{
                            width: "250px",
                            color: "#3273dc",
                            whiteSpace: "pre-wrap",
                            cursor: "pointer",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}>
                        GCD6DHTSLKVMQWOXE4T4S72ZO3T2AMHXZ3DNKMQFSCFQNDYQ5A5VNHTM

                    </p>
                </div>
                <div className="mb-4">
                    <p><strong>Sequence</strong>: 1</p>
                    <p><strong>Balance</strong>: 2.00000000 TRE</p>
                    <p><strong>Energy</strong>: 42244 OXY</p>
                    <p><strong>Transactions</strong>: 4</p>
                </div>
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