import { combineReducers } from 'redux';

import userState from './user';
import borrowAppState from './borrowApp.js';
import borrowState from './borrow';

const rootReducer = combineReducers({
    userState,
    borrowAppState,
    borrowState
});
export default rootReducer;