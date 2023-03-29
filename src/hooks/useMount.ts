import { useEffect } from 'react';

const useMount = (callback) => {
  useEffect(() => {
    if (callback && typeof callback === 'function') {
      callback();
    }
  }, []);
};

export default useMount;
