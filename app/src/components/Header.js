import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Actions from './../actions/request';
import './../styles/modal2.css';
import { logout } from './../actions/request';
import Generate from './Generate'
import { openAccount } from './../actions';
import axios from 'axios';
import transaction from '../lib/tx/index';
import v1 from '../lib/tx/v1';
var randomString = require('random-string');


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: 'none',
            content: '',
            isModal: false,
            editModal: 'none',
            isEditModal: false,
            location: this.props.profile ? this.props.profile.location : "",
            desc: this.props.profile ? this.props.profile.desc : "",
            name: this.props.profile ? this.props.profile.username : "",
            accModal: 'none',
            isAccount: false,
            // name: this.props.profile ? this.props.profile.username : ""

            error: '',
            success: ''
        }
    }

    toggleModal = () => {
        this.setState({
            modal: 'block',
            isModal: true,
        })
        document.getElementById('body').style.overflow = 'hidden';
    }

    removeModal = () => {
        this.setState({
            modal: 'none',
            isModal: false,
            error: '',
            success: ''
        })
        document.getElementById('body').style.overflow = 'auto';
    }
    toggleAccountModal = () => {
        this.props.openModalAcc()
        document.getElementById('body').style.overflow = 'hidden';
    }
    removeAccountModal = () => {
        this.setState({
            isAccount: false
        })
        document.getElementById('body').style.overflow = 'auto';
    }
    preventDefault = (e) => {
        e.preventDefault();
    }

    signOut = (e) => {
        e.preventDefault();
        localStorage.setItem('token', false);
        localStorage.setItem('PRIVATE_KEY', '');
        localStorage.setItem('PUBLIC_KEY', '');
        this.props.logout();
        this.props.history.push('/login');
    }

    onHandleChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value,
            error: '',
            success: ''
        });
    }

    onHandleSubmit = () => {
        const { content } = this.state;
        console.log(content);
        if (content == '') {
            this.setState({
                error: 'ERROR: Tweet is empty!',
            });
            return;
        }
        const publicKey = localStorage.getItem('PUBLIC_KEY');
        axios.get(`http://localhost:4200/users/get-user?idKey=${publicKey}`).then((user) => {
            if (user.data.status === 200) {
                const info = user.data.result;
                let tx = {
                    version: 1,
                    account: info.idKey,
                    sequence: +info.sequence + 1,
                    memo: Buffer.alloc(0),
                    operation: 'post',
                    params: {
                        content: {
                            type: 1,
                            text: content,
                        },
                        keys: []
                    },
                    signature: new Buffer(64)
                }
                try {
                    transaction.encode(tx).toString('hex');
                } catch (error) {
                    this.setState({
                        error: 'ERROR: Encode transaction fail!'
                    });
                    return;
                }
                const privateKey = localStorage.getItem('PRIVATE_KEY');
                transaction.sign(tx, privateKey);
                const txEncode = '0x' + transaction.encode(tx).toString('hex');
                axios.post('http://localhost:4200/request', { tx: txEncode }).then((response) => {
                    if (response.status === 200) {
                        this.setState({
                            success: 'SUCCESS: Post successfully!',
                            content: ''
                        });
                        this.removeModal();
                    } else {
                        this.setState({
                            error: 'ERROR: Request fail!'
                        });
                    }
                });
            } else {
                this.setState({
                    error: 'ERROR: Get your info fail!'
                });
            }
        })
        // this.removeModal();
        // this.props.createNewPost(item);

    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    }

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.removeModal();
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

    onCreateAccout = (e) => {
        e.preventDefault();
        this.props.history.push('/create')
    }

    onPayment = (e) => {
        e.preventDefault();
        this.props.history.push('/payment');
    }
    onClickToTwitter = (e) => {
        e.preventDefault();
        this.props.history.push('/')
    }

    toProfile = (e) => {
        e.preventDefault();
        const publicKey = localStorage.getItem('PUBLIC_KEY');
        this.props.history.push(`/tweets/${publicKey}`);
    }
    render() {
        const { profile } = this.props;
        let avatar = "https://tinyurl.com/yapenv5f";
        if (profile) {
            avatar = profile.avatarURL;
        }
        let accModal = this.props.toogle === true ? <Generate /> : <div></div>


        if(this.state.error !== ''){
            alert(this.state.error)
        }
        if(this.state.success !== ''){
            alert(this.state.success)
        }


        return (
            <div className="bg-white" style={{ position: 'fixed', width: '100%', zIndex: 1 }}>
                <div className="container mx-auto flex flex-col lg:flex-row items-center py-4">
                    <nav className="w-full lg:w-2/5">
                        {/* <a onClick={(e) => this.preventDefault(e)} href="" className="text-grey-darker text-sm mr-4 font-semibold pb-6 border-b-2 border-solid border-transparent no-underline hover:text-teal hover:border-teal hover:no-underline">
                            <i className="fa fa-home fa-lg" /> Home</a> */}
                        <a onClick={this.onClickToTwitter} href="" className="text-grey-darker text-sm mr-4 font-semibold pb-6 border-b-2 border-solid border-transparent no-underline hover:text-teal hover:border-teal hover:no-underline">
                            <i className="fa fa-home fa-lg" />&nbsp;
                             Home</a>
                        <a onClick={this.toProfile} style={{ marginLeft: '2rem' }} href="" className="text-grey-darker text-sm mr-4 font-semibold pb-6 border-b-2 border-solid border-transparent no-underline hover:text-teal hover:border-teal hover:no-underline">
                            <i className="fa fa-user-circle fa-lg" />&nbsp;
                             Profile</a>
                        {/* <a href="#" className="text-grey-darker text-sm mr-4 font-semibold pb-6 border-b-2 border-solid border-transparent no-underline hover:text-teal hover:border-teal hover:no-underline">
                            <i className="fa fa-envelope fa-lg" /> Messages
                            </a> */}
                    </nav>
                    <div className="w-full lg:w-1/5 text-center my-4 lg:my-0">
                        <a onClick={(e) => this.preventDefault(e)} href="">
                            <i className="fa fa-twitter fa-lg text-blue" />
                        </a>
                    </div>
                    <div className="w-full lg:w-2/5 flex lg:justify-end">
                        <div className="mr-4 relative">
                            <input type="text" className="bg-grey-lighter h-8 px-4 py-2 text-xs w-48 rounded-full" placeholder="Search Twitter" />
                            <span style={{ bottom: '6px' }} className="flex items-center absolute pin-r pin-y mr-3">
                                <i className="fa fa-search text-grey" />
                            </span>
                        </div>
                        <div className="mr-4 linh-dropdown">
                            <a onClick={(e) => this.preventDefault(e)} href="" className="linh-dropbtn">
                                <img src={avatar} alt="avatar" className="h-8 w-8 rounded-full" />
                            </a>
                            <div className="linh-dropdown-content">
                                <a onClick={this.onCreateAccout} className="linh-a" href="">
                                    <i className="fa fa-plus"></i>
                                    &nbsp;&nbsp;&nbsp;Create account
                                </a>
                                <a onClick={this.onPayment} className="linh-a" href="">
                                    <i className="fa fa-money"></i>
                                    &nbsp;&nbsp;&nbsp;Payment
                                </a>
                                <a onClick={(e) => this.toggleEditModal(profile, e)} className="linh-a" href="#">
                                    <i className="fa fa-user"></i>
                                    &nbsp;&nbsp;&nbsp;Edit Profile
                                </a>
                                <a onClick={(e) => this.toggleAccountModal(profile, e)} className="linh-a" href="#">
                                    <i className="fa fa-user-plus"></i>
                                    &nbsp;New User
                                </a>
                                <a onClick={(e) => this.signOut(e)} className="linh-a" href="">
                                    <i className="fa fa-sign-out"></i>
                                    &nbsp;&nbsp;Sign Out
                                </a>
                            </div>
                        </div>
                        <div>
                            <button onClick={this.toggleModal} className="bg-teal hover:bg-teal-dark text-white font-medium py-2 px-4 rounded-full">
                                Tweet
                            </button>
                            {accModal}
                            <div className="modal fade" id="myModal" role="dialog" style={{ display: this.state.modal }}>
                                <div className="modal-dialog">
                                    <div ref={this.state.isModal ? this.setWrapperRef : ""} className="modal-content">
                                        <div className="modal-header text-center" style={{ height: '50px' }}>
                                            <button onClick={this.removeModal} type="button" className="close" data-dismiss="modal">
                                                <i className="fa fa-times-circle" style={{ marginTop: '5px' }}></i>
                                            </button>
                                            <h4 className="modal-title" style={{ paddingTop: '11px' }}>Compose new Tweet</h4>
                                        </div>
                                        <hr />
                                        <div className="modal-body">
                                            <div className="row colorRow">
                                                <div className="col-sm-2 avataImage">
                                                    <img className="imageCol Avatar--size32 user-avatar-img avatar circle" src={avatar} alt="thanhhue" />
                                                </div>
                                                <div className="col-sm-10">
                                                    <textarea onChange={this.onHandleChange} name="content" value={this.state.content} placeholder="Write your tweet here" className="form-control" row="5" ></textarea>
                                                </div>

                                            </div>
                                            <div className="row footer-image " >
                                                <div className="col-sm-2"></div>
                                                <div className="col-sm-10 imageRow">
                                                    <label htmlFor="image" style={{ fontSize: '25px' }}><i className="fa fa-image" title="Add photo"></i></label>
                                                    <input id="image" type="file" name="image" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer ">
                                            <div className="row">
                                                <div className="col-sm-2"></div>
                                                <div className="col-sm-10">
                                                    <button onClick={this.onHandleSubmit} type="button" className="btn btn-primary radius-button" data-dismiss="modal">
                                                        Tweet
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="modal2 " id="myModal2" role="dialog" style={{ display: this.state.editModal }} >
                                <div className="modal-dialog">
                                    <div className="modal2-content ">
                                        <div className="grid-container">
                                            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_tailwind_bg.jpg" id="headerImage" className="headerModal" />

                                            <div className="footerModal">
                                                <div className="picture">
                                                    <div className="lg:justify-end items-center">
                                                        <label htmlFor="image2" style={{ fontSize: '50px' }}><i className="fa fa-camera" title="Add photo"></i></label>
                                                        <input id="image2" type="file" name="image2" />
                                                        {/* <input id="image2" type="file" name="image2" onChange={(event) => this.loadFile(event)} /> */}
                                                    </div>
                                                    <div style={{ marginTop: '-36px' }} className="locationBtn w-full lg:w-1/4 flex my-4 lg:my-0 lg:justify-end items-center">
                                                        <div className="mr-6">
                                                            <button onClick={this.removeEditModal} style={{ backgroundColor: '#bbb' }} type="button" className="btn btn-primary radius-button " data-dismiss="modal">
                                                                Cancel
                                                            </button>
                                                            <button onClick={this.saveChanges} type="button" className="btn btn-primary radius-button " data-dismiss="modal">
                                                                Save Changes
                                                            </button>

                                                        </div>
                                                    </div>
                                                    <div style={{ marginTop: '-150px' }} className="w-full lg:w-1/4 pictureAva">

                                                        {/* <label htmlFor="image3" className="circle2" style={{fontSize:'80px', background:"#008CBA"}}><i className="fa fa-camera" title="Add photo"></i></label>
                                                        <input id="image3" type="file" name="image3" onChange={(event) => this.loadFile(event)}/> */}
                                                        <img src={avatar} id="avatar" alt="logo" className="circle2" />
                                                        <form className="form2-control">
                                                            <input onChange={this.onHandleChange} value={this.state.name} type="text" className='input-edit' placeholder="Intro" name="name" /><br />
                                                            {/* <input onChange={this.onHandleChange} value={this.state.location} type="text" className='input-edit' placeholder="Intro" name="location"  /><br /> */}
                                                            {/* <input type="text" className='input-edit' placeholder="Vi trí" name="birth" /> */}
                                                            {/* <input type="text" className='input-edit' placeholder="Ten" name="user" /><br /> */}
                                                            {/* <textarea onChange={this.onHandleChange} value={this.state.desc} name="desc" placeholder="Tweet your reply" className="input-edit" row="4"></textarea> */}
                                                        </form>
                                                    </div>
                                                    {/* <div className="locationBtn w-full lg:w-1/4 flex my-4 lg:my-0 lg:justify-end items-center">
                                                        <div className="mr-6">
                                                            <button onClick={this.removeEditModal} style={{ backgroundColor: '#bbb' }} type="button" className="btn btn-primary radius-button " data-dismiss="modal">
                                                                Cancel
                                                            </button>
                                                            <button onClick={this.saveChanges} type="button" className="btn btn-primary radius-button " data-dismiss="modal">
                                                                Save Changes
                                                            </button>

                                                        </div>
                                                    </div> */}


                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
                {/* end container */}
            </div>
        );
    }
}

// export default Header;
const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        toogle: state.createAcc,
    }
}

const mapDispatchToProps = (dispatch, action) => {
    return {
        createNewPost: (post) => dispatch(Actions.createNewPost(post)),
        logout: () => dispatch(logout()),
        openModalAcc: () => dispatch(openAccount())
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));