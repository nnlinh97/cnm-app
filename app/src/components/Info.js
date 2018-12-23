import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import transaction from '../lib/tx/index';
import * as actions from '../actions/index';



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
            success: '',
            visitor: false
        }
    }
    componentWillReceiveProps(nextProps) {
        const idKey = nextProps.match.params.id;
        const publicKey = localStorage.getItem('PUBLIC_KEY');
        axios.get(`http://localhost:4200/users/get-info?idKey=${idKey}`).then((info) => {
            if (info.data.status === 200) {
                let user = info.data.result;
                // this.props.getInfoProfile({
                //     displayName: user.displayName !== '' ? user.displayName : 'No Name',
                //     sequence: user.sequence,
                //     balance: user.balance,
                //     bandwithTime: user.bandwithTime,
                //     bandwithLimit: user.bandwithLimit,
                //     publicKey: idKey,
                //     visitor: publicKey == idKey ? false : true
                // })
                this.setState({
                    displayName: user.displayName !== '' ? user.displayName : 'No Name',
                    sequence: user.sequence,
                    balance: user.balance,
                    bandwithTime: user.bandwithTime,
                    bandwithLimit: user.bandwithLimit,
                    publicKey: idKey,
                    visitor: publicKey == idKey ? false : true
                });
            }
        })
    }

    componentDidMount() {
        const idKey = this.props.match.params.id;
        const publicKey = localStorage.getItem('PUBLIC_KEY');
        axios.get(`http://localhost:4200/users/get-info?idKey=${idKey}`).then((info) => {
            if (info.data.status === 200) {
                let user = info.data.result;
                // this.props.getInfoProfile({
                //     displayName: user.displayName !== '' ? user.displayName : 'No Name',
                //     sequence: user.sequence,
                //     balance: user.balance,
                //     bandwithTime: user.bandwithTime,
                //     bandwithLimit: user.bandwithLimit,
                //     publicKey: idKey,
                //     visitor: publicKey == idKey ? false : true
                // })
                this.setState({
                    displayName: user.displayName !== '' ? user.displayName : 'No Name',
                    sequence: user.sequence,
                    balance: user.balance,
                    bandwithTime: user.bandwithTime,
                    bandwithLimit: user.bandwithLimit,
                    publicKey: idKey,
                    visitor: publicKey == idKey ? false : true
                });
            }
        })

    }

    onClickDisplayName = (e) => {
        e.preventDefault();
    }


    toggleEditModal = () => {
        // e.preventDefault();
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
        const info  = this.state;

        if (this.state.error !== '') {
            alert(this.state.error)
        }

        if (this.state.success !== '') {
            alert(this.state.success)
        }
        return (
            <div style={{ 'marginTop': '1rem' }} className="w-full lg:w-1/4 pl-4 lg:pl-0 pr-6 mt-8 mb-4">
                <div className="mb-4">
                    <a onClick={this.onClickDisplayName}
                        style={{ fontSize: "20px" }} href="" className="text-black font-bold no-underline hover:underline">
                        {info.displayName} &nbsp;
                    </a>
                    {this.state.visitor ? ''
                        :
                        <i style={{ cursor: 'pointer' }} onClick={this.toggleEditModal} className="fa fa-pencil fa-lg text-grey-darker ml-1"></i>
                    }
                    {/* <i style={{ cursor: 'pointer' }} onClick={this.toggleEditModal} className="fa fa-pencil fa-lg text-grey-darker ml-1"></i> */}
                    {/* UploadImage
                    <a style={{ fontSize: "20px" }} href="" className="text-black font-bold no-underline hover:underline">huantd &nbsp;</a>
                    <i onClick={(e) => this.toggleEditModal(profile, e)} class="fa fa-pencil fa-lg text-grey-darker ml-1"></i> */}

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


                <div className="modal3 " id="myModal3" role="dialog" style={{ display: 'none' }} >
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


                <div className="mb-4">
                    <p title={info.publicKey}
                        style={{
                            width: "250px",
                            color: "#3273dc",
                            whiteSpace: "pre-wrap",
                            cursor: "pointer",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}>

                        {info.publicKey}
                    </p>
                </div>
                <div className="mb-4">
                    <p><strong>Sequence</strong>: {info.sequence}</p>
                    <p><strong>Balance</strong>: {info.balance} CEL</p>
                    {/* <p><strong>Energy</strong>: 42244 OXY</p>
                    <p><strong>Transactions</strong>: 4</p> */}
                </div>

            </div>
        );
    }
}

// export default Info;
const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        info: state.infoProfile
    }
}

const mapDispatchToProps = (dispatch, action) => {
    return {
        getInfoProfile: (info) => dispatch(actions.getInfoProfile(info))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Info));