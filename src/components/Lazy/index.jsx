import React, { Component } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './index.less';

const antIcon = (
  <LoadingOutlined type='loading' style={{ fontSize: 24 }} spin />
);

/**
 * 使用 webpack 的 import 方法实现动态加载组件！dynamic import
 * @param {Function} importComponent - example const xx = asyncComponent(() => import('./xxx'))
 */
export const asyncComponent = (importComponent) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);
      this.state = { component: null };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();
      this.setState({ component });
    }

    render() {
      // eslint-disable-next-line react/destructuring-assignment
      const RenderComponet = this.state.component;
      return RenderComponet ? (
        <RenderComponet {...this.props} />
      ) : (
        <Spin indicator={antIcon} className='async-com-loading' />
      );
    }
  };

export default asyncComponent;
