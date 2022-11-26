import { Button, Modal, Form, message } from 'antd';
import { useState } from 'react';
import { Add } from './add';
import { saveOrUpdate } from '../../api/table';

export const AddBtn = () => {
  const [form] = Form.useForm();

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    const fields = form.getFieldsValue();
    console.log('===add', fields);
    setConfirmLoading(true);

    try {
      const result = await saveOrUpdate(fields);
      setOpen(false);
      setConfirmLoading(false);
    } catch (err) {
      message.error(err);
    }

    onReset();
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
    onReset();
  };

  const onReset = () => {
    form.resetFields();
    console.log('===reset');
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {'添加'}
      </Button>
      <Modal
        title="添加新成员"
        open={open}
        maskClosable={false}
        centered={true}
        bodyStyle={{
          maxHeight: '70vh',
          overflowY: 'auto',
        }}
        onOk={handleOk}
        okText={'提交'}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={800}
      >
        <Add form={form} />
      </Modal>
    </>
  );
};
