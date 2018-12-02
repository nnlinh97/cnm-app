import { combineReducers } from 'redux';
import profile from './profile';
import posts from './posts';
import followers from './followers';
import followings from './followings';

const appReducers = combineReducers({
    profile,
    posts,
    followers,
    followings
});

export default appReducers;