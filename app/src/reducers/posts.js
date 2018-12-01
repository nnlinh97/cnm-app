import * as Types from './../constants/ActionTypes';
import _ from 'lodash';

let initialState = [];
const posts = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_LIST_POSTS:
            state = action.posts;
            return [...state];

        case Types.UPDATE_LIKE_POST:
            let index = _.findIndex(state, { 'id': action.post.id });
            if (index !== -1) {
                state[index] = action.post;
            }
            return [...state];
        case Types.CREATE_NEW_POST:
            state = [action.post, ...state];
            return [...state];

        default: return [...state];
    }
}

export default posts;