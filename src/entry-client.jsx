import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Provider as BusProvider } from '@/hooks/useBus';

import store from '@/redux';
import App from './App';

ReactDOM.render(
  <BusProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </BusProvider>,
  document.getElementById('root')
);
