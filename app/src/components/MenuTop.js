import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class MenuTop extends Component {
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
    getHistory = (e) => {
        e.preventDefault();
        const id = this.props.match.params.id;
        this.props.history.push(`/users/${id}/history`);
    }
    loadFile = (e) => {
        e.preventDefault();
        var reader = new FileReader();
        console.log('haha');
        reader.onload = function () {
            var output = document.getElementById('headerImage');
            output.src = reader.result;
        };
        reader.readAsDataURL(e.target.files[0]);

    }
    onChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value,
        })
    }
    onHandleChooseImage = (e) => {
        console.log('2');
        // let image = e.target.files[0];
        // console.log("1");
        // let reader = new FileReader()
        // reader.onloadend = () => {
        //     if (image) {
        //         this.setState({
        //             previewImage: [...this.state.previewImage, reader.result],
        //             listImages: [...this.state.listImages, image],
        //     
        //         })
        //     }
        // }
        // reader.readAsDataURL(image);
        // e.target.value = null;
        // document.getElementById('body').style.overflow = 'hidden';
    }

    onDelete = (index) => {
        let preImgs = this.state.previewImage;
        preImgs.splice(index, 1);
        let listImgs = this.state.listImages;
        listImgs.splice(index, 1);
        this.setState({
            previewImage: preImgs,
            listImages: listImgs,
        })
        console.log(this.state.listImages);
    }
    removeEditModal = () => {
        this.setState({
            editImage: 'none'
        })
        document.getElementById('body').style.overflow = 'auto';
    }

    saveChanges = () => {
        this.removeEditModal()
    }
    render() {
        // PREVIEW IMAGE
        console.log(this.state.editImage);
        let listPreviewImgs = this.state.previewImage;
        let listPreImgs = null;
        if (listPreviewImgs.length > 0) {
            listPreImgs = listPreviewImgs.map((preImg, index) => {
                return (
                    <div key={index} className="modal3 " id="myModal3" role="dialog" style={{ display: this.state.editModal }} >
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

                )
            })
        }


        // -------------------------------------------------
        const { profile, posts } = this.props;
        let avatar = "https://tinyurl.com/yapenv5f";
        if (profile) {
            avatar = profile.avatarURL;
        }
        const { tab } = this.props;
        let tab1 = " hover:no-underline";
        let tab2 = " hover:no-underline";
        let tab3 = " hover:no-underline";
        let tab4 = " hover:no-underline";

        let text1 = " hover:text-teal";
        let text2 = " hover:text-teal";
        let text3 = " hover:text-teal";
        let text4 = " hover:text-teal";

        if (tab == "tab1") {
            tab1 = " border-teal";
            text1 = " text-teal";
        } else if (tab == "tab2") {
            tab2 = " border-teal";
            text2 = " text-teal";
        } else if (tab == 'tab3') {
            tab3 = " border-teal";
            text3 = " text-teal";
        }
        else if (tab == 'tab4') {
            tab4 = " border-teal";
            text4 = " text-teal";
        }

        return (
            <div className="bg-white shadow">
                <div className="container mx-auto flex flex-col lg:flex-row items-center lg:relative">
                    <div className="avatar w-full lg:w-1/4">
                        <img src="https://api.adorable.io/avatars/256/GCD6DHTSLKVMQWOXE4T4S72ZO3T2AMHXZ3DNKMQFSCFQNDYQ5A5VNHTM.png" alt="logo" className="rounded-full h-48 w-48 lg:absolute lg:pin-l lg:pin-t lg:-mt-24" />

                        <div class="overlay rounded-full h-48 w-48 lg:absolute lg:pin-l lg:pin-t lg:-mt-24">
                            <div style={{ height: "90px" }}></div>
                            <label htmlFor="image2" style={{ fontSize: '20px' }}>
                                <div className="icon">
                                    <i className="fa fa-camera" title="Add photo" style={{ padding: "30px 10px 10px 10px" }}></i>
                                </div>
                            </label>
                            <input id="image2" type="file" accept="image/*" ref="fileUploader" onChange={(e) => this.onHandleChooseImage(e)} />
                        </div>
                        {listPreImgs}

                    </div>
                    <div className="w-full lg:w-1/2">
                        <ul className="list-reset flex">
                            <li className={`text-center py-3 px-4 border-b-2 border-solid border-transparent${tab1}`}>
                                <a onClick={(e) => this.getTweets(e)} href="" className="text-grey-darker no-underline hover:no-underline">
                                    <div className="text-sm font-bold tracking-tight mb-1">{profile ? "Tweets" : ""}</div>
                                    <div className={`text-lg tracking-tight font-bold${text1}`}>{posts.length > 0 ? posts.length : ""}</div>
                                </a>
                            </li>
                            <li className={`text-center py-3 px-4 border-b-2 border-solid border-transparent${tab2}`}>
                                <a onClick={(e) => this.getFollowings(e)} href="" className="text-grey-darker no-underline hover:no-underline">
                                    <div className="text-sm font-bold tracking-tight mb-1">{profile ? "Following" : ""}</div>
                                    <div className={`text-lg tracking-tight font-bold${text2}`}>{profile ? profile.following : ""}</div>
                                </a>
                            </li>
                            <li className={`text-center py-3 px-4 border-b-2 border-solid border-transparent${tab3}`}>
                                <a onClick={(e) => this.getFollowers(e)} href="" className="text-grey-darker no-underline hover:no-underline">
                                    <div className="text-sm font-bold tracking-tight mb-1">{profile ? "Followers" : ""}</div>
                                    <div className={`text-lg tracking-tight font-bold${text3}`}>{profile ? profile.follower : ""}</div>
                                </a>
                            </li>
                            <li className={`text-center py-3 px-4 border-b-2 border-solid border-transparent${tab4}`}>
                                <a onClick={(e) => this.getHistory(e)} href="" className="text-grey-darker no-underline hover:no-underline">
                                    <div className="text-sm font-bold tracking-tight mb-1">{profile ? "History" : ""}</div>
                                    <div className={`text-lg tracking-tight font-bold${text4}`}>{profile ? profile.follower : ""}</div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full lg:w-1/4 flex my-4 lg:my-0 lg:justify-end items-center">
                        <div className="mr-6">
                            {/* <button className="bg-teal hover:bg-teal-dark text-white font-medium py-2 px-4 rounded-full" data-toggle="modal2" data-target="#myModal2">
                                Edit Profile
                            </button> */}

                            {/* start modal edit profile */}
                            <div className="modal2 " id="myModal2" role="dialog" style={{ display: 'none' }} >
                                <div className="modal-dialog">
                                    <div className="modal2-content ">
                                        <div className="grid-container">
                                            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_tailwind_bg.jpg" id="headerImage" className="headerModal" />
                                            {/* <div className="headerModal" >
                                            
                                        </div> */}
                                            <div className="footerModal">
                                                <div className="picture">
                                                    <div className="lg:justify-end items-center">
                                                        <label htmlFor="image2" style={{ fontSize: '50px' }}><i className="fa fa-camera" title="Add photo"></i></label>
                                                        <input id="image2" type="file" name="image2" onChange={(event) => this.loadFile(event)} />
                                                    </div>
                                                    <div className="w-full lg:w-1/4 pictureAva">

                                                        {/* <label htmlFor="image3" className="circle2" style={{fontSize:'80px', background:"#008CBA"}}><i className="fa fa-camera" title="Add photo"></i></label>
                                                        <input id="image3" type="file" name="image3" onChange={(event) => this.loadFile(event)}/> */}
                                                        <img src={avatar} id="avatar" alt="logo" className="circle2" />
                                                        <form className="form2-control">
                                                            <input type="text" className='input-edit' placeholder="Ten" name="user" /><br />
                                                            <input type="text" className='input-edit' placeholder="Vi trí" name="birth" />
                                                            <input type="text" className='input-edit' placeholder="Ten" name="user" /><br />
                                                            <textarea name="reply" placeholder="Tweet your reply" className="input-edit" row="4" ></textarea>
                                                        </form>
                                                    </div>
                                                    <div className="locationBtn w-full lg:w-1/4 flex my-4 lg:my-0 lg:justify-end items-center">
                                                        <div className="mr-6">
                                                            <button style={{ backgroundColor: '#bbb' }} type="button" className="btn btn-primary radius-button " data-dismiss="modal">
                                                                Cancel
                                                            </button>
                                                            <button type="button" className="btn btn-primary radius-button " data-dismiss="modal">
                                                                Save Changes
                                                            </button>

                                                        </div>
                                                    </div>


                                                    <div className="col-sm-10">

                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            {/* end modal edit profile */}
                        </div>
                        {/* <div>
                            <a onClick={(e) => this.preventDefault(e)} href="" className="text-grey-dark">
                                <i className="fa fa-ellipsis-v fa-lg" />
                            </a>
                        </div> */}
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
        profile: state.profile,
        posts: state.posts
    }
}

const mapDispatchToProps = (dispatch, action) => {
    return {
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuTop));



{/* <div className="modal2 bg-white shadow" id="myModal2" role="dialog" style={{ display: 'block'}} >
<div className="modal-dialog">
    <div className="modal2-content container mx-auto flex flex-col lg:flex-row items-center lg:relative">
        
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

            </ul>
        </div>
    </div>
</div>
</div> */}