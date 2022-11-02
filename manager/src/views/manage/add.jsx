import { useState } from 'react';
import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Select, Switch, Upload, Space } from 'antd';

const { TextArea } = Input;

export const Add = () => {
  const onFormChange = data => {
    console.log('add data', data);
  };

  return (
    <Wrapper>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        onValuesChange={onFormChange}
        disabled={false}
      >
        <Space>
          <Form.Item label="Name">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Age">
            <Input type="number" />
          </Form.Item>
        </Space>
        <Form.Item label="Select">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="TextArea">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Switch" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList">
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
