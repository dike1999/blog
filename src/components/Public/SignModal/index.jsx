import React, { useState } from 'react';
import {
  Input, Button, Modal, Form
} from 'antd';
import { useDispatch } from 'react-redux';

import { login, register } from '@/redux/user/actions';
import { useListener } from '@/hooks/useBus';

const FormItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

const SignModal = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch(); // dispatch hooks
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState('login');

  // eslint-disable-next-line no-shadow
  useListener('openSignModal', (type) => {
    form.resetFields();
    setType(type);
    setVisible(true);
  });

  const onFinish = (values) => {
    const action = type === 'login' ? login : register;
    dispatch(action(values)).then(() => {
      setVisible(false); // type =  login | register
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // 确认密码
  const compareToFirstPassword = (rule, value, callback) => {
    const form1 = form;
    if (value && value !== form1.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  return (
    <Modal
      width={460}
      title={type}
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={null}
    >
      <Form
        form={form}
        layout='horizontal'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {type === 'login' ? (
          <>
            <Form.Item
              label='用户名'
              name='account'
              rules={[{ required: true, message: 'Username is required' }]}
              {...FormItemLayout}
            >
              <Input placeholder='请输入用户名' />
            </Form.Item>

            <Form.Item
              label='密码'
              name='password'
              rules={[{ required: true, message: 'Password is required' }]}
              {...FormItemLayout}
            >
              <Input placeholder='请输入密码' type='password' />
            </Form.Item>

            <Form.Item style={{ justifyContent: 'center' }} {...FormItemLayout}>
              <Button type='primary' block htmlType='submit'>
                {type}
              </Button>
            </Form.Item>
          </>
        ) : (
          <>
            <Form.Item
              label='用户名'
              name='username'
              rules={[{ required: true, message: 'Username is required' }]}
              {...FormItemLayout}
            >
              <Input placeholder='请输入用户名' />
            </Form.Item>

            <Form.Item
              label='密码'
              name='password'
              rules={[{ required: true, message: 'Password is required' }]}
              {...FormItemLayout}
            >
              <Input placeholder='请输入密码' type='password' />
            </Form.Item>

            <Form.Item
              label='确认密码'
              name='confirm'
              rules={[
                { required: true, message: 'Password is required' },
                { validator: compareToFirstPassword },
              ]}
              {...FormItemLayout}
            >
              <Input placeholder='确认密码' type='password' />
            </Form.Item>

            <Form.Item
              label='邮箱'
              name='email'
              rules={[
                { type: 'email', message: 'The input is not valid E-mail!' },
                { required: true, message: 'Please input your E-mail!' },
              ]}
              {...FormItemLayout}
            >
              <Input placeholder='请输入您的邮箱' />
            </Form.Item>

            <Form.Item style={{ justifyContent: 'center' }} {...FormItemLayout}>
              <Button type='primary' block htmlType='submit'>
                {type}
              </Button>
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default SignModal;
