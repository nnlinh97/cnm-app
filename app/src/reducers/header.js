import * as Types from './../constants/ActionTypes';

let initialState = {};
const header = (state = initialState, action) => {
    switch (action.type) {
        case Types.HEADER:
            return {
                ...action.header
            };

        default: return state;
    }
}

export default header;