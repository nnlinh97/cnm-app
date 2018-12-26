import callAPI from '../utils/ConnectAPI';
import * as Action from './index';
import { checkAccount, createAccount } from './../utils/test'
import { createBrowserHistory } from 'history';
// export const history = createBrowserHistory();
//import connectapi from '../utils/api';
import axios from 'axios';
import connectapi from '../utils/api'

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

// export const getListFollowers = () => {
//     return (dispatch) => {
//         return callAPI("/followers", "GET", null).then((res) => {
//             if (res) {
//                 dispatch(Action.getListFollowers(res.data));
//             }
//         });
//     }
// }

// export const getListFollowings = () => {
//     return (dispatch) => {
//         return callAPI("/following", "GET", null).then((res) => {
//             if (res) {
//                 dispatch(Action.getListFollowings(res.data));
//             }
//         });
//     }
// }
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
// export const getAccount = (address, publicKey, privateKey) => {
//     return (dispatch) => {
//         return checkAccount(address).then(async (res) => {
//             if (res.data.result.txs) {
//                 const tx = {
//                     version: 1,
//                     sequence: 2,
//                     memo: Buffer.alloc(0),
//                     account: address,
//                     operation: "create_account",
//                     params: {
//                         address: publicKey,
//                     },
//                 }
//                 try {
//                     await transaction.sign(tx, privateKey);
//                     const txEncode = '0x' + await transaction.encode(tx).toString('hex');
//                     createAccount(txEncode).then((res) => {
//                         try {
//                             dispatch(Action.register_Success())
//                         } catch (err) {
//                             dispatch(Action.register_Fail())
//                         }




//                     }
//                     )
//                 } catch (err) {
//                     dispatch(Action.register_Fail())
//                 }

//                 // if(res.data.result.height !== 0){//còn mismatch sequence
//                 //     dispatch(Action.register_Success())
//                 // }else{
//                 //     dispatch(Action.register_Fail())
//                 // }


//             }
//             else {
//                 dispatch(Action.register_Fail())
//             }

//         })
//     }
// }
// export const createAccount = (params) =>{
//     // return (dispatch) => {
//     //     console.log(params);
//     //     axios.get(`http://localhost:4200/users/get-user?idKey=${params.yPrivateKey}`).then((res) => {
//     //         console.log(res);
//     //     })
//     // }

// }

export const payment = (params) => {
    console.log(params);
}
export const getListFollowings = (idKey) => {
    return (dispatch) => {
        return connectapi(`/follow/following?idKey=${idKey}`, "GET", null).then((res) => {

            // if (res.status === 200) {

            //     // dispatch(Action.getListFollowings(res.data));
            // }
            // else {
            //     return;
            // }
        });
    }
}
export const getListFollowers = (idKey) =>{
    return(dispatch) =>{
        return connectapi(`/follow/follower?idKey=${idKey}`, "GET", null).then((res)=>{
            if(res.data.status == 200){
                dispatch(Action.getFollowers(res.data.result))
            }else{
                return;
            }
        })
    }
}

