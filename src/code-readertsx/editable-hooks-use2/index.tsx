import React from 'react';
import { Editable } from 'am-editable';
import { Input, Button, InputNumber } from 'antd';

const fields = [
  {
    title: '姓名',
    id: 'name',
    width: '30%',
    editable: true,
    formItemProps: {
      rules: [{ required: true, message: '请输入姓名' }],
    },
  },
  {
    title: '简介',
    id: 'info',
    children: [
      {
        title: '年龄',
        id: 'age',
        editable: true,
        renderFormInput: () => {
          return <InputNumber />;
        },
      },
      {
        title: '身高',
        id: 'height',
        editable: true,
        renderFormInput: () => {
            return <InputNumber />;
          },
      },
    ],
  },
  {
    title: '地址',
    id: 'address',
    editable: true,
    renderFormInput: () => {
      return <Input />;
    },
    trigger: 'onBlur',
  },
];

const EditableUseExample = () => {
  return (
    <div>
      <Editable
        defaultData={{ age: 90 }}
        fields={fields}
        onChange={val => {
          console.log(val);
        }}
      />
    </div>
  );
};

export default EditableUseExample
