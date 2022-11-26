import { useState } from 'react';
import styled from 'styled-components';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Form, Input, message, Switch, Upload, Space, DatePicker } from 'antd';
import { useEffect } from 'react';

const { TextArea } = Input;

export const Add = props => {
  const { form } = props;
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      setLoading(false);
      setImageUrl(info.file.response.data);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

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
          getValueFromEvent={e => {
            if (Array.isArray(e)) {
              return e;
            }
            return e && e.fileList;
          }}
        >
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="/star/upload"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: '100%',
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = file => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 20;
  if (!isLt2M) {
    message.error('Image must smaller than 20MB!');
  }
  return isJpgOrPng && isLt2M;
};
