import React  from 'react';
import Wrapper from '../../components/Wrapper';
import ContactSideBar from './components/ContactSideBar';
import { Outlet } from 'react-router-dom';

const Contact = () => {
  return (
    <Wrapper>
      <ContactSideBar />
      <Outlet />
    </Wrapper>
  );
};

export default Contact;