
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { closeAccount } from './../actions';
// import { getAccount } from './../actions/request'
import { connect } from 'react-redux';
import './../styles/AccModal.css'
class Generate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',//địa chỉ múôn tạo
        }
    }
    onChange = (event) => {
        this.setState({
            address: event.target.value
        })
    }
    onSubmit = async (event) => {
        event.preventDefault();
        try {
            const priv = sessionStorage.getItem('priv');
            const account = localStorage.getItem('account');
            await this.props.getAccount(account, this.state.address, priv);
            if (await this.props.register.status !== 0) {
                console.log('haha')
                document.getElementById("notification").innerHTML = this.props.register.mess;
                document.getElementById('notification').style.display = 'block';
            }
        } catch (err) {
            document.getElementById("notification").innerHTML = 'Tạo tài khoản thất bại';
            document.getElementById('notification').style.display = 'block';
        }


    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef = (node) => {
        this.wrapperRef = node;
    }

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.removeAccountModal();
        }
    }
    removeAccountModal = () => {
        this.props.removeModal();

        document.getElementById('body').style.overflow = 'auto';
    }
    render() {
        console.log(this.props.toggle)
        let publicKey = localStorage.getItem('account');
        return (
            <div className="account" id="account" >
                <button onClick={() => this.removeAccountModal()} type="button" className="close" data-dismiss="modal">
                    <i className="fa fa-times-circle" style={{ marginTop: '5px' }}></i>
                </button>
                <div className="limiter ">
                    <div className="container-login100" >
                        <div className="wrap-login100" ref={this.props.toggle ? this.setWrapperRef : ""}>
                            <form className="login100-form validate-form p-l-55 p-r-55 p-t-178">
                                <span className="login100-form-title">
                                    Create Account
                            </span>
                                <div className="form-group" >
                                    <div className="label" style={{ textAlign:"center", display: 'none' }} id="notification" >
                                       
                                    </div>
                                    <div className="">
                                        <label htmlFor="" className="text-uppercase">Public Key</label><br /><br />
                                        <textarea className="input100 text-uppercase" value={publicKey} readOnly></textarea>

                                    </div>
                                    <div className="">
                                        <div className="label">
                                            <label htmlFor="" className="text-uppercase">Enter a available address</label>
                                        </div><br />
                                        <textarea className="input100 text-uppercase" name='address' value={this.state.address} onChange={(e) => this.onChange(e)} placeholder="Address"></textarea>

                                    </div><br />
                                    

                                </div>


                                <br />
                                <div className="container-login100-form-btn">
                                    <button onClick={(e) => this.onSubmit(e)} className="login100-form-btn">
                                        Create account
                                </button>
                                </div>
                                <div>
                                    <br />
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProp = (state) => {

    return {
        register: state.register,
        toggle: state.createAcc,
        account: state.login
    }
}
const mapDispathToProp = (dispath) => {
    return {
        // getAccount: (address, publicKey, privateKey) => dispath(getAccount(address, publicKey, privateKey)),
        removeModal: () => dispath(closeAccount())
    }
}

export default connect(mapStateToProp, mapDispathToProp)(withRouter(Generate));
