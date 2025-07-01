import React from 'react';
import Wrapper from '../../components/Wrapper';
import EmptyComponent from "../../components/EmptyComponent";
import { BellOff } from 'lucide-react';

const Notifications = () => {
  return (
    <Wrapper>
      <EmptyComponent message={"Aucune notification pour le moment"} Icon={BellOff} />
    </Wrapper>
  );
};

export default Notifications;