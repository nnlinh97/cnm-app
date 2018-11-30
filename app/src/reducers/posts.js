import * as Types from './../constants/ActionTypes';

let initialState = [];
const posts = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_LIST_POSTS:
            state = action.posts;
            return [...state];

        default: return [...state];
    }
}

export default posts;