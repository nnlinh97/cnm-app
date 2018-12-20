import { combineReducers } from 'redux';
import profile from './profile';
import posts from './posts';
import followers from './followers';
import followings from './followings';
import login from './login';
import register from './register';
import createAcc from './createAcc'
const appReducers = combineReducers({
    profile,
    posts,
    followers,
    followings,
    login,
    register,
    createAcc
});

export default appReducers;