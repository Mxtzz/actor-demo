import { useState } from 'react';
import styled from 'styled-components';
import {
  Form,
  Input,
  message,
  Switch,
  DatePicker,
  Col,
  Row,
  Button,
} from 'antd';
import { saveOrUpdate } from '../../api/table';
import { Exp } from './exp';
import { UploadImg } from './upload';

const { TextArea } = Input;

export const Add = props => {
  const [form] = Form.useForm();
  const { onClose, onReload } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onFinish = async fields => {
    setConfirmLoading(true);
    fields.starDate = fields.starDate?.format('YYYY-MM-DD');
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
          <Col span={8}>
            <Form.Item
              name="starName"
              label="姓名"
              rules={[{ required: true, message: `'姓名'为必填项` }]}
            >
              <Input type="text" autoFocus={true} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="starAge" label="年龄">
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="starHeight" label="身高">
              <Input type="number" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <Form.Item name="starWeight" label="体重">
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="starNation" label="民族">
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="starLanguage" label="语言">
              <Input type="text" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <Form.Item name="starDate" label="生日">
              <DatePicker placeholder="请选择日期" />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item name="certify" label="已认证" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <Form.Item name="starBriefIntroduction" label="简介">
              <TextArea rows={4} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="starHead" label="头像">
              <UploadImg
                getImgSrc={v => {
                  form.setFieldValue('starHead', v);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="starMasterImg" label="照片">
              <UploadImg
                getImgSrc={v => {
                  form.setFieldValue('starMasterImg', v);
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item name="experience" label="" style={{ display: 'none' }}>
              <></>
            </Form.Item>
            <Exp
              exp={[]}
              getExp={v => {
                const exp = v.map(item => {
                  return {
                    title: item.title,
                    url: item.url,
                    img: item.src,
                  };
                });
                form.setFieldValue('experience', exp);
              }}
            />
          </Col>
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
