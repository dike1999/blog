import React from 'react';
import lazy from '@/components/Lazy';

const Components = lazy(() => import('@/components/404'));

const App = () => (
  <div className='app'>
    <Components />
  </div>
);

export default App;
