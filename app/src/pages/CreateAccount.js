import React, { Component } from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Actions from './../actions/request'
class CreateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fPublicKey: '',
            yPrivateKey: '',
        }
    }
    onChangeKey = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        });
    }
    onCreate = (e) =>{
        e.preventDefault();
        //console.log(this.state);
        if(this.state.fPublicKey!=='' && this.state.yPrivateKey!==''){
            this.props.createAccount(
                {
                    fPublicKey: this.state.fPublicKey,
                    yPrivateKey: this.state.yPrivateKey,
                }
            )
        }
        
    }
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
                                    <label htmlFor="" className="text-uppercase">Friend public key</label>
                                </div>
                                <div className="wrap-input100 validate-input m-b-16" data-validate="Please enter username">
                                    <input onChange={this.onChangeKey} className="input100" type="text" name="fPublicKey" placeholder="Please enter friend public key" />
                                    <span className="focus-input100" />
                                </div>
                            </div>
                            <br/>
                            <div className="form-group">
                                <div className="label">
                                    <label htmlFor="" className="text-uppercase">Your private key</label>
                                </div>
                                <div className="wrap-input100 validate-input m-b-16" data-validate="Please enter username">
                                    <input onChange={this.onChangeKey} className="input100" type="text" name="yPrivateKey" placeholder="Please enter your private key" />
                                    <span className="focus-input100" />
                                </div>
                            </div>
                           
                            <div className="container-login100-form-btn">
                                <button onClick={this.onCreate} className="login100-form-btn">
                                    Create
                                </button>
                            </div>
                            <br/>
                            
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
        
    }
}

const mapDispatchToProps = (dispatch, action) => {
    return {
        createAccount: (params) => dispatch(Actions.createAccount(params))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateAccount));