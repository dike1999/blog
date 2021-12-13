import React from 'react';
import { useDispatch } from 'react-redux';

import useMount from '@/hooks/useMount';
import { getTagList, getCategoryList } from '@/redux/article/actions';
import SignModal from '@/components/Public/SignModal';
import UploadModal from '@/components/Public/UploadModal';

/**
 * @component Public 公共组件，挂在在 APP.jsx 中，用于存放初始化的组件/方法 或者公用的 modal 等
 */
const PublicComponent = () => {
  const dispatch = useDispatch(); // dispatch hooks

  useMount(() => {
    dispatch(getTagList());
    dispatch(getCategoryList());
  });

  return (
    <>
      <SignModal />
      <UploadModal />
    </>
  );
};

export default PublicComponent;
