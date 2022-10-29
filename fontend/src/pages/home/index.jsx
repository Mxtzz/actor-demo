import styled from 'styled-components';
import { Layout } from 'antd';
import { Header, Footer } from '@comp';

export const Home = () => {
  return (
    <Wrapper>
      <Layout>
        <Header>{'header'}</Header>
        <Layout.Content>{'Content'}</Layout.Content>
        <Footer />
      </Layout>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
