
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import { getAccount } from './../actions/request'
import { connect } from 'react-redux'
const { Keypair } = require('stellar-base');
const vstruct = require('varstruct');
const base32 = require('base32.js');

//var key = Keypair.random();
class Register extends Component {
    constructor(props) {
        super(props);
        const key = Keypair.random();
        this.state = {
            privateKey: key.secret(),
            publicKey: key.publicKey()
        }

    }
    clickToSignIn = (e) => {
        e.preventDefault();
        this.props.history.push('/');
    }

    componentWillUnmount() {
        console.log('haha')
        this.setState({
            privateKey: '',
            publicKey: ''
        })
    }
    render() {
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <form className="login100-form validate-form p-l-55 p-r-55 p-t-178">
                            <span className="login100-form-title">
                                Create Key
                            </span>
                            <div className="form-group">
                                <div className="">
                                    <label htmlFor="" className="text-uppercase">Private Key</label><br /><br />
                                    <textarea style={{background: '#fff'}} className="input100 text-uppercase" value={this.state.privateKey} readOnly></textarea>
                                </div>
                                <div>
                                    <br />
                                </div>
                                <div className="">
                                    <label htmlFor="" className="text-uppercase">Public Key</label><br /><br />
                                    <textarea style={{background: '#fff'}} className="input100 text-uppercase" value={this.state.publicKey} readOnly></textarea>
                                </div>
                            </div>
                            <br />
                            <div>
                                <br />
                            </div>
                            <div className="flex-col-c p-t-30 p-b-40">
                                <span className="txt1 p-b-9">
                                    Please give Public key to your friend to create account &nbsp;
                                </span>
                                <a onClick={(e) => this.clickToSignIn(e)} href="" className="txt3">
                                    Sign in
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
    // console.log(state)
    return {
        register: state.register
    }
}
const mapDispathToProp = (dispath) => {
    return {
        // getAccount: (address, publicKey, privateKey) => dispath(getAccount(address, publicKey, privateKey))
    }
}

export default connect(mapStateToProp, mapDispathToProp)(withRouter(Register));
