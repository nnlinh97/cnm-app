import React, { Component } from 'react';
import Header from '../components/Header';

class CreateAccount extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="limiter" >
                <div className="container-login100" style={{backgroundColor:"#d4d3d2"}}>
                    <div className="wrap-login100">
                        <form className="login100-form validate-form p-l-55 p-r-55 p-t-178">
                            <span className="login100-form-title">
                                Create Account
                            </span>
                            <div className="form-group">
                                <div className="label">
                                    <label htmlFor="" className="text-uppercase">Public key</label>
                                </div>
                                <div className="wrap-input100 validate-input m-b-16" data-validate="Please enter username">
                                    <input className="input100" type="text" name="username" placeholder="Please enter public key" />
                                    <span className="focus-input100" />
                                </div>
                            </div>
                            <br/>
                            {/* <div className="wrap-input100 validate-input" data-validate="Please enter password">
                                <input className="input100" type="password" name="pass" placeholder="Password" />
                                <span className="focus-input100" />
                            </div> */}
                            {/* <div className="text-right p-t-13 p-b-23">
                                <span className="txt1">
                                    Forgot &nbsp;
                                </span>
                                <a href="#" className="txt2">
                                    Username / Password
                                </a>
                            </div> */}
                            <div className="container-login100-form-btn">
                                <button onClick={this.clickToTwitter} className="login100-form-btn">
                                    Create
                                </button>
                            </div>
                            <br/>
                            {/* <div className="flex-col-c p-t-30 p-b-40">
                                <span className="txt1 p-b-9">
                                    Don’t have an account?&nbsp;
                                </span>
                                <a  onClick={this.clickToRegister} href="" className="txt3">
                                    Sign up now
                                </a>
                            </div> */}
                        </form>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default CreateAccount;