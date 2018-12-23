import * as Types from './../constants/ActionTypes';

let initialState = {};
const profileNF = (state = initialState, action) => {
    switch (action.type) {
        case Types.COUNT_MENU_TOP:
            return {
                ...action.count
            };

        default: return state;
    }
}

export default profileNF;