import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore.js';

import App from './container/App.js';

const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;