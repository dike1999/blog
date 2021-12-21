import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Avatar } from 'antd';

import { SIDEBAR, ABOUT } from '@/config';
import axios from '@/utils/axios';
import Discuss from '@/components/Discuss';
import Footer from '@/components/Footer';

const About = () => {
  const [commentList, setCommentList] = useState([]);
  const iphoneScreen = useMediaQuery({ query: '(max-width: 576px)' });

  useEffect(() => {
    const fetchList = () => {
      axios.get('/article/-1').then((article) => {
        setCommentList(article.comments);
      });
    };
    if (ABOUT.discuss) fetchList();
  }, []);

  return (
    <div
      className='app-about'
      style={{ paddingRight: iphoneScreen ? 0 : 20, marginTop: '10px' }}
    >
      <Avatar src={SIDEBAR.avatar} />
      <span style={{ paddingLeft: 10 }}>{ABOUT.describe}</span>
      {ABOUT.renderMyInfo || null}
      {ABOUT.discuss && (
        <Discuss
          articleId={-1}
          commentList={commentList}
          setCommentList={setCommentList}
        />
      )}
      <Footer />
    </div>
  );
};

export default About;
