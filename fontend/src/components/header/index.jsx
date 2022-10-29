import styled from 'styled-components';
import { Layout } from 'antd';

export const Header = () => {
  return (
    <Layout.Header>
      <Wrapper>{'actor'}</Wrapper>
    </Layout.Header>
  );
};

const Wrapper = styled.div``;
