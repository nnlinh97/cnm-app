import { combineReducers } from 'redux';
import profile from './profile';
import posts from './posts';

const appReducers = combineReducers({
    profile,
    posts
});

export default appReducers;