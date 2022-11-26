import { useState } from 'react';
import styled from 'styled-components';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  message,
  Switch,
  Upload,
  DatePicker,
  Col,
  Row,
  Button,
} from 'antd';
import { saveOrUpdate } from '../../api/table';

const { TextArea } = Input;

export const Add = props => {
  const [form] = Form.useForm();
  const { onClose, onReload } = props;
  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

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

  const onFinish = async fields => {
    setConfirmLoading(true);
    try {
      console.log('添加新Item参数：', fields);
      const result = await saveOrUpdate(fields);
      console.log('添加新Item结果: ', result);
      onClose();
      setConfirmLoading(false);
      onReload();
    } catch (err) {
      message.error(err);
    }

    form.resetFields();
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
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        disabled={false}
        onFinish={onFinish}
      >
        <Row>
          <Col span={12}>
            <Form.Item
              name="starName"
              label="姓名"
              rules={[{ required: true, message: `'姓名'为必填项` }]}
            >
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="starAge" label="年龄">
              <Input type="number" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item name="starHeight" label="身高">
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="starWeight" label="体重">
              <Input type="number" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item name="starNation" label="民族">
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="starLanguage" label="语言">
              <Input type="text" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item name="starHobby" label="爱好">
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="starRepresentativeWork" label="代表作">
              <Input type="text" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item name="starDate" label="生日">
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="certify" label="已认证" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="starBriefIntroduction" label="简介">
          <TextArea rows={3} />
        </Form.Item>

        <Form.Item name="experience" label="经历">
          <TextArea rows={2} />
        </Form.Item>

        <Form.Item name="cooperation" label="合作信息">
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
        <Footer>
          <Button htmlType="submit" className="add-cancel" onClick={onClose}>
            取消
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="add-submit"
            loading={confirmLoading}
          >
            确认
          </Button>
        </Footer>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const Footer = styled.div`
  .add-cancel {
    position: absolute;
    bottom: 10px;
    right: 116px;
  }
  .add-submit {
    position: absolute;
    bottom: 10px;
    right: 26px;
  }
`;

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
