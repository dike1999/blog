import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Provider as BusProvider } from '@/hooks/useBus';

import store from '@/redux';
import App from './App';

createRoot(document.getElementById('root')).render(
  <BusProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </BusProvider>
);
