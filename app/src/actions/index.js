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

