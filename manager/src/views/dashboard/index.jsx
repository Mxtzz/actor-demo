import { useEffect } from 'react';
import styled from 'styled-components';

const Dashboard = () => {
  useEffect(() => {
    console.log('dashboard init');
  }, []);
  return <Wrapper>{'Dashboard'}</Wrapper>;
};

const Wrapper = styled.div``;

export default Dashboard;
