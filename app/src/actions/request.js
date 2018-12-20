import callAPI from '../utils/ConnectAPI';
import * as Action from './index';
import connectapi from '../utils/api';
import axios from 'axios';

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

export const createAccount = (params) =>{
    return (dispatch) => {
        console.log(params);
        axios.get(`http://localhost:4200/users/get-user?idKey=${params.yPrivateKey}`).then((res) => {
            console.log(res);
        })
    }
    
}