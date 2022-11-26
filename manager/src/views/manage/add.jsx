import { useState } from 'react';
import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Select, Switch, Upload, Space, DatePicker } from 'antd';
import { useEffect } from 'react';

const { TextArea } = Input;

export const Add = props => {
  const { form } = props;
  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    return () => {
      onReset();
    };
  }, []);

  return (
    <Wrapper>
      <Form
        form={form}
        labelCol={{
          span: 2,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        disabled={false}
      >
        <Form.Item name="starName" label="姓名">
          <Input type="text" />
        </Form.Item>
        <Form.Item name="starAge" label="年龄">
          <Input type="number" />
        </Form.Item>
        <Form.Item name="starHeight" label="身高">
          <Input type="number" />
        </Form.Item>
        <Form.Item name="starWeight" label="体重">
          <Input type="number" />
        </Form.Item>
        <Form.Item name="starNation" label="民族">
          <Input type="text" />
        </Form.Item>
        <Form.Item name="starLanguage" label="语言">
          <Input type="text" />
        </Form.Item>
        <Form.Item name="starDate" label="生日">
          <DatePicker />
        </Form.Item>
        <Form.Item name="certify" label="已认证" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item name="starBriefIntroduction" label="简介">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item name="starRepresentativeWork" label="代表作">
          <TextArea rows={2} />
        </Form.Item>
        <Form.Item
          name="starMasterImg"
          label="C位照片"
          valuePropName="fileList"
        >
          <Upload action="/star/upload" listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                上传
              </div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
