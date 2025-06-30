import React  from 'react';
import Wrapper from '../../components/Wrapper';
import ContactSideBar from './components/ContactSideBar';
import { Outlet } from 'react-router-dom';

const Contact = () => {
  return (
    <Wrapper>
      <div className='w-[90%] md:w-[70%] lg:w-[50%] mx-auto'>
        <ContactSideBar />
        <Outlet />
      </div>
    </Wrapper>
  );
};

export default Contact;