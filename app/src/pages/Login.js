import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Keypair } from 'stellar-base';
import { login } from './../actions/request';
import { connect } from 'react-redux'
import * as Types from './../constants/ActionTypes';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            privateKey: ''
        }
    }
    onChange = (event) => {
        this.setState({
            privateKey: event.target.value
        })
    }
    onSubmit = async (event) => {
        event.preventDefault();

        try {
            let keypair = Keypair.fromSecret(this.state.privateKey);
            let publicKey = keypair.publicKey()
                await this.props.signIn(publicKey, this.state.privateKey)
                let status = await this.props.status
                if (status === -1 || status !== 1) {
                    document.getElementById("error").innerHTML = Types.MESS_ERR;
                    document.getElementById('error').style.display = 'block'
                } else if (status === 1) {
                    this.props.history.push('/nnlinh97')
                }
        }
        catch (err) {
            console.log(err)
            document.getElementById("error").innerHTML = Types.MESS_ERR;
            document.getElementById('error').style.display = 'block';
        }




    }
    clickToTwitter = () => {
        this.props.history.push('/nnlinh97');
    }
    clickToRegister = (event) => {
        event.preventDefault();
        this.props.history.push('account/register')
    }
    render() {
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
                                    <input className="input100" type="text" value={this.state.privateKey} onChange={(e) => this.onChange(e)} name="privateKey" placeholder="Private key" />
                                    <span className="focus-input100" />
                                </div>
                            </div>

                            {/* <div className="wrap-input100 validate-input" data-validate="Please enter password">
                                <input className="input100" type="password" name="pass" placeholder="Password" />
                                <span className="focus-input100" />
                            </div> */}

                            <div className="container-login100-form-btn">
                                <button onClick={(event) => this.onSubmit(event)} className="login100-form-btn">
                                    Sign in
                                </button>
                            </div>
                            <div className="flex-col-c p-t-30 p-b-40">
                                <span className="txt1 p-b-9">
                                    Don’t have an account?&nbsp;
                                </span>
                                <a onClick={this.clickToRegister} href="" className="txt3">
                                    Sign up now
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
        status: state.login.status
    }
}
const mapDispathToProp = (dispath) => {
    return {
        signIn: (keyPublic, privateKey) => dispath(login(keyPublic, privateKey))
    }
}
export default connect(mapStateToProp, mapDispathToProp)(withRouter(Login));