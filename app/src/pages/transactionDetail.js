import React, { Component } from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import * as actions from './../actions/index';
import './../styles/transaction.css'
import transaction from './../lib/tx'
class transactionDetail extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:''
        }
    }
    
    componentDidMount(){
        axios.get('https://komodo.forest.network/tx?hash=0x76533DA255CD8BC34009CF71587EC01B0D7E3D6747DFE197C10263D215171921').then(res=>{
            this.setState({
                data: res.data.result.tx
            })
        })
    }
    render() {
        let tx = this.state.data? transaction.decode(Buffer.from(this.state.data, 'base64')):'';
        
        return (
            <div>
                <Header />
                
                    
                <section className="section" >
                    <div className="container" >
                        <h1 className="title" style={{marginTop:'30px'}}>Transaction</h1>
                        <h2 className="subtitle has-text-grey">76533DA255CD8BC34009CF71587EC01B0D7E3D6747DFE197C10263D215171921</h2>
                        <h6 className="title is-6"><span className="has-text-success">Comfirmed</span> at <a href="/blocks/138" className="">#138</a></h6>
                        <article className="message is-success"><div className="message-header"><p>Successful</p></div></article>
                        <div className="columns">
                            <div className="column"><p><strong>Operation</strong>: create_account</p><p><strong>Memo</strong>: CTT522-CQ2015/32</p>
                                <p><strong>Tags</strong>: 2</p>
                            </div>
                        </div>
                        <div className="b-table">
                            <div className="table-wrapper">
                                <table className="table has-mobile-cards">
                                    <thead>
                                        <tr> 
                                            <th className="">
                                                <div className="th-wrap">Key <span className="icon is-small" style={{display: 'none'}}><i className="mdi mdi-arrow-up"></i></span></div>
                                            </th>
                                            <th className="">
                                                <div className="th-wrap">value <span className="icon is-small" style={{display: 'none'}}><i className="mdi mdi-arrow-up"></i></span></div>
                                            </th>
                                        </tr>
                                    </thead> 
                                    <tbody>
                                        <tr className=""> 
                                            <td data-label="Key" className=""><span>account</span></td>
                                            <td data-label="value" className="">
                                                <span><a href="/accounts/GAO4J5RXQHUVVONBDQZSRTBC42E3EIK66WZA5ZSGKMFCS6UNYMZSIDBI" className="">GAO4J5RXQHUVVONBDQZSRTBC42E3EIK66WZA5ZSGKMFCS6UNYMZSIDBI</a></span>
                                            </td>
                                        </tr> 
                                        <tr className=""> 
                                            <td data-label="Key" className=""><span>account</span></td>
                                            <td data-label="value" className="">
                                                <span><a href="/accounts/GCWHALH3HH6SRSRSUKVIXMU5SQKUY46ZQNDHIJC2GJK6RGIYTF7JEB3E" className="">GCWHALH3HH6SRSRSUKVIXMU5SQKUY46ZQNDHIJC2GJK6RGIYTF7JEB3E</a></span>
                                            </td>
                                        </tr> 
                                    </tbody> 
                                </table>
                            </div> 
                            <pre>{JSON.stringify(tx, null, 2)} </pre> {/*transaction */}
                        </div>
                    </div>
                </section>
            </div>
                        );
                    }
                }
                
export default transactionDetail;