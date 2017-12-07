import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from '../redux/reducers';

const middlewares = [thunk];

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

if(__DEV__){
    const logger = createLogger({
        predicate: (getState, action) => isDebuggingInChrome,
        collapsed: true,
        duration: true,
    });
    middlewares.push(logger); 
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore() {
    const store = createStoreWithMiddleware(rootReducer);

    return store;
}