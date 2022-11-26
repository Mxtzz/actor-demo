import styled from 'styled-components';
import { List, Skeleton, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getHomeList } from '@/api';

const HomeList = ({ name = '' }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    list: [],
    page: 1,
    size: 30,
    count: 0,
  });
  const [param, setParam] = useState({
    page: 1,
    name,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const result = await getHomeList({ ...param });
        if (result && result.data) {
          const data = result.data;
          setData(l => {
            return {
              list: l.list.concat(data.data),
              page: data.page,
              size: data.size,
              count: data.count,
            };
          });
        }
        console.log('getHomeList', result);
      } catch (err) {
        console.log('getHomeList err', err);
      }
      setLoading(false);
    })();
  }, [param]);

  useEffect(() => {
    setData({
      list: [],
      page: 1,
      size: 30,
      count: 0,
    });
    setParam(p => {
      return { ...p, name };
    });
  }, [name]);

  const onClick = id => {
    if (id) {
      // navigate('/detail', { state: { id } });
      navigate('/detail?id=' + id);
    }
  };

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setParam(p => {
      return { ...p, page: p.page + 1 };
    });
  };

  console.log('data', data);

  return (
    <Wrapper>
      <Container id="scrollableDiv">
        <InfiniteScroll
          dataLength={data.list.length}
          next={loadMoreData}
          hasMore={data.count / data.size > data.page}
          loader={
            <Skeleton
              avatar
              paragraph={{
                rows: 1,
              }}
              active
            />
          }
          style={{ overflowX: 'hidden' }}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            grid={{
              gutter: 20,
              xs: 2,
              sm: 2,
              md: 4,
              lg: 6,
              xl: 6,
              xxl: 8,
            }}
            dataSource={data.list}
            renderItem={item => (
              <List.Item>
                <ItemWrapper onClick={() => onClick(item.id)}>
                  <Img bg={item.picture} />
                  <TitleWrapper>
                    <Title>{item.name}</Title>
                    <Desc>{item.age + '岁'}</Desc>
                  </TitleWrapper>
                </ItemWrapper>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  overflow-x: hidden;

  .ant-list .ant-row {
    /* justify-content: space-between; */
  }

  // 滚动条样式
  ::-webkit-scrollbar {
    width: 6px;
  }
  // 滚动槽
  ::-webkit-scrollbar-track {
    border-radius: 6px;
  }
  // 滑块
  ::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ItemWrapper = styled.div`
  margin: 10px;
  cursor: pointer;
`;

const Img = styled.div`
  margin: 0 auto;
  min-height: 80px;
  min-width: 80px;
  height: 8vw;
  width: 8vw;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.5);
  border-radius: 5rem;
  flex: 1;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${props => props.bg});
`;

const TitleWrapper = styled.div`
  /* background: #fff; */
  text-align: center;
`;

const Title = styled.div`
  margin: 1rem 0.7rem 0 0.7rem;
  font-size: 1rem;
  line-height: 1rem;
  /* font-weight: bold; */
`;

const Desc = styled.div`
  /* color: ${props => props.color}; */
  margin: 0.3rem 0.7rem 0.5rem 0.7rem;
  font-size: 0.8rem;
`;

export { HomeList as List };
