import React from 'react';
import Wrapper from '../../components/Wrapper';
import ChatBar from './components/ChatBar';
import { Outlet } from 'react-router-dom';

const Discussions = () => {
  return (
    <Wrapper>
      <section className='flex justify-center h-[570px] mx-auto max-w-[1100px] w-[90%] border-blue-100 overflow-x-auto shadow-md'>
        <ChatBar />
        <Outlet />
      </section>
    </Wrapper>
  );
};

export default Discussions;