
import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'

class Register extends Component {
    clickToSignIn = () => {
        this.props.history.push('/');
    }
    render() {
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <form className="login100-form validate-form p-l-55 p-r-55 p-t-178">
                            <span className="login100-form-title">
                                Generate Key
                            </span>
                            <div className="form-group">
                                <div className="label">
                                    <label htmlFor="" className="text-uppercase">Public key</label>
                                </div>
                                <div className="wrap-input100 validate-input m-b-16" data-validate="Please enter username">
                                    <input className="input100" type="text" name="username" placeholder="Public key" />
                                    <span className="focus-input100" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="label">
                                    <label htmlFor="" className="text-uppercase">Private key</label>
                                </div>
                                <div className="wrap-input100 validate-input m-b-16" data-validate="Please enter username">
                                    <input className="input100" type="text" name="username" placeholder="Private key" />
                                    <span className="focus-input100" />
                                </div>
                            </div>


                            <span className="txt1 p-b-9">Please save your key to Sign in</span>
                            {/* <div className="container-login100-form-btn">
                                <button onClick={this.clickToTwitter} className="login100-form-btn">
                                    Create account
                                </button>
                            </div> */}
                            
                            <div className="flex-col-c p-t-30 p-b-40">
                                <span className="txt1 p-b-9">
                                    Please give your Public key to your friend to create account &nbsp;
                                </span>
                                <br/>
                                <span className="txt1 p-b-9">Comeback &nbsp; </span>
                                <a  onClick={this.clickToSignIn} href="" className="txt3">
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
export default withRouter(Register);
