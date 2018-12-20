import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Login extends Component {

    clickToTwitter = () => {
        this.props.history.push('/nnlinh97');
    } 
    clickToRegister = (e) => {
        e.preventDefault();
        this.props.history.push('/account/register')
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
                                <div className="label">
                                    <label htmlFor="" className="text-uppercase">Private key</label>
                                </div>
                                <div className="wrap-input100 validate-input m-b-16" data-validate="Please enter username">
                                    <input className="input100" type="text" name="username" placeholder="Private key" />
                                    <span className="focus-input100" />
                                </div>
                            </div>

                            {/* <div className="wrap-input100 validate-input" data-validate="Please enter password">
                                <input className="input100" type="password" name="pass" placeholder="Password" />
                                <span className="focus-input100" />
                            </div> */}
                            <div className="text-right p-t-13 p-b-23">
                                <span className="txt1">
                                    Forgot &nbsp;
                                </span>
                                <a href="#" className="txt2">
                                    Username / Password
                                </a>
                            </div>
                            <div className="container-login100-form-btn">
                                <button onClick={this.clickToTwitter} className="login100-form-btn">
                                    Sign in
                                </button>
                            </div>
                            <div className="flex-col-c p-t-30 p-b-40">
                                <span className="txt1 p-b-9">
                                    Don’t have an account?&nbsp;
                                </span>
                                <a  onClick={this.clickToRegister} href="" className="txt3">
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

export default withRouter(Login);