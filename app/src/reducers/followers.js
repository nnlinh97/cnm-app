import * as Types from './../constants/ActionTypes';

let initialState = [];
const followers = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_LIST_FOLLOWERS:
            state = action.followers;
            return [...state];

        default: return [...state];
    }
}

export default followers;