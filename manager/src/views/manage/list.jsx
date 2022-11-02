import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Avatar, Button, Table, Space, Skeleton } from 'antd';
import { Search } from './search';
import { AddBtn } from './add-modal';

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const DataList = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(fakeDataUrl)
      .then(res => res.json())
      .then(res => {
        setInitLoading(false);
        const result = res.results.map(item => {
          return {
            name: item.name.first,
            email: item.email,
            age: Math.floor(Math.random(10) * 10),
            picture: item.picture.large,
          };
        });
        setData(result);
      });
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Picture',
      dataIndex: 'picture',
      key: 'picture',
      render: src => <Avatar src={src} />,
    },
    {
      title: 'Handle',
      dataIndex: 'handle',
      key: 'handle',
      render: () => (
        <Space>
          <Button>{'Detail'}</Button>
          <Button type={'primary'}>{'Edit'}</Button>
          <Button type={'primary'} danger>
            {'Delete'}
          </Button>
        </Space>
      ),
    },
  ];

  const onAddClick = () => {};

  return (
    <Wrapper>
      <SearchWrapper>
        <Search />
        <AddBtn />
      </SearchWrapper>

      <Skeleton avatar title={false} loading={initLoading} active>
        <Table columns={columns} dataSource={data} />
      </Skeleton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 12px;
`;

const SearchWrapper = styled.div`
  margin-bottom: 12px;
  display: flex;
`;

export default DataList;
