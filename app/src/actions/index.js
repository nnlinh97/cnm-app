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
