import * as Types from './../constants/ActionTypes';

let initialState = {};
const profile = (state = initialState, action) => {
    switch (action.type) {
        case Types.SAVE_PROFILE:
            return {
                ...action.profile
            };

        default: return state;
    }
}

export default profile;