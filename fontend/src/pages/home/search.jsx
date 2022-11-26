import { Input } from 'antd';
import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';

export const SearchInput = props => {
  // const navigate = useNavigate();
  // const onSearch = v => {
  //   if (v) {
  //     navigate('/browser?name=' + v);
  //   }
  // };
  return (
    <Wrapper>
      <Input.Search
        placeholder="搜索"
        bordered={false}
        onSearch={props.onSearch}
        style={{
          width: 200,
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .ant-input-wrapper {
    /* border-bottom: 2px solid #eee; */
    background: #333!important;
    border-radius: 20px;
  }
  .ant-input {
    background: rgba(0, 0, 0, 0);
    color: #fff;
    padding: 4px 16px;
    &::placeholder {
      color: #aaa!important;
    }
  }
  .ant-input-group-addon {
    border: none;
    background: rgba(0, 0, 0, 0);
  }
  button {
    border: none;
    background: rgba(0, 0, 0, 0);
    &:hover, &:focus {
      background: rgba(0, 0, 0, 0);
    }
    &:active {
      background: rgba(0, 0, 0, 0);
    }
  }
  .anticon-search {
    color: #eee;
  }
`;
