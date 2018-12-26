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
            tx: null
        }
    }
    
    componentDidMount(){
        // console.log(this.props.match.params.id);
        const hash = this.props.match.params.id;
        axios.get(`http://localhost:4200/transactions/detail?hash=${hash}`).then((res) => {
            if(res.data.status == 200){
                const tx = res.data.result;
                this.setState({
                    tx: tx
                })
            }
        })
        // axios.get('https://komodo.forest.network/tx?hash=0x76533DA255CD8BC34009CF71587EC01B0D7E3D6747DFE197C10263D215171921').then(res=>{
        //     this.setState({
        //         data: res.data.result.tx
        //     })
        // })
    }
    toProfile = (e, idKey) => {
        e.preventDefault();
        this.props.history.push(`/tweets/${idKey}`);
    }
    render() {
        // let tx = this.state.data ? transaction.decode(Buffer.from(this.state.data, 'base64')) :'';
        let {tx} = this.state;
        
        return (
            <div>
                <Header />
                <section className="section" >
                    <div className="containertra" >
                        <h1 className="title" style={{marginTop:'30px'}}>Transaction</h1>
                        <h2 className="subtitle has-text-grey">{tx ? tx.hash : ""}</h2>
                        <h6 className="title is-6"><span className="has-text-success">Comfirmed</span> at <a href="" className="">#{tx ? tx.height : ""}</a></h6>
                        <article className="message is-success"><div className="message-header"><p>Successful</p></div></article>
                        <div className="columns">
                            <div className="column"><p><strong>Operation</strong>: {tx ? tx.operation : ""}</p>
                            {/* <p><strong>Memo</strong>: CTT522-CQ2015/32</p> */}
                                {/* <p><strong>Tags</strong>: 2</p> */}
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
                                                <span><a onClick={(e) => this.toProfile(e, tx.account)} href="" className="">{tx ? tx.account : ""}</a></span>
                                            </td>
                                        </tr> 
                                        {tx && tx.address.length 
                                            ? 
                                            <tr className=""> 
                                                <td data-label="Key" className="">
                                                <span>address</span>
                                                </td>
                                                <td data-label="value" className="">
                                                    <span><a onClick={(e) => this.toProfile(e, tx.address)} href="" className="">{tx.address}</a></span>
                                                </td>
                                            </tr> 
                                            :
                                            ""
                                            }
                                        
                                    </tbody> 
                                </table>
                            </div> 
                            <pre>{ tx ? JSON.stringify(JSON.parse(tx.tx), null, 2) : ""} </pre> {/*transaction */}
                        </div>
                    </div>
                </section>
            </div>
                        );
                    }
                }
                
export default withRouter(transactionDetail);