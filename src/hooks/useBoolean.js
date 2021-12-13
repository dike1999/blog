import { useState, useCallback } from 'react';

// 优雅的管理 boolean 状态的 Hook
const useBoolean = (defaultValue = false) => {
  const [value, setValue] = useState(defaultValue);

  const setTrue = useCallback(() => setValue(true), [value]);
  const setFalse = useCallback(() => setValue(false), [value]);

  const toggle = useCallback(() => {
    if (typeof value === 'boolean') {
      setValue(value);
    }
  }, [value]);

  return {
    value,
    setTrue,
    setFalse,
    toggle,
  };
};

export default useBoolean;
