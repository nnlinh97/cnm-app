import * as Types from './../constants/ActionTypes';

// ===================Product====================
export const getProfile = (profile) => {
    return {
        type: Types.GET_PROFILE,
        profile: profile
    }
}