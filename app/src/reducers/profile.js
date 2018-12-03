import * as Types from './../constants/ActionTypes';

let initialState = {
    "id": "1",
    "username": "nnlinh97",
    "avatarURL": "https://tinyurl.com/yavpgl4g",
    "createAt": 1543540983,
    "birthday": 1543540983,
    "following": 9,
    "follower": 6,
    "location": "Ho Chi Minh, Vietnam",
    "desc": "work hard is a key to success",
    "tweets": 4
};
const profile = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_PROFILE:
            state = action.profile;
            return state;

        default: return state;
    }
}

export default profile;