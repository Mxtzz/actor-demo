import styled from 'styled-components';
import { Layout } from 'antd';

export const Footer = () => {
  return (
    <Layout.Footer>
      <Wrapper>{'Actor ©2022 Created by Mxtzz'}</Wrapper>
    </Layout.Footer>
  );
};

const Wrapper = styled.div`
  text-align: center;
  user-select: none;
`;
