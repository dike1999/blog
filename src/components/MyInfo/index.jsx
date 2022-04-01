import React from 'react';
import { Divider, Rate, Image } from 'antd';

import { QqOutlined, MailFilled } from '@/utils/icons';
import Href from '@/components/Href';

const skills = [
  {
    label:
      '熟悉 HTML5、CSS3、JavaScript 基础技术，了解W3C标准及前端模板样式规范',
    rate: 4,
  },
  {
    label: '熟悉使用常见前端框架 React 以及 Vue，并有相关的公司实习经验',
    rate: 4,
  },
  {
    label: '了解 HTTP 协议，缓存、安全、性能优化、浏览器工作原理等',
    rate: 4,
  },
  {
    label: '熟练使用 Git 进行项目代码版本的控制和管理，参与团队协作',
    rate: 3,
  },
  {
    label: '熟悉常用的算法与数据结构，关注前端新技术发展',
    rate: 3,
  },
];

const MyInfo = () => (
  <>
    <Divider orientation='left'>博客简述</Divider>
    <p>本博客使用的技术为 React + Antd + Koa2 + Mysql</p>
    <Divider orientation='left'>关于我</Divider>

    <ul style={{ marginLeft: '20px', listStyle: 'circle' }}>
      <li>姓名: 狄克</li>
      <li>学校: 成都信息工程大学</li>
      <li>学历专业: 本科 软件工程</li>
      <li>
        联系方式:
        <QqOutlined />
        &nbsp;1138832931
        <Divider type='vertical' />
        <MailFilled style={{ marginRight: 5 }} />
        <a href='mailto:1138832931@qq.com'>1138832931@qq.com</a>
      </li>
      <li>坐标: 成都市</li>
      <li>
        其他链接:
        <Href href='https://github.com/dike1999' extra={<span>GitHub</span>} />
      </li>
      <li>
        专业技能
        <ul>
          {skills.map((item) => (
            <li key={`${item.label}`}>
              {item.label}
              <Rate defaultValue={item.rate} disabled />
            </li>
          ))}
        </ul>
      </li>
      <li>
        其他
        <ul>
          <li>常用开发工具: VSCode、Vim、Git</li>
          <li>熟悉的 UI 框架: Antd、Element-UI、Vant</li>
          <li>具备良好的编码风格和习惯，团队规范意识，乐于分享</li>
          <li>具备抗压能力、且具有一定自学能力，能够快速适应新环境</li>
        </ul>
      </li>
      <li>
        个人
        <ul>
          <li>欢迎交流!</li>
        </ul>
      </li>
    </ul>
  </>
);

export default MyInfo;
