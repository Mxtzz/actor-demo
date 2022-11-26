import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
import { useRef } from 'react';

export const Search = props => {
  const [form] = Form.useForm();
  const inputRef = useRef();
  const { onSearch } = props;

  const onSearchClick = () => {
    if (inputRef.current) {
      onSearch(inputRef.current.input.value);
    }
  };

  return (
    <Wrapper>
      <Form
        layout={'inline'}
        form={form}
        initialValues={{
          name: '',
        }}
      >
        <Form.Item name="starName" label="姓名">
          <Input
            ref={inputRef}
            type="text"
            placeholder="请输入..."
            allowClear
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={onSearchClick}>
            {'搜索'}
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
