import styled from 'styled-components';
import { Layout } from './layout';
import { Gallery } from './gallery';

export const Works = () => {
  return (
    <Wrapper>
      <Layout gallery={<Gallery />} />
    </Wrapper>
  );
};

const Wrapper = styled.div``;
