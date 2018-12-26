import * as Types from './../constants/ActionTypes';
let account = localStorage.getItem('account');

const initialState = account ? { status: 1, account } : {};
const login = (state = initialState, action) => {
    switch (action.type) {
        case Types.LOGIN:
            state = {
                account:action.publicKey,
                
                status: 1
            };
            return state;
        case Types.LOGIN_FAIL:
            return {
                account:{},
                status: -1,
                mess:Types.LOGIN_FAIL
            }
            
        case Types.LOG_OUT:
            return state;
        default: return state;
    }
}

export default login;