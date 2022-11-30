import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
import { UploadImg } from './upload';
const EditableContext = React.createContext(null);
const EditableRow = ({ ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

export const Exp = ({ exp, getExp = () => {} }) => {
  exp.forEach((e, i) => (e.key = i));
  const [dataSource, setDataSource] = useState(exp || []);

  useEffect(() => {
    getExp(dataSource);
  }, [dataSource]);

  const [count, setCount] = useState(0);

  const handleDelete = key => {
    const newData = dataSource.filter(item => item.key !== key);
    setDataSource(newData);
  };
  const defaultColumns = [
    {
      title: '标题',
      dataIndex: 'title',
      width: '30%',
      editable: true,
    },
    {
      title: '链接',
      dataIndex: 'url',
      editable: true,
    },
    {
      title: '图片',
      dataIndex: 'img',
      render: (_, record) => (
        <UploadImg
          img={record.img}
          getImgSrc={v => {
            setDataSource(d => {
              const select = d.find(x => x.key === record.key);
              if (select) select.src = v;
              return [...d];
            });
          }}
        />
      ),
    },
    {
      title: '',
      dataIndex: 'del',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="确认删除?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>删除</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const handleAdd = () => {
    const newData = {
      key: count,
      title: `点击修改标题`,
      url: '点击修改链接',
      img: '',
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  const handleSave = row => {
    const newData = [...dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  return (
    <div>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        添加作品
      </Button>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};
