import styled from 'styled-components';
import { COLOR } from '@config/constant';
import { List, Typography, Skeleton, Layout, Breadcrumb, Divider, Space } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import { getParams, getBrowserList } from '@/api';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ListItem } from './item';

const { Paragraph } = Typography;

export const Browser = () => {
  // const items = [
  //   { label: '首页', key: 'home' },
  //   { label: '搜索结果', key: 'result' },
  // ];
  const location = useLocation();
  const param = getParams(location.search);

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    loadMoreData();
  }, []);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    (async () => {
      if (param.name) {
        const {
          data: { data, count, size, page },
        } = await getBrowserList(param.name);
        if (data) {
          setList(data);
          const pages = Math.round(count / size);
          setShowMore(pages > page);
        }
        setLoading(false);
      }
    })();
  };

  const onClick = id => {};
  console.log('list', list);

  return (
    <Wrapper>
      <Layout className="browser-layout">
        <Layout.Header>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={'/'}>{'首页'}</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={'/browser'}>{'搜索 "' + param.name + '" 结果'}</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Layout.Header>
        <Layout.Content id="scrollableDiv">
          <InfiniteScroll
            dataLength={list.length}
            next={loadMoreData}
            // hasMore={list.length < 50}
            loader={
              <Space>
                <Skeleton.Image active />
                <br />
                <Skeleton active />
              </Space>
            }
            endMessage={
              <Divider plain style={{ color: '#aaa' }}>
                {'已显示所有结果'}
              </Divider>
            }
            scrollableTarget="scrollableDiv"
          >
            <List
              className="browser-list"
              grid={{
                gutter: 14,
                column: 4,
              }}
              dataSource={list}
              renderItem={item => (
                <List.Item>
                  <ListItem id={item.id} works={item.works} name={item.name} />
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </Layout.Content>
        <Layout.Footer></Layout.Footer>
      </Layout>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  background: #f5f5f5;

  .browser-layout {
    background: #f5f5f5;
    .ant-layout-header {
      background: ${COLOR.HomeLeft};
      box-shadow: 0 0 6px ${COLOR.HomeLeft};
      display: flex;
      align-items: center;
      position: absolute;
      top: 0;
      height: 64px;
      left: 0;
      right: 0;
      z-index: 2;
      padding-left: 10%;
    }
    .ant-breadcrumb a,
    .ant-breadcrumb span {
      color: #fff;
    }
    .ant-layout-content {
      min-width: 1200px;
      overflow: auto;
      position: absolute;
      padding: 28px 10%;
      top: 64px;
      bottom: 0;
      left: 0;
      right: 0;
      background: #f5f5f5;
      overflow: auto;
    }
  }
`;
