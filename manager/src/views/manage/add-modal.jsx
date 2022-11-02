import { Button, Modal } from 'antd';
import { useState } from 'react';
import { Add } from './add';

export const AddBtn = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {'Add'}
      </Button>
      <Modal
        title="Add new item"
        open={open}
        maskClosable={false}
        centered={true}
        bodyStyle={{
          maxHeight: '70vh',
          overflowY: 'auto',
        }}
        onOk={handleOk}
        okText={'Submit'}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Add />
      </Modal>
    </>
  );
};
