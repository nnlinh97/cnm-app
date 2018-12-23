import { combineReducers } from 'redux';
import profile from './profile';
import posts from './posts';
import followers from './followers';
import followings from './followings';
import login from './login';
import register from './register';
import createAcc from './createAcc';
import profileNF from './profileNF';
import countMenuTop from './countMenuTop';
import infoProfile from './infoProfile';
import header from './header';
const appReducers = combineReducers({
    profile,
    posts,
    followers,
    followings,
    login,
    register,
    createAcc,
    profileNF,
    countMenuTop,
    infoProfile,
    header
});

export default appReducers;