import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import transaction from '../lib/tx/index';
import * as actions from '../actions/index';



class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: 'none',
            account: null
        }
    }
   

    componentDidMount() {
        const account = this.props.comment.account;
        axios.get(`http://localhost:4200/users/get-info?idKey=${account}`).then(res => {
            if(res.data.status == 200){
                this.setState({
                    account: res.data.result
                })
            }
        })
    }
    render() {
        const {account} = this.state;
        console.log(account)
        let {comment} = this.props;
        let avatar = "https://tinyurl.com/yapenv5f";
        return (
                        <div  className="flex border-b border-solid border-grey-light">
                        <div className="headerPost-left w-1/8 text-right pl-3 pt-3">
                            <a href="#">
                                <img src={account && account.avatar !== '' ? account.avatar : avatar} alt="avatar" className="rounded-full h-12 w-12 mr-2" />
                            </a>
                        </div>
                        <div className="w-7/8 p-3 pl-0">
                            <div className="flex justify-between">
                                <div>
                                    <span className="font-bold">
                                        <a href="#" className="text-black">{account && account.displayName !== "" ? account.displayName : (account ? account.idKey : "")}</a>
                                    </span>
                                    <br/>
                                    <span className="text-grey-dark">&nbsp;{moment(comment.createAt).format('ll')}&nbsp;</span>
                                    {/* <span className="text-grey-dark">&nbsp;&nbsp;</span> */}
                                </div>
                                {/* <div>
                                    <a href="#" className="text-grey-dark hover:text-teal">
                                        <i className="fa fa-chevron-down" />
                                    </a>
                                </div> */}
                            </div>
                            <div className="mb-4">
                                <p style={{whiteSpace: 'pre-wrap'}} >{comment.text}</p>
                            </div>
                        </div>
                    </div>
        );
    }
}

// export default Info;
const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        info: state.infoProfile
    }
}

const mapDispatchToProps = (dispatch, action) => {
    return {
        getInfoProfile: (info) => dispatch(actions.getInfoProfile(info))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comment));