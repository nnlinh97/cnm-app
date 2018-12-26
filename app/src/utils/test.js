import axios from 'axios'
import {URLTest} from './../constants/Config';
export const checkAccount=(account)=>axios.get(`https://komodo.forest.network/tx_search?query="account='${account}'"`);
export const createAccount=(tx)=>axios.get(`https://komodo.forest.network/broadcast_tx_commit?tx=${tx}`)
