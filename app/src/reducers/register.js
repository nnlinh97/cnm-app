import * as Types from './../constants/ActionTypes';

let initialState = {
    mess: '',
    status: 0
};

const register = (state = initialState, action) => {
    
    switch (action.type) {
        
        case Types.CREATE_SUCCESS:
            return{
                mess: Types.CREATE_SUCCESS,
                status: 1
            }
            
        case Types.CREATE_FAIL:
            return {
                mess: Types.CREATE_FAIL,
                status: 2
            }
           
        default: return state;
    }
}

export default register;