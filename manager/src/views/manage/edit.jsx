import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import moment from 'moment';
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
} from 'antd';
import { saveOrUpdate, selectDetail } from '../../api/table';
import { Exp } from './exp';
import { UploadImg } from './upload';

const { TextArea } = Input;

export const Edit = props => {
  const { id, onClose, onCancel } = props;
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [detail, setDetail] = useState();

  const lastId = useRef();

  useEffect(() => {
    if (lastId.current === id) {
      return;
    }
    lastId.current = id;
    if (!id) {
      setDetail();
      return;
    }
    (async () => {
      try {
        const result = await selectDetail(id);
        if (result && result.data) {
          setDetail(result.data);
        }
      } catch (err) {
        message.error('获取Detail失败');
      }
    })();
    setDetail();
  }, [id]);

  useEffect(() => {
    if (detail) {
      console.log('展示修改Modal：', detail);
      form.setFields([
        {
          name: 'starName',
          value: detail.starName,
        },
        {
          name: 'starAge',
          value: detail.starAge,
        },
        {
          name: 'starHeight',
          value: detail.starHeight,
        },
        {
          name: 'starWeight',
          value: detail.starWeight,
        },
        {
          name: 'starNation',
          value: detail.starNation,
        },
        {
          name: 'starLanguage',
          value: detail.starLanguage,
        },
        {
          name: 'starBriefIntroduction',
          value: detail.starBriefIntroduction,
        },
      ]);
    }
  }, [form, detail]);

  const onFinish = async fields => {
    setConfirmLoading(true);
    try {
      console.log('修改参数：', { ...fields, id: detail.id });
      const result = await saveOrUpdate({ ...fields, id: detail.id });
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

  const experience = (detail?.experience || []).map((item, i) => {
    return {
      ...item,
      key: item.title + i,
    };
  });

  return (
    <Modal
      title="编辑"
      open={!!id}
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
            <Col span={8}>
              <Form.Item
                name="starName"
                label="姓名"
                // rules={[{ required: true, message: `'姓名'为必填项` }]}
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
                <>
                  <DatePicker
                    placeholder="请选择日期"
                    defaultValue={moment(detail?.starDate)}
                    onChange={v =>
                      form.setFieldValue('starDate', v.format('YYYY-MM-DD'))
                    }
                  />
                </>
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
                  img={detail?.starHead}
                  getImgSrc={v => {
                    form.setFieldValue('starHead', v);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="starMasterImg" label="C位">
                <UploadImg
                  img={detail?.starMasterImg}
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
                exp={experience}
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
