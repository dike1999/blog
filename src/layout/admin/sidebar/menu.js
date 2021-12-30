import {
  HomeOutlined,
  SwitcherOutlined,
  FolderOpenOutlined,
  EditOutlined,
  UserOutlined,
} from '@/utils/icons';

const menu = [
  {
    path: '/admin',
    icon: HomeOutlined,
    name: '首页',
  },
  {
    path: '/admin/article',
    icon: SwitcherOutlined,
    name: '文章管理',
    children: [
      {
        path: '/admin/article/manager',
        icon: FolderOpenOutlined,
        name: '更改',
      },
      {
        path: '/admin/article/add',
        icon: EditOutlined,
        name: '新增',
      },
    ],
  },
  {
    path: '/admin/user',
    icon: UserOutlined,
    name: '用户管理',
  },
];

export default menu;
