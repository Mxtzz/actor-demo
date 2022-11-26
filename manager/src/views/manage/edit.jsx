import { useState } from 'react';
import styled from 'styled-components';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  message,
  Switch,
  Upload,
  Col,
  Row,
  Button,
  DatePicker,
  Modal,
} from 'antd';
import { useEffect } from 'react';
import { saveOrUpdate } from '../../api/table';

const { TextArea } = Input;

export const Edit = props => {
  const { show, onClose, onCancel, data } = props;
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    if (data) {
      console.log('展示修改Modal：', data);
      form.setFields([
        {
          name: 'starName',
          value: data.starName,
        },
        {
          name: 'starAge',
          value: data.starAge,
        },
        {
          name: 'starHeight',
          value: data.starHeight,
        },
        {
          name: 'starWeight',
          value: data.starWeight,
        },
        {
          name: 'starNation',
          value: data.starNation,
        },
        {
          name: 'starLanguage',
          value: data.starLanguage,
        },
        {
          name: 'starBriefIntroduction',
          value: data.starBriefIntroduction,
        },
        {
          name: 'starRepresentativeWork',
          value: data.starRepresentativeWork,
        },
      ]);
    }
  }, [form, data]);

  const onFinish = async fields => {
    setConfirmLoading(true);

    try {
      console.log('修改参数：', { ...fields, id: data.id });
      const result = await saveOrUpdate({ ...fields, id: data.id });
      console.log('修改结果：', result);
      onClose();
      setConfirmLoading(false);
      // onReload();
    } catch (err) {
      message.error(err);
    }

    onReset();
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    onReset();
    onClose();
  };

  const onReset = () => {
    form.resetFields();
  };

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
    <Modal
      title="添加新成员"
      open={show}
      maskClosable={false}
      centered={true}
      bodyStyle={{
        maxHeight: '70vh',
        overflowY: 'auto',
      }}
      width={800}
      footer={null}
      onCancel={onCancel}
    >
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
    </Modal>
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
