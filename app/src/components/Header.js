import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import './../styles/Header.css'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: 'none'
        }
    }

    toggleModal = () => {
        this.setState({
            modal: 'block'
        })
    }

    removeModal = () => {
        this.setState({
            modal: 'none'
        })
    }

    preventDefault = (e) => {
        e.preventDefault();
    }

    signOut = (e) => {
        e.preventDefault();
        this.props.history.push('/');
    }

    render() {
        const { profile } = this.props;
        let avatar = "https://tinyurl.com/yapenv5f";
        if (profile) {
            avatar = profile.avatarURL;
        }
        return (
            <div className="bg-white" style={{ position: 'fixed', width: '100%', zIndex: 1 }}>
                <div className="container mx-auto flex flex-col lg:flex-row items-center py-4">
                    <nav className="w-full lg:w-2/5">
                        <a onClick={(e) => this.preventDefault(e)} href="" className="text-grey-darker text-sm mr-4 font-semibold pb-6 border-b-2 border-solid border-transparent no-underline hover:text-teal hover:border-teal hover:no-underline">
                            <i className="fa fa-home fa-lg" /> Home</a>
                        <a onClick={(e) => this.preventDefault(e)} style={{ marginLeft: '2rem' }} href="" className="text-grey-darker text-sm mr-4 font-semibold pb-6 border-b-2 border-solid border-transparent no-underline hover:text-teal hover:border-teal hover:no-underline">
                            <i className="fa fa-bell fa-lg" /> Notifications</a>
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
                                <a className="linh-a" href="#">
                                    <i className="fa fa-user"></i>
                                    &nbsp;&nbsp;&nbsp;Edit Profile
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
                            <div className="modal fade" id="myModal" role="dialog" style={{ display: this.state.modal }}>
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header text-center" style={{ height: '50px' }}>
                                            <button onClick={this.removeModal} type="button" className="close" data-dismiss="modal">&times;</button>
                                            <h4 className="modal-title" style={{ paddingTop: '11px' }}>Compose new Tweet</h4>
                                        </div>
                                        <hr />
                                        <div className="modal-body">
                                            <div className="row colorRow">
                                                <div className="col-sm-2 avataImage">
                                                    <img className="imageCol Avatar--size32 user-avatar-img avatar circle" src={avatar} alt="thanhhue" />

                                                </div>
                                                <div className="col-sm-10">
                                                    <textarea placeholder="Write your tweet here" className="form-control" row="5" name="tweet" ></textarea>
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
                                                    <button type="button" className="btn btn-primary radius-button" data-dismiss="modal">Tweet</button>
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
        profile: state.profile
    }
}

const mapDispatchToProps = (dispatch, action) => {
    return {
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));