import styled from 'styled-components';
import { Layout } from 'antd';
import Bg from '../../assets/home-bg.png';

const { Content } = Layout;

const HomeLayout = props => {
  const { search, list } = props;
  return (
    <Wrapper>
      <Background />
      <Container>
        <Header>
          <SearchWrapper>{search}</SearchWrapper>
        </Header>
        <Main>{list}</Main>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled(Layout)`
  position: absolute;
  width: 100%;
  height: 100%;
`;
const Background = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-image: url(${Bg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  filter: blur(4px);
`;
const Container = styled(Content)`
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  height: 64px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const Main = styled.div`
  flex: 1;
  position: relative;
  margin: 0 10%;
`;

const SearchWrapper = styled.div`
  margin: 0 10%;
  max-width: 1280px;
`;

export { HomeLayout as Layout };
