import * as Types from './../constants/ActionTypes';

// ===================Product====================
export const getProfile = (profile) => {
    return {
        type: Types.GET_PROFILE,
        profile: profile
    }
}

export const getListPosts = (posts) => {
    return {
        type: Types.GET_LIST_POSTS,
        posts: posts
    }
}

export const updateLikePost = (post) => {
    return {
        type: Types.UPDATE_LIKE_POST,
        post: post
    }
}

export const createNewPost = (post) => {
    return {
        type: Types.CREATE_NEW_POST,
        post: post
    }
}

export const getListFollowers = (followers) => {
    return {
        type: Types.GET_LIST_FOLLOWERS,
        followers: followers
    }
}

export const getListFollowings = (followings) => {
    return {
        type: Types.GET_LIST_FOLLOWINGS,
        followings: followings
    }
}
export const login = (publicKey)=>{
    return{
        type:Types.LOGIN,
        publicKey
    }
}
export const loginFail=()=>{
    return{
        type:Types.LOGIN_FAIL,
        mess:Types.MESS_ERR
    }
}
export const logOut=()=>{
    return{
        type:Types.LOG_OUT
    }
}
export const register_Success=()=>{
    return{
        type:Types.CREATE_SUCCESS
        
    }
}
export const register_Fail=()=>{
    return{
        type:Types.CREATE_FAIL,
       
    }
}
export const openAccount=()=>{
    return{
        type:Types.OPEN_ACCOUNT
    }
}
export const closeAccount=()=>{
    return{
        type:Types.CLOSE_ACCOUNT
    }
}

