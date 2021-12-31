import React from 'react';
import { Helmet } from 'react-helmet';

import { HEADER_TITLE } from '@/config';

const Head = ({ title, children, usePrefix = true }) => (
  <Helmet>
    {usePrefix && title ? (
      <title>{`${HEADER_TITLE}-${title}`}</title>
    ) : (
      <title>{title}</title>
    )}
    {children}
  </Helmet>
);

export default Head;
