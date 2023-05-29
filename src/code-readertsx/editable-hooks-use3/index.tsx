import React from 'react';
import { Editable } from 'am-editable';
import { Input, Button, InputNumber } from 'antd';

const fields = [
  {
    title: '姓名',
    width: '30%',
    id: 'name',
    editable: true,
    children: [
      {
        title: '姓氏',
        id: 'firstName',
        editable: true,
        renderFormInput: (record:any, { value, onChange }:{ value: any, onChange: Function }, form:any) => {
          return (
            <Input
              value={value}
              maxLength={3}
              onChange={val => {
                if (onChange) onChange(val);
                form.setFieldsValue({
                  allName: `${val?.target?.value}-${record?.lastName || ''}`,
                });
              }}
            />
          );
        },
      },
      {
        title: '名字',
        id: 'lastName',
        editable: true,
        renderFormInput: (record, { value, onChange }, form) => {
          return (
            <Input
              value={value}
              onChange={val => {
                if (onChange) onChange(val);
                form.setFieldsValue({
                  allName: `${record?.firstName || ''}-${val?.target?.value}`,
                });
              }}
            />
          );
        },
      },
      {
        title: '全名',
        id: 'allName',
        column: {
          render: (text:string) => {
            return <div style={{ width: 120 }}>{text}</div>;
          },
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
