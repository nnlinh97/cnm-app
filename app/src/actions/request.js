import callAPI from '../utils/ConnectAPI';
import * as Action from './index';

export const getProfile = () => {
    return (dispatch) => {
        return callAPI("/users/1", "GET", null).then((res) => {
            dispatch(Action.getProfile(res.data));
        });
    }
}
