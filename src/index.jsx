import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { Provider as BusProvider } from '@/hooks/useBus';
import store from '@/redux';
import App from './App';
import './index.less';

ReactDOM.render(
  <BusProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </BusProvider>,
  document.getElementById('root')
);
