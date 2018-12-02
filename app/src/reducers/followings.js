import * as Types from './../constants/ActionTypes';

let initialState = [];
const followings = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_LIST_FOLLOWINGS:
            state = action.followings;
            return [...state];

        default: return [...state];
    }
}

export default followings;