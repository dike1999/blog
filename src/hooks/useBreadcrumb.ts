import { useEffect } from 'react';
import useBus from '@/hooks/useBus';

const useBreadcrumb = (list = []) => {
  const bus = useBus();
  useEffect(() => {
    bus.emit('breadcrumbList', list);
    return () => {
      bus.emit('breadcrumbList', []);
    };
  }, []);
};

export default useBreadcrumb;
