import React from 'react';
import PropTypes from 'prop-types';

const Href = ({ extra, href, ...restProps }) => {
  const isExternal = (path) => /^(https?:|mailto:|tel:|http:)/.test(path);

  let url = href;
  if (!isExternal(href)) {
    url = `http://${href}`;
  }

  return (
    <a target='_blank' rel='noreferrer noopener' href={url} {...restProps}>
      {extra}
    </a>
  );
};

Href.prototype = {
  extra: PropTypes.element,
  href: PropTypes.string,
};

export default Href;
