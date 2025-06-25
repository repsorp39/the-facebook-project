import React from 'react';
import SideBar from '../../components/SideBar';
import Wrapper from '../../components/Wrapper';
import TopBar from '../../components/TopBar';
import Banner from './components/Banner';
import Article from './components/Article';

function Home() {
  return (
      <Wrapper>
            <Banner />
            <Article />
      </Wrapper>
  );
}

export default Home;