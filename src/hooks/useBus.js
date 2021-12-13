import React, {
  createContext, useContext, useEffect, useState
} from 'react';
import mitt from 'mitt';

export const BusContext = createContext(null);

const useBus = () => useContext(BusContext);

export const useListener = (name, fn) => {
  const bus = useBus();
  useEffect(() => {
    bus.on(name, fn);
    return () => {
      bus.off(name, fn);
    };
  }, [bus, name, fn]);
};

export const Provider = ({ children }) => {
  const [bus] = useState(() => mitt());
  return <BusContext.Provider value={bus}>{children}</BusContext.Provider>;
};

export default useBus;
