import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


import * as Actions from '../actions/request';

import Header from '../components/Header';
import CoverImage from '../components/CoverImage';
import MenuTop from '../components/MenuTop';
import Info from '../components/Info';
import Posts from '../components/Posts';
import RightSidebar from '../components/RightSidebar';
import Following from '../components/Following';
import axios from 'axios';

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: []
        }
    }

    componentDidMount() {
        this.props.getProfile();
        this.props.getListPosts();
        this.props.getListFollowings();
        const publicKey = this.props.match.params.id;
        axios.get(`http://localhost:4200/transactions?idKey=${publicKey}`).then((res) => {
            if (res.data.status == 200) {
                let txs = res.data.result;
                let history = [];
                txs.forEach(item => {
                    if (item.tx.operation == 'payment') {
                        history.push(item)
                    }
                });
                this.setState({
                    history: history
                })
            }
        })
    }
    toProfile = (idKey) => {
        this.props.history.push(`/tweets/${idKey}`);
    }
    render() {
        let list = '';
        if (this.state.history.length > 0) {
            list = this.state.history.map((history, index) => {
                return (
                    <tr key = {index}>
                        <td>
                            <span>
                                <a href="/blocks/182" style={{ color: "#3273dc" }}>
                                    {history.height}
                                </a>
                            </span>
                        </td>
                        <td>{history.createAt}</td>
                        <td >
                            <span>
                                <a style={{ width: "300px" }} href="/transactions/73A9675CDD0CCE0D7ECD46E2263B2AE4D2D8B3CA4BF4C0C38AA2DBA01BDAC599"  >
                                    <p title={history.hash} style={{ width: "100px", color: "#3273dc", cursor: "pointer", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                    {history.hash}
                                    </p>
                                </a>
                            </span>
                        </td>
                        <td >
                            <p onClick={() => this.toProfile(history.account)} title={history.account}
                                style={{ width: "100px", color: "#3273dc", cursor: "pointer", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {history.account}
                                        </p>
                        </td>
                        <td>
                            <p onClick={() => this.toProfile(history.address)} title={history.address}
                                style={{ width: "100px", color: "#3273dc", cursor: "pointer", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {history.address}
                            </p>
                        </td>
                        <td>{history.tx.params.amount} CEL</td>
                    </tr>
                )
            })
        }

        return (
            <div>
                <Header />
                <CoverImage />
                <MenuTop tab="tab4" />
                <div className="container mx-auto flex flex-col lg:flex-row mt-3 text-sm leading-normal">
                    <Info />
                    <div className="w-full lg:w-3/4 bg-white mb-4" style={{ position: "inherit" }}>
                        {/* <div className="grid border-b border-solid border-grey-light">
                         
                        </div> */}
                        <div className="w3-container" style={{ position: "inherit" }}>


                            <table className="w3-table w3-striped w3-bordered" style={{ position: "inherit" }}>
                                <thead>
                                    <tr >
                                        <th>Height</th>
                                        <th>Time</th>
                                        <th>Hash</th>
                                        <th>Người gửi</th>
                                        <th>Người nhận</th>
                                        <th>Số tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {list}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        followings: state.followings
    }
}

const mapDispatchToProps = (dispatch, action) => {
    return {
        getProfile: () => dispatch(Actions.getProfile()),
        getListPosts: () => dispatch(Actions.getListPosts()),
        getListFollowings: () => dispatch(Actions.getListFollowings())
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(History));
