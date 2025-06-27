import React, { useState } from 'react';
import Wrapper from '../../components/Wrapper';
import ChatBar from './components/ChatBar';
import DicussionBox from './components/DicussionBox';

const Discussions = () => {
  const [currentDiscussionId,setCurrentDiscussionId] = useState(null);
  return (
    <Wrapper>
        <ChatBar setCurrentDiscussionId={setCurrentDiscussionId} />
        <DicussionBox currentDiscussionId={currentDiscussionId} />
    </Wrapper>
  );
};

export default Discussions;