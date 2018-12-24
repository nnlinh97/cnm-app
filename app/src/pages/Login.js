import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Keypair } from 'stellar-base';
import { login } from './../actions/request';
import * as Types from './../constants/ActionTypes';
import * as actions from './../actions/index';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            privateKey: '',
            error: ''
        }
    }
    componentDidMount() {
        if (localStorage.getItem('token') == 'true') {
            // console.log('logged');
            this.props.history.push('/');
        }
    }

    onChangeKey = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value,
            error: ''
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state.privateKey);
        const { privateKey } = this.state;
        if (privateKey === '') {
            this.setState({
                error: 'Private key is empty!!!'
            });
            return;
        }
        let key = null;
        try {
            key = Keypair.fromSecret(privateKey)
        } catch (error) {
            this.setState({
                error: 'Keypair fail!'
            });
            return;
        }
        const publicKey = key.publicKey();
        // console.log(publicKey);
        // const LINH = "SA3CRYDZO732G7FSMSSQOJ5FAJRWZELGLEKFBO6XQ4TJQWASMFK4SSM3";
        // const publicTest = 'GBIDPG4BFSTJSR3TYPJG4S4R2MEZX6U6FK5YJVIGD4ZJ3LTM4B5IS4R1';
        axios.get(`http://localhost:4200/users/get-user?idKey=${publicKey}`).then(res => {
            if (res.data.status === 200) {
                // console.log(res.data);
                localStorage.setItem('token', true);
                localStorage.setItem('PRIVATE_KEY', privateKey);
                localStorage.setItem('PUBLIC_KEY', res.data.result.idKey);
                // console.log(res.data.result);
                this.props.saveProfile(res.data.result);
                this.props.history.push('/');
            } else {
                this.setState({
                    error: 'Your private key is not registed!!!'
                });
            }
        });

    }

    onGenerateKey = (e) => {
        e.preventDefault();
        this.props.history.push('/register');
    }
    render() {
        if (this.state.error !== '') {
            alert(this.state.error);
        }
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <form className="login100-form validate-form p-l-55 p-r-55 p-t-178">
                            <span className="login100-form-title">
                                Sign In
                            </span>
                            <div className="form-group">
                                <div className="label input100" style={{ display: 'none' }} id="error" >
                                    <label htmlFor="" className="text-uppercase"></label>
                                </div>
                                <div className="label">
                                    <label htmlFor="" className="text-uppercase alert-danger">Private key</label>
                                </div>

                                <div className="wrap-input100 validate-input m-b-16" data-validate="Please enter username">
                                    <input onChange={this.onChangeKey} name="privateKey" className="input100" type="text" placeholder="Private key" />
                                    <span className="focus-input100" />
                                </div>
                            </div>

                            {/* <div className="wrap-input100 validate-input" data-validate="Please enter password">
                                <input className="input100" type="password" name="pass" placeholder="Password" />
                                <span className="focus-input100" />
                            </div> */}

                            <div className="container-login100-form-btn">
                                <button onClick={this.onSubmit} className="login100-form-btn">
                                    Sign in
                                </button>
                            </div>
                            <div className="flex-col-c p-t-30 p-b-40">
                                <span className="txt1 p-b-9">
                                    Don’t have an account?&nbsp;
                                </span>
                                <a onClick={this.onGenerateKey} href="" className="txt3">
                                    generate key now
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProp = (state) => {
    return {
    }
}
const mapDispathToProp = (dispatch) => {
    return {
        saveProfile: (profile) => dispatch(actions.saveProfile(profile))
    }
}
export default connect(mapStateToProp, mapDispathToProp)(withRouter(Login));