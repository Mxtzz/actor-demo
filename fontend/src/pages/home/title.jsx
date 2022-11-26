import styled from 'styled-components';

export const Title = props => {
  const { title, subTitle, desc } = props;
  return (
    <Wrapper>
      <H1>{title}</H1>
      <SubTitleWrapper>
        <SubTitle>{subTitle}</SubTitle>
        <Border />
      </SubTitleWrapper>
      <Desc>{desc}</Desc>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const H1 = styled.h1`
  color: #fff;
  font-size: 3rem;
  line-height: 4rem;
  margin-bottom: 0;
  font-weight: bold;
`;
const SubTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.6rem;
`;
const SubTitle = styled.div`
  padding: 0 6px;
  font-size: 0.9rem;
  color: #000;
  font-weight: 500;
  background: #fff;
  margin-bottom: 0;
  letter-spacing: 3px;
`;
const Border = styled.div`
  flex: 0.5;
  height: 2px;
  background: #fff;
`;
const Desc = styled.div`
  margin-top: 0.6rem;
  color: #fff;
  font-size: 1rem;
`;
