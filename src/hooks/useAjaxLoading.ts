import { useState } from 'react';

/**
 * ajax request with loading
 */
const useRequestLoading = () => {
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line consistent-return
  const withLoading = (request) => {
    if (request instanceof Promise) {
      return new Promise((reslove, reject) => {
        setLoading(true);
        request
          .then((res) => {
            reslove(res);
            setLoading(false);
          })
          .catch((e) => {
            reject(e);
            setLoading(false);
          });
      });
    }
  };

  return [loading, withLoading];
};

export default useRequestLoading;
