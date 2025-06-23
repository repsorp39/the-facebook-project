import React from 'react';
import { useSelector } from 'react-redux';
import SiteMark from './SiteMark';


const TopBar = () => {

  const userinfo = useSelector(state=>state.auth.userinfo);

  return (
      <header className=''>
        <div> <SiteMark />qqq </div>
      </header>
  );
};

export default TopBar;