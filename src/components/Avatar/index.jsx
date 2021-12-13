import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Popover } from 'antd';

import { DISCUSS_AVATAR } from '@/config';
import Href from '@/components/Href';
import './index.less';

const AvatarComponent = ({ username, github, role }) => {
  let avatarSrc = '';
  if (github && github.avatar_url) avatarSrc = github.avatar_url;
  if (role === 1 && username === 'coderdi') avatarSrc = DISCUSS_AVATAR;
  return <Avatar src={avatarSrc}>{username}</Avatar>;
};

//
const AppAvatar = ({ userInfo, popoverVisible }) => {
  const { role, username, github } = userInfo;
  if (github && popoverVisible) {
    return (
      <Popover
        arrowPointAtCenter
        overlayClassName='avatar-popover'
        trigger='hover'
        placement='topLeft'
        content={(
          <div className='popover-content'>
            <Href
              href={github.html_url}
              className='popover-cotent-avatar'
              extra={(
                <AvatarComponent
                  role={role}
                  github={github}
                  username={username}
                />
              )}
            />
            <ul className='github-info'>
              <li>
                {github.name && (
                  <span className='github-name'>{github.name}</span>
                )}
              </li>
            </ul>
          </div>
        )}
      >
        <AvatarComponent role={role} github={github} username={username} />
        <span />
      </Popover>
    );
  }
  return <AvatarComponent role={role} github={github} username={username} />;
};

AppAvatar.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  userInfo: PropTypes.object.isRequired,
  popoverVisible: PropTypes.bool,
};

AppAvatar.defaultProps = {
  popoverVisible: true,
};

export default AppAvatar;
