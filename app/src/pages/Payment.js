import React, { Component } from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import transaction from '../lib/tx/index';
// import * as Actions from './../actions/request'
class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            amount: '',
            error: '',
            success: ''
        }
    }
    componentDidMount() {
        if (localStorage.getItem('token') === 'false') {
            this.props.history.push('/login');
            return;
        }
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
    ontransfer = (e) => {
        e.preventDefault();
        // console.log(this.state);
        let { address, amount } = this.state;
        if (address === '' || amount == '') {
            this.setState({
                error: 'ERROR: Address or Amount is empty!'
            });
            return;
        }
        const publicKey = localStorage.getItem('PUBLIC_KEY');
        if(address == publicKey){
            this.setState({
                error: 'ERROR: You can not transfer to yourseft!'
            });
            return;
        }        
        if (!+amount) {
            this.setState({
                error: 'ERROR: Amount must be a number!'
            });
            return;
        }
        amount = +amount;
        axios.get(`http://localhost:4200/users/get-user?idKey=${address}`).then((res) => {
            if (res.data.status === 200) {
                axios.get(`http://localhost:4200/users/get-user?idKey=${publicKey}`).then((user) => {

                    if (user.data.status === 200) {
                        const info = user.data.result;
                        let tx = {
                            version: 1,
                            sequence: +info.sequence + 1,
                            memo: Buffer.alloc(0),
                            account: publicKey,
                            operation: "payment",
                            params: {
                                address: address,
                                amount: amount
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
                        axios.post('http://localhost:4200/request', { tx: txEncode }).then((response) => {
                            if (response.status === 200) {
                                this.setState({
                                    success: 'SUCCESS: Transfer successfully!'
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
            } else {
                this.setState({
                    error: 'ERROR: Address is not registed!'
                });
                return;
            }
        })
    }
    render() {
        if (this.state.error !== '') {
            alert(this.state.error)
        }
        if(this.state.success !== ''){
            alert(this.state.success)
        }
        return (
            <div>
                <Header />
                <div className="limiter" >
                    <div className="container-login100" style={{ backgroundColor: "#d4d3d2" }}>
                        <div className="wrap-login100">
                            <form className="login100-form validate-form p-l-55 p-r-55 p-t-178">
                                <span className="login100-form-title" style={{ backgroundColor: "rgb(222, 115, 111)" }}>
                                    Payment
                            </span>
                                <div className="form-group">
                                    <div className="label">
                                        <label htmlFor="" className="text-uppercase">Address want to pay</label>
                                    </div>
                                    <div style={{zIndex: '0'}} className="wrap-input100 validate-input m-b-16" data-validate="Please enter username">
                                        <input onChange={this.onChangeKey} className="input100" type="text" name="address" placeholder="Please enter address want to pay" />
                                        <span className="focus-input100" />
                                    </div>
                                </div>
                                <br />
                                <div className="form-group">
                                    <div className="label">
                                        <label htmlFor="" className="text-uppercase">Amount</label>
                                    </div>
                                    <div style={{zIndex: '0'}} className="wrap-input100 validate-input m-b-16" data-validate="Please enter username">
                                        <input onChange={this.onChangeKey} className="input100" type="text" name="amount" placeholder="Please enter amount of money" />
                                        <span className="focus-input100" />
                                    </div>
                                </div>

                                <div className="container-login100-form-btn">
                                    <button onClick={this.ontransfer} className="login100-form-btn" style={{ backgroundColor: "rgb(222, 115, 111)" }}>
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