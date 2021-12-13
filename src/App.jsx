import React from 'react';
import lazy from '@/components/Lazy';

const Components = lazy(() => import('@/components/MyInfo'));
const App = () => (
  <div className='app'>
    <Components />
  </div>
);

export default App;
