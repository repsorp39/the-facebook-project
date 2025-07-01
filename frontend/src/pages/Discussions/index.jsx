import React from 'react';
import Wrapper from '../../components/Wrapper';
import ChatBar from './components/ChatBar';
import { Outlet } from 'react-router-dom';

const Discussions = () => {
  return (
    <Wrapper>
      <section className='flex h-[520px] mx-auto max-w-[950px]  border-blue-100'>
        <ChatBar />
        <Outlet />
      </section>
    </Wrapper>
  );
};

export default Discussions;