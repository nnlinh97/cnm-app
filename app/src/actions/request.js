import callAPI from '../utils/ConnectAPI';
import * as Action from './index';

export const getProfile = () => {
    return (dispatch) => {
        return callAPI("/users/1", "GET", null).then((res) => {
            dispatch(Action.getProfile(res.data));
        });
    }
}

export const getListPosts = () => {
    return (dispatch) => {
        return callAPI("/tweet", "GET", null).then((res) => {
            dispatch(Action.getListPosts(res.data));
        });
    }
}

export const updateLikePost = (post) => {
    console.log(post);
    return (dispatch) => {
        dispatch(Action.updateLikePost(post))
        return callAPI(`/tweet/${post.id}`, "PUT", post).then((res) => {
            // console.log(res.data);
            dispatch(Action.updateLikePost(res.data));
        });
    }
}
