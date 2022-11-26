import styled from 'styled-components';
import { COLOR } from '@config/constant';
import { Divider, Typography, Skeleton } from 'antd';

const { Paragraph } = Typography;

export const DetailLayout = props => {
  const { loading, detail: {
    name, award, intro,
  } } = props;

  return (
    <Wrapper>
      <Container>
        <LeftWrapper>{loading ? <Skeleton.Image active /> : props.gallery}</LeftWrapper>
        <RightWrapper>
          {loading ? (
            <Skeleton active />
          ) : (
            <>
              <Name>{name}</Name>
              <Descriptions>{intro}</Descriptions>
              <Divider style={{ borderTop: '2px solid #e0e0e0' }} />
              <Typography.Title level={5} style={{ margin: 0, fontWeight: 400 }}>
                {'获奖记录'}
              </Typography.Title>
              <Paragraph>{award}</Paragraph>
              <Typography.Title level={5} style={{ margin: 0, fontWeight: 400 }}>
                {'自我介绍'}
              </Typography.Title>
              <Paragraph>{intro}</Paragraph>
            </>
          )}
        </RightWrapper>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 64px;
  bottom: 0;
  display: flex;
`;

const Container = styled.div`
  position: relative;
  flex: 1;
  display: flex;
`;

const LeftWrapper = styled.div`
  overflow: hidden;
  flex: 1;
  display: flex;
  justify-content: center;
`;

const RightWrapper = styled.div`
  flex: 1;
  margin-right: 8%;
`;

const Name = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
  color: ${COLOR.DetailTitle};
`;

const Descriptions = styled.div`
  color: ${COLOR.DetailDesc};
`;
