import { useState } from 'react';
import styled from 'styled-components';
import { UploadOutlined } from '@ant-design/icons';
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
  Image,
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
    if (info.file.status === 'done' && info.file.response?.data) {
      setLoading(false);
      setImageUrl(info.file.response.data);
      form.setFieldValue('starMasterImg', info.file.response.data);
    }
  };

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
                <Input type="text" autoFocus={true} />
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

          <Row>
            <Col span={12}>
              <Form.Item name="starBriefIntroduction" label="简介">
                <TextArea rows={3} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="experience" label="经历">
                <TextArea rows={3} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item name="cooperation" label="合作信息">
                <TextArea rows={2} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item name="starMasterImg" label="C位照片">
                <>
                  <Image
                    // width={100}
                    height={100}
                    src={imageUrl}
                    fallback="data:image/png;base64,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"
                  />
                  <Upload
                    name="file"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="/star/upload"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    <Button icon={<UploadOutlined />}>上传图片</Button>
                  </Upload>
                </>
              </Form.Item>
            </Col>
            <Col span={12}></Col>
          </Row>

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
