import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Avatar, Button, Table, Space, Skeleton, message } from 'antd';
import { Search } from './search';
import { AddBtn } from './add-modal';
import { Edit } from './edit';
import { del, getByParam } from '../../api/table';

const DataList = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [param, setParam] = useState({
    starName: '',
    pageNum: 0,
    pageSize: 30,
  });
  const [result, setResult] = useState({});
  const [records, setRecords] = useState([]);
  const [editId, setEditId] = useState();

  useEffect(() => {
    result && setRecords(result.records || []);
    console.log('===result', result);
  }, [result]);

  useEffect(() => {
    getData();
  }, [param]);

  const columns = [
    {
      title: '姓名',
      dataIndex: 'starName',
      key: 'name',
      render: starName => <>{starName}</>,
    },
    {
      title: '年龄',
      dataIndex: 'starAge',
      key: 'age',
    },
    {
      title: '省份',
      dataIndex: 'starNation',
      key: 'email',
    },
    {
      title: '照片',
      dataIndex: 'starImg',
      key: 'picture',
      render: src => <Avatar src={src} />,
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'handle',
      render: id => (
        <Space>
          <Button>{'Detail'}</Button>
          <Button type={'primary'} onClick={() => setEditId(id)}>
            {'Edit'}
          </Button>
          <Button type={'primary'} danger onClick={() => onDelClick(id)}>
            {'Delete'}
          </Button>
        </Space>
      ),
    },
  ];

  const getData = async () => {
    setInitLoading(true);
    try {
      const result = await getByParam(param);
      if (result && result.code === 200) {
        setResult(result.data);
      }
      setInitLoading(false);
    } catch (err) {
      message.error(err);
      setInitLoading(false);
    }
  };

  const onDelClick = id => {
    id && del(id);
    console.log('===del', id);
    onReload();
  };

  const onChange = data => {
    console.log('===onhange', data);
  };

  const onSearch = value => {
    if (value) {
      console.log('===search', value);
      setRecords([]);
      setParam({
        starName: value,
        pageNum: 0,
        pageSize: 30,
      });
    } else {
      message.warning('请输入姓名搜索！');
    }
  };

  const onReload = () => {
    console.log('onReload');
    setRecords([]);
    setParam({
      starName: '',
      pageNum: 0,
      pageSize: 30,
    });
  };

  const pagination = {
    // current: result.current,
    pageSize: result.size,
    total: result.total,
  };

  return (
    <Wrapper>
      <SearchWrapper>
        <Search onSearch={onSearch} />
        <AddBtn onReload={onReload} />
      </SearchWrapper>

      <Skeleton avatar title={false} loading={initLoading} active>
        <Table
          columns={columns}
          dataSource={records.map(r => {
            r.key = r.id;
            return r;
          })}
          pagination={pagination}
          onChange={onChange}
        />
      </Skeleton>

      <Edit
        show={!!editId}
        data={records.find(r => r.id === editId)}
        onClose={() => {
          setEditId();
          onReload();
        }}
      />
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
