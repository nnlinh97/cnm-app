import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


import * as Actions from '../actions/request';
import moment from 'moment';

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
            history: [],
            currentPage: 1
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
                let countPage = Math.floor(history.length / 10);
                if (history.length % 10 > 0) {
                    countPage += 1;
                }
                let page = [];
                for (let i = 1; i <= countPage; i++) {
                    page.push(i)
                }
                this.setState({
                    history: history,
                    countPage: page
                })
            }
        })

    }
    toProfile = (idKey) => {
        this.props.history.push(`/tweets/${idKey}`);
    }
    onChangePage = (e, page) => {
        e.preventDefault();
        // console.log(page);
        this.setState({
            currentPage: page
        })
    }
    onNothing = (e) => {
        e.preventDefault();
    }
    onPreviuos = (e) => {
        e.preventDefault();
        if (this.state.currentPage - 1 < 1) {
            return;
        }
        this.setState({
            currentPage: this.state.currentPage - 1
        })
    }
    onNext = (e) => {
        e.preventDefault();
        if (this.state.currentPage + 1 > this.state.countPage.length) {
            return;
        }
        this.setState({
            currentPage: this.state.currentPage + 1
        })
    }
    txDetail = (e, hash) => {
        e.preventDefault();
        this.props.history.push(`/transactions/${hash}`);
    }
    render() {
        let limit = 10;
        let current = this.state.currentPage;
        let offset = (current - 1) * limit;
        let { history } = this.state;
        if (history.length) {
            history = history.slice(offset, limit + offset);
        }
        // console.log(this.state.history);
        let list = '';
        if (history.length) {
            list = history.map((history, index) => {
                return (
                    <tr key={index}>
                        <td>
                            <span>
                                <a href="/blocks/182" style={{ color: "#3273dc" }}>
                                    {history.height}
                                </a>
                            </span>
                        </td>
                        <td>{moment(history.createAt).format('lll')}</td>
                        <td >
                            <span>
                                <a onClick={(e) => this.txDetail(e, history.hash)} style={{ width: "300px" }} href=""  >
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
                        <td>{history.tx.params.amount } CEL</td>
                    </tr>
                )
            })
        }
        let pagination = "";
        if (this.state.countPage && this.state.countPage.length > 1) {
            pagination = this.state.countPage.map((page, index) => {
                if (page == this.state.currentPage) {
                    return (<a onClick={this.onNothing} key={index} className="active" href="#">{page}</a>);
                }
                return (<a onClick={(e) => this.onChangePage(e, page)} key={index} href="#">{page}</a>);
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
                        <br />

                        <div className="pagination">
                            {this.state.countPage && this.state.countPage.length > 1
                                ?
                                <a onClick={this.onPreviuos} href="#">&laquo;</a>
                                :
                                ""
                            }
                            {pagination}
                            {this.state.countPage && this.state.countPage.length > 1
                                ?
                                <a onClick={this.onNext} href="#">&raquo;</a>
                                :
                                ""
                            }

                        </div>
                        <br />
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
