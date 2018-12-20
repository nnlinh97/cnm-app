import callAPI from '../utils/ConnectAPI';
import * as Action from './index';
import { checkAccount, createAccount } from './../utils/test'
import { createBrowserHistory } from 'history';
const transaction = require('./../lib/tx');
const vstruct = require('varstruct');
const base32 = require('base32.js');
const Transaction = vstruct([
    { name: 'version', type: vstruct.UInt8 },
    { name: 'account', type: vstruct.Buffer(35) },
    { name: 'sequence', type: vstruct.UInt64BE },
    { name: 'memo', type: vstruct.VarBuffer(vstruct.UInt8) },
    { name: 'operation', type: vstruct.UInt8 },
    { name: 'params', type: vstruct.VarBuffer(vstruct.UInt16BE) },
    { name: 'signature', type: vstruct.Buffer(64) },
]);
export const history = createBrowserHistory();
export const getProfile = () => {
    return (dispatch) => {
        return callAPI("/users/1", "GET", null).then((res) => {
            if (res) {
                dispatch(Action.getProfile(res.data));
            }
        });
    }
}

export const getListPosts = () => {
    return (dispatch) => {
        return callAPI("/tweet", "GET", null).then((res) => {
            if (res) {
                dispatch(Action.getListPosts(res.data.reverse()));
            }
        });
    }
}

export const updateLikePost = (post) => {
    return (dispatch) => {
        return callAPI(`/tweet/${post.id}`, "PUT", post).then((res) => {
            if (res) {
                dispatch(Action.updateLikePost(res.data));
            }
        });
    }
}

export const createNewPost = (post) => {
    return (dispatch) => {
        return callAPI("/tweet", "POST", post).then((res) => {
            if (res) {
                dispatch(Action.createNewPost(res.data));
            }
        });
    }
}

export const getListFollowers = () => {
    return (dispatch) => {
        return callAPI("/followers", "GET", null).then((res) => {
            if (res) {
                dispatch(Action.getListFollowers(res.data));
            }
        });
    }
}

export const getListFollowings = () => {
    return (dispatch) => {
        return callAPI("/following", "GET", null).then((res) => {
            if (res) {
                dispatch(Action.getListFollowings(res.data));
            }
        });
    }
}
export const login = (publicKey, privateKey) => {
    return (dispatch) => {
        return checkAccount(publicKey).then((res) => {
            if (res.data.result.txs) {
                dispatch(Action.login(publicKey))
                sessionStorage.setItem('priv', privateKey)
                localStorage.setItem('account', publicKey)

            }
            else {
                dispatch(Action.loginFail())
            }
        })
    }
}
export const logout = () => {
    return (dispatch) => {
        sessionStorage.removeItem('priv')
        localStorage.removeItem('account')
        dispatch(Action.logOut())
    }
}
export const getAccount = (address, publicKey, privateKey) => {
    return (dispatch) => {
        return checkAccount(address).then(async (res) => {
            if (res.data.result.txs) {
                const tx = {
                    version: 1,
                    sequence: 2,
                    memo: Buffer.alloc(0),
                    account: address,
                    operation: "create_account",
                    params: {
                        address: publicKey,
                    },
                }
                try {
                    await transaction.sign(tx, privateKey);
                    const txEncode = '0x' + await transaction.encode(tx).toString('hex');
                    createAccount(txEncode).then((res) => {
                        try {
                            dispatch(Action.register_Success())
                        } catch (err) {
                            dispatch(Action.register_Fail())
                        }




                    }
                    )
                } catch (err) {
                    dispatch(Action.register_Fail())
                }

                // if(res.data.result.height !== 0){//còn mismatch sequence
                //     dispatch(Action.register_Success())
                // }else{
                //     dispatch(Action.register_Fail())
                // }


            }
            else (
                dispatch(Action.register_Fail())
            )
        })
    }
}