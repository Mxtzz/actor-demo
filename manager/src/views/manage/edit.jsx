import { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Form,
  Input,
  message,
  Switch,
  Col,
  Row,
  Button,
  DatePicker,
  Modal,
  Typography,
} from 'antd';
import { saveOrUpdate } from '../../api/table';
import { Exp } from './exp';
import { UploadImg } from './upload';

const { TextArea } = Input;
const { Paragraph } = Typography;

export const Edit = props => {
  const { show, onClose, onCancel, data } = props;
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

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

  const onReset = () => {
    form.resetFields();
  };

  const experience = (data?.experience || []).map((item, i) => {
    return {
      ...item,
      key: item.title + i,
    };
  });

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
              <Form.Item name="starDate" label="生日">
                <DatePicker placeholder="请选择日期" />
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
                <TextArea rows={4} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="starMasterImg" label="C位照片">
                <UploadImg
                  getImgSrc={v => {
                    form.setFieldValue('starMasterImg', v);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={2}>
              <Form.Item name="experience" label="">
                <Paragraph>{'经历：'}</Paragraph>
              </Form.Item>
            </Col>
            <Col span={22}>
              <Exp
                exp={experience}
                getExp={v => {
                  const exp = v.map(item => {
                    return { title: item.title, url: item.url, src: item.src };
                  });
                  form.setFieldValue('experience', exp);
                }}
              />
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
