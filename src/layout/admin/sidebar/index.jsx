import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';

import menu from './menu';

const { SubMenu } = Menu;

const getMenuOpenKeys = (menus) => {
  const list = [];
  menus.forEach((item) => {
    if (item.children) {
      item.children.forEach((child) => {
        list.push({
          pathname: child.path,
          openKey: item.path,
        });
      });
    }
  });
  return list;
};
const menuMenuOpenKeys = getMenuOpenKeys(menu);

const AdminSidebar = ({ selectedKeys }) => {
  // 菜单渲染
  const renderMenu = (list) => {
    const renderRoute = (item) => {
      const MenuIcon = item.icon;
      if (item.hidden) return null;
      if (item.children) {
        return (
          <SubMenu
            key={item.path}
            title={(
              <span>
                <MenuIcon />
                <span>{item.name}</span>
              </span>
            )}
          >
            {item.children.map((r) => renderRoute(r))}
          </SubMenu>
        );
      }
      return (
        item.name && (
          <Menu.Item key={item.path}>
            <NavLink to={item.path}>
              <MenuIcon />
              <span>{item.name}</span>
            </NavLink>
          </Menu.Item>
        )
      );
    };
    return list.map((l) => renderRoute(l));
  };

  const target = menuMenuOpenKeys.find((d) => d.pathname === selectedKeys[0]);
  const openKeys = target ? [target.openKey] : [];
  return (
    <Menu
      defaultOpenKeys={openKeys}
      selectedKeys={selectedKeys}
      mode='inline'
      style={{ height: '100%', borderRight: 0 }}
    >
      {renderMenu(menu)}
    </Menu>
  );
};

export default AdminSidebar;
