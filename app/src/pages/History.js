import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as Actions from '../actions/request';

import Header from '../components/Header';
import CoverImage from '../components/CoverImage';
import MenuTop from '../components/MenuTop';
import Info from '../components/Info';
import Posts from '../components/Posts';
import RightSidebar from '../components/RightSidebar';
import Following from '../components/Following'

class History extends Component {
    componentDidMount() {
        this.props.getProfile();
        this.props.getListPosts();
        this.props.getListFollowings();
    }
    render() {

        return (
            <div>
                <Header />
                <CoverImage />
                <MenuTop tab="tab4" />
                <div className="container mx-auto flex flex-col lg:flex-row mt-3 text-sm leading-normal">
                    <Info />
                    <div class="w-full lg:w-3/4 bg-white mb-4" style={{ position: "inherit" }}>
                        {/* <div class="grid border-b border-solid border-grey-light">
                         
                        </div> */}
                        <div class="w3-container" style={{ position: "inherit" }}>


                            <table class="w3-table w3-striped w3-bordered" style={{ position: "inherit" }}>
                                <tr >
                                    <th>Height</th>
                                    <th>Time</th>
                                    <th>Hash</th>
                                    <th>Người gửi</th>
                                    <th>Người nhận</th>
                                    <th>Số tiền</th>
                                </tr>
                                <tr>
                                    <td>
                                        <span>
                                            <a href="/blocks/182" class="" style={{ color: "#3273dc" }}>
                                                182
                                            </a>
                                        </span>
                                    </td>
                                    <td>2018-12-09T02:17:11+07:00</td>
                                    <td >
                                        <span>
                                            <a style={{ width: "300px" }} href="/transactions/73A9675CDD0CCE0D7ECD46E2263B2AE4D2D8B3CA4BF4C0C38AA2DBA01BDAC599" class="" >
                                                <p title="F8F5D98CF83B03F68C5E2E04CE409804B57EAD1D0BAB24531E769D4A267A45A1" style={{ width: "100px", color: "#3273dc", cursor: "pointer", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                    F8F5D98CF83B03F68C5E2E04CE409804B57EAD1D0BAB24531E769D4A267A45A1
                                                </p>
                                            </a>
                                        </span>
                                    </td>
                                    <td >
                                        <p title ="GCD6DHTSLKVMQWOXE4T4S72ZO3T2AMHXZ3DNKMQFSCFQNDYQ5A5VNHTM"
                                        style={{ width: "100px", color: "#3273dc", cursor: "pointer", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                            GCD6DHTSLKVMQWOXE4T4S72ZO3T2AMHXZ3DNKMQFSCFQNDYQ5A5VNHTM
                                        </p>
                                    </td>
                                    <td>
                                        <p title ="GCD6DHTSLKVMQWOXE4T4S72ZO3T2AMHXZ3DNKMQFSCFQNDYQ5A5VNHTM"
                                        style={{ width: "100px", color: "#3273dc", cursor: "pointer", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                            GCD6DHTSLKVMQWOXE4T4S72ZO3T2AMHXZ3DNKMQFSCFQNDYQ5A5VNHTM
                                        </p>
                                    </td>
                                    <td>100000000</td>
                                </tr>

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
export default connect(mapStateToProps, mapDispatchToProps)(History);
