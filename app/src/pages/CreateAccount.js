import React, { Component } from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Keypair } from 'stellar-base';
import axios from 'axios';
import transaction from '../lib/tx/index';
import * as actions from './../actions/index';

class CreateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            publicKey: '',
            error: '',
            success: ''
        }
    }
    componentDidMount() {
        if (localStorage.getItem('token') === 'false') {
            this.props.history.push('/login');
            return;
        }
        // const publicKey = Keypair.fromSecret(localStorage.getItem('PRIVATE_KEY')).publicKey();
        // axios.get(`http://localhost:4200/users/get-user?idKey=${publicKey}`).then(res => {
        //     if (res.data.status === 200) {
        //         this.props.saveProfile(res.data.result);
        //     } else {
        //         this.setState({
        //             error: 'Your private key is not registed!!!'
        //         });
        //     }
        // });
    }

    onChangeKey = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value,
            error: '',
            success: ''
        });
    }
    onCreate = (e) => {
        e.preventDefault();
        const { publicKey } = this.state;
        const currentPublicKey = localStorage.getItem('PUBLIC_KEY');

        if (!currentPublicKey) {
            this.setState({
                error: 'ERROR: Who are you?'
            });
            return;
        }
        if (this.state.publicKey == '') {
            this.setState({
                error: 'ERROR: Public key is empty!'
            });
            return;
        }
        if (publicKey == currentPublicKey) {
            this.setState({
                error: 'ERROR: You can not create yourself!'
            });
            return;
        }
        axios.get(`http://localhost:4200/users/get-user?idKey=${publicKey}`).then(res => {
            if (res.data.status === 200) {
                this.setState({
                    error: 'ERROR: This public key is registed!'
                });
                return;
            } else {
                axios.get(`http://localhost:4200/users/get-user?idKey=${currentPublicKey}`).then(user => {
                    if (user.data.status === 200) {
                        const info = user.data.result;
                        let tx = {
                            version: 1,
                            sequence: +info.sequence + 1,
                            memo: Buffer.alloc(0),
                            account: info.idKey,
                            operation: "create_account",
                            params: {
                                address: this.state.publicKey,
                            },
                            signature: new Buffer(64)
                        }
                        try {
                            transaction.encode(tx).toString('hex')
                        } catch (error) {
                            this.setState({
                                error: 'ERROR: Encode transaction fail!'
                            });
                            return;
                        }
                        const privateKey = localStorage.getItem('PRIVATE_KEY');
                        transaction.sign(tx, privateKey);
                        const txEncode = '0x' + transaction.encode(tx).toString('hex');
                        // console.log('send request');
                        axios.post('http://localhost:4200/request', { tx: txEncode }).then((response) => {
                            if (response.status === 200) {
                                this.setState({
                                    success: 'SUCCESS: Create successfully!'
                                });
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
                            error: 'ERROR: Get your info fail!'
                        });
                        return;
                    }
                })
            }
        });
    }
    render() {
        if (this.state.error !== '') {
            alert(this.state.error);
        }
        if (this.state.success !== '') {
            alert(this.state.success);
        }
        return (
            <div>
                <Header />
                <div className="limiter" >
                    <div className="container-login100" style={{ backgroundColor: "#d4d3d2" }}>
                        <div className="wrap-login100">
                            <form style={{zIndex: '0'}} className="login100-form validate-form p-l-55 p-r-55 p-t-178">
                                <span className="login100-form-title">
                                    Create Account
                            </span>
                                <div className="form-group">
                                    <div className="label">
                                        <label htmlFor="" className="text-uppercase">Friend public key</label>
                                    </div>
                                    <div className="wrap-input100 validate-input m-b-16" data-validate="Please enter username">
                                        <input onChange={this.onChangeKey} className="input100" type="text" name="publicKey" placeholder="Please enter friend public key" />
                                        <span className="focus-input100" />
                                    </div>
                                </div>
                                <br />
                                {/* <div className="form-group">
                                    <div className="label">
                                        <label htmlFor="" className="text-uppercase">Your private key</label>
                                    </div>
                                    <div className="wrap-input100 validate-input m-b-16" data-validate="Please enter username">
                                        <input onChange={this.onChangeKey} className="input100" type="text" name="yPrivateKey" placeholder="Please enter your private key" />
                                        <span className="focus-input100" />
                                    </div>
                                </div> */}

                                <div className="container-login100-form-btn">
                                    <button onClick={this.onCreate} className="login100-form-btn">
                                        Create
                                </button>
                                </div>
                                <br />

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // saveProfile: (profile) => dispatch(actions.saveProfile(profile))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateAccount));