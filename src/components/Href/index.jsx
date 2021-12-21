import React from 'react';
import PropTypes from 'prop-types';
import { Popover, Button, Image } from 'antd';

const Href = ({
  extra, href, isImg = false, ...restProps
}) => {
  const isExternal = (path) => /^(https?:|mailto:|tel:|http:)/.test(path);

  let url = href;
  if (!isExternal(href)) {
    url = `http://${href}`;
  }

  return isImg ? (
    <Popover
      placement='right'
      title={(
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h3 style={{ marginBottom: 0 }}>{extra}</h3>
        </div>
      )}
      content={<Image width={150} src={href} />}
      trigger='hover'
      color='#cccccc'
      style={{ display: 'inline-block', paddingLeft: '5px' }}
      {...restProps}
    >
      <Button type='text' size='small'>
        {extra}
      </Button>
    </Popover>
  ) : (
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
