import React, { Component } from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import * as Actions from './../actions/request'
class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            amount: '',
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
    onCreate = (e) => {
        e.preventDefault();
        // console.log(this.state);
        if (this.state.address !== '' && this.state.amount !== '') {
            // this.props.payment(
            //     {
            //         address: this.state.address,
            //         amount: this.state.amount,
            //     }
            // )
        }

    }
    render() {
        return (
            <div>
                <Header />
                <div className="limiter" >
                    <div className="container-login100" style={{ backgroundColor: "#d4d3d2" }}>
                        <div className="wrap-login100">
                            <form className="login100-form validate-form p-l-55 p-r-55 p-t-178">
                                <span className="login100-form-title" style={{backgroundColor:"rgb(222, 115, 111)"}}>
                                    Payment
                            </span>
                                <div className="form-group">
                                    <div className="label">
                                        <label htmlFor="" className="text-uppercase">Address want to pay</label>
                                    </div>
                                    <div className="wrap-input100 validate-input m-b-16" data-validate="Please enter username">
                                        <input onChange={this.onChangeKey} className="input100" type="text" name="address" placeholder="Please enter address want to pay" />
                                        <span className="focus-input100" />
                                    </div>
                                </div>
                                <br />
                                <div className="form-group">
                                    <div className="label">
                                        <label htmlFor="" className="text-uppercase">Amount</label>
                                    </div>
                                    <div className="wrap-input100 validate-input m-b-16" data-validate="Please enter username">
                                        <input onChange={this.onChangeKey} className="input100" type="text" name="amount" placeholder="Please enter amount of money" />
                                        <span className="focus-input100" />
                                    </div>
                                </div>

                                <div className="container-login100-form-btn">
                                    <button onClick={this.onCreate} className="login100-form-btn" style={{backgroundColor:"rgb(222, 115, 111)"}}>
                                        Transfer
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

    }
}

const mapDispatchToProps = (dispatch, action) => {
    return {
        // payment: (params) => dispatch(Actions.createAccount(params))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Payment));