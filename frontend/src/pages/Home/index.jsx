import React from 'react';
import Wrapper from '../../components/Wrapper';
import Article from './components/Article';
import CreatePost from './components/CreatePost';

function Home() {
  return (
      <Wrapper>
            <CreatePost />
            <Article />
      </Wrapper>
  );
}

export default Home;