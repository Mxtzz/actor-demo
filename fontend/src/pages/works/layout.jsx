import styled from 'styled-components';
import { Layout } from 'antd';
import { COLOR } from '@config/constant';

const { Content } = Layout;

const WorksLayout = props => {
  const { gallery } = props;

  return (
    <Wrapper bg={COLOR.WorksBg}>
      <Container>
        {/* <TitleWrapper>
          <Title>{data.works.title}</Title>
          <SubTitle>{data.works.subTitle}</SubTitle>
          <Btns>
            <SwapLeftOutlined className="page-btn" onClick={() => slider.slidePrev()} />
            <SwapRightOutlined className="page-btn" onClick={() => slider.slideNext()} />
          </Btns>
        </TitleWrapper> */}
        <GalleryWrapper>{gallery}</GalleryWrapper>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled(Layout)`
  position: absolute;
  width: 100%;
  height: 100%;
  color: #fff;
  user-select: none;
  background: ${props => props.bg};
`;
const Container = styled(Content)`
  position: absolute;
  left: 20%;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const GalleryWrapper = styled.div``;
// const TitleWrapper = styled.div`
//   display: flex;
//   align-items: flex-end;
//   margin: 32px 0;
// `;
// const Title = styled.div`
//   color: #fff;
//   font-size: 38px;
//   margin-right: 20px;
// `;
// const SubTitle = styled.div`
//   color: #aaa;
//   font-size: 22px;
// `;

// const Btns = styled.div`
//   flex: 1;
//   display: flex;
//   justify-content: flex-end;
//   margin-right: 10vw;
//   .page-btn {
//     color: #999;
//     background: #222;
//     border-radius: 2rem;
//     font-size: 2rem;
//     padding: 6px;
//     margin-left: 2rem;
//     cursor: pointer;
//     transition: all 0.2s ease-in-out;
//     &:hover {
//       color: #aaa;
//       background: #666;
//     }
//   }
// `;

export { WorksLayout as Layout };
