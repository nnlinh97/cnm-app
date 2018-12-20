import * as Types from './../constants/ActionTypes';


const toogle = false
const createAcc = (state = toogle, action) => {
    switch (action.type) {
        case Types.OPEN_ACCOUNT:
            state = true
            return state;
        case Types.CLOSE_ACCOUNT:
            state = false
            return state;

        default: return state;
    }
}

export default createAcc;