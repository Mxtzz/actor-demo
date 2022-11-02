import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';

export const Search = () => {
  const [form] = Form.useForm();

  const onFormChange = ({ name }) => {
    console.log('search name', name);
  };

  return (
    <Wrapper>
      <Form
        layout={'inline'}
        form={form}
        initialValues={{
          name: 'search name',
        }}
        onValuesChange={onFormChange}
      >
        <Form.Item label="Name">
          <Input type="text" placeholder="search name" allowClear />
        </Form.Item>
        {/* <Form.Item label="Field B">
          <Input placeholder="input placeholder" />
        </Form.Item> */}
        <Form.Item>
          <Button type="primary">{'Search'}</Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
