import * as Types from './../constants/ActionTypes';

let initialState = null;
const profile = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_PROFILE:
            state = action.profile;
            return state;

        default: return state;
    }
}

export default profile;