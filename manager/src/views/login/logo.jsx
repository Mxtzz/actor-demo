import styled from 'styled-components';
import logo from '@/assets/imgs/ant.svg';

const Logo = () => {
  return (
    <Wrapper>
      <Img src={logo} alt="logo" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100px;
  width: 100px;
`;

const Img = styled.img`
  height: 100px;
  width: 100px;
`;

export default Logo;
