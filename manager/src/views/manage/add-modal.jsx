import { Button, Modal } from 'antd';
import { useState } from 'react';
import { Add } from './add';

export const AddBtn = ({ onReload }) => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
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
        width={800}
        footer={null}
        onCancel={onClose}
      >
        <Add onClose={onClose} onReload={onReload} />
      </Modal>
    </>
  );
};
