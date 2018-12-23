import * as Types from './../constants/ActionTypes';

let initialState = {};
const profileNF = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_PROFILE_NEW_FEED:
            return {
                ...action.profileNF
            };

        default: return state;
    }
}

export default profileNF;