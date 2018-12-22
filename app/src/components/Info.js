import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import transaction from '../lib/tx/index';

class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: 'none',
            content: '',
            isModal: false,
            editModal: 'none',
            isEditModal: false,

            publicKey: '',
            displayName: '',
            sequence: '',
            balance: '',
            bandwith: '',
            bandwithTime: '',
            bandwithLimit: '',
            displayNameChange: '',
            error: '',
            success: ''
        }
    }
    componentDidMount() {
        const idKey = this.props.match.params.id;
        axios.get(`http://localhost:4200/users/get-info?idKey=${idKey}`).then((info) => {
            if (info.data.status === 200) {
                let user = info.data.result;
                this.setState({
                    displayName: user.displayName !== '' ? user.displayName : 'No Name',
                    sequence: user.sequence,
                    balance: user.balance,
                    bandwithTime: user.bandwithTime,
                    bandwithLimit: user.bandwithLimit,
                    publicKey: idKey
                });
            }
        })

    }

    onClickDisplayName = (e) => {
        e.preventDefault();
    }
    toggleEditModal = (e) => {
        e.preventDefault();
        this.setState({
            editModal: 'block',
            isEditModal: true,
            error: '',
            displayNameChange: this.state.displayName,
            success: ''
        })
        document.getElementById('body').style.overflow = 'hidden';
    }

    removeEditModal = () => {
        this.setState({
            editModal: 'none',
            displayNameChange: '',
            error: '',
            success: '',
        })
        document.getElementById('body').style.overflow = 'auto';
    }

    saveChanges = () => {
        const { displayNameChange } = this.state;
        if (displayNameChange == '') {
            this.setState({
                error: 'ERROR: Displayname is empty!'
            });
            return;
        } else {
            if (displayNameChange == this.state.displayName) {
                this.removeEditModal();
                return;
            } else {
                axios.get(`http://localhost:4200/users/get-user?idKey=${this.props.match.params.id}`).then((user) => {
                    if (user.data.status === 200) {
                        const info = user.data.result;
                        let tx = {
                            version: 1,
                            sequence: +info.sequence + 1,
                            memo: Buffer.alloc(0),
                            account: info.idKey,
                            operation: "update_account",
                            params: {
                                key: 'name',
                                value: new Buffer(displayNameChange)
                            },
                            signature: new Buffer(64)
                        }
                        const privateKey = localStorage.getItem('PRIVATE_KEY');
                        transaction.sign(tx, privateKey);
                        const txEncode = '0x' + transaction.encode(tx).toString('hex');
                        axios.post('http://localhost:4200/request', { tx: txEncode }).then((response) => {
                            if (response.status === 200) {
                                this.setState({
                                    success: 'SUCCESS: Update displayname successfully!',
                                    displayName: displayNameChange
                                });
                                this.removeEditModal();
                                return;
                            } else {
                                this.setState({
                                    error: 'ERROR: Request fail!'
                                });
                                return;
                            }
                        });
                    } else {
                        this.setState({
                            error: 'ERROR: Get your info fail'
                        });
                        return;
                    }
                });
            }
        }
    }

    onChangeName = (e) => {
        this.setState({
            displayNameChange: e.target.value,
            error: ''
        });
        // this.removeEditModal();
    }
    render() {
        if (this.state.error !== '') {
            alert(this.state.error)
        }

        if(this.state.success !== ''){
            alert(this.state.success)
        }

        const { profile } = this.props;
        let tag = '';
        let joined = '';
        // let location = '';
        // let birthday = '';
        if (profile) {
            tag = '@' + profile.username;
            joined = (
                <div className="mb-4">
                    <i className="fa fa-calendar fa-lg text-grey-darker mr-1" />
                    <a href="#" className="text-teal no-underline hover:underline"> Joined {moment(profile.createAt).format('ll')}</a>
                </div>
            );
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

        }
        return (
            <div style={{ 'marginTop': '1rem' }} className="w-full lg:w-1/4 pl-4 lg:pl-0 pr-6 mt-8 mb-4">
                <div className="mb-4">
                    <a onClick={this.onClickDisplayName} style={{ fontSize: "20px" }} href="" className="text-black font-bold no-underline hover:underline">{this.state.displayName} &nbsp;</a>
                    <i style={{ cursor: 'pointer' }} onClick={this.toggleEditModal} className="fa fa-pencil fa-lg text-grey-darker ml-1"></i>
                    {/* <a href="#" className="text-black font-bold no-underline hover:underline">{profile ? profile.username : ''}</a> */}
                </div>
                <div className="mb-4" style={{ display: this.state.editModal }} >
                    <div className="w-full lg:w-1/4 pictureAva">
                        <input
                            style={{ fontSize: "20px" }}
                            onChange={this.onChangeName}
                            name="displayNameChange"
                            value={this.state.displayNameChange}
                            type="text"
                            className='input-edit'
                            placeholder="DisplayName"
                        /><br />
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
                {/* <div className="mb-4">
                    <a href="#" className="text-grey-darker no-underline hover:underline">
                        @huantd
                    </a>
                </div> */}

                <div className="mb-4">
                    {profile ? profile.desc : ''}
                    {/* <a href="#" className="text-teal no-underline hover:underline">@adamwathan</a>,
                        <a href="#" className="text-teal no-underline hover:underline">@reinink</a>,
                        <a href="#" className="text-teal no-underline hover:underline">@davidhemphill</a>, and
                        <a href="#" className="text-teal no-underline hover:underline">@steveschoger</a>. */}
                </div>
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
                        {this.state.publicKey}
                    </p>
                </div>
                <div className="mb-4">
                    <p><strong>Sequence</strong>: {this.state.sequence}</p>
                    <p><strong>Balance</strong>: {this.state.balance} CEL</p>
                    {/* <p><strong>Energy</strong>: 42244 OXY</p>
                    <p><strong>Transactions</strong>: 4</p> */}
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Info));