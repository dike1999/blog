import React from 'react';
import { Layout } from 'antd';
import { ONLINE_TIME } from '@/config';
import dayjs from '@/utils/dayjs';
import styles from './index.module.less';

const { Footer } = Layout;

const WebFooter = () => (
  <Footer className={styles.Footer}>
    <span className={styles.content}>
      (●&apos;◡&apos;●)ﾉ本博客已萌萌哒运行了&nbsp;
      <span>{dayjs().diff(ONLINE_TIME, 'day')}</span>
      &nbsp;天
    </span>
  </Footer>
);

export default WebFooter;
