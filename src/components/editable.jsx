import React, { useState } from 'react';
import { Table, Input, Button, Space } from 'antd';
import { SaveOutlined, CloseOutlined } from '@ant-design/icons';

const EditableTable = ({ dataSource, columns }) => {
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = (key) => {
    // Add your save logic here
    setEditingKey('');
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Table
      components={{
        body: {
          cell: EditableCell,
        },
      }}
      dataSource={dataSource}
      columns={mergedColumns}
      rowClassName='editable-row'
      pagination={{
        onChange: cancel,
      }}
    />
  );

  function EditableCell({ editing, dataIndex, title, record, ...restProps }) {
    return (
      <td {...restProps}>
        {editing ? (
          <Input
            defaultValue={record[dataIndex]}
            onPressEnter={() => save(record.key)}
          />
        ) : (
          restProps.children
        )}
      </td>
    );
  }
};

export default EditableTable;