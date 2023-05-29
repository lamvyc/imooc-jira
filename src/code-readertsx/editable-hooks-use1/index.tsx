import { useDocumentTitle } from "utils";
import React, { useState, useReducer } from 'react';
import { Editable } from 'am-editable';
import { Input, Button, InputNumber, Space } from 'antd';


const EditableUseExample = () => {
  useDocumentTitle("可编辑表格使用");

  const [canSort, setCanSort] = useState(true);
  const [hideAddBtn, toogleHideAddBtn] = useReducer(state => {
    return !state;
  }, false);
  return (
    <Space direction="vertical" style={{ display: 'flex' }}>
      <Space>
        <Button onClick={() => setCanSort(!canSort)}>
          {canSort ? '关闭排序' : '开启排序'}
        </Button>
        <Button onClick={toogleHideAddBtn}>
          {hideAddBtn ? '显示新增按钮' : '隐藏新增按钮'}
        </Button>
      </Space>
      <Editable
        sortMode={canSort && 'popover'}
        defaultData={{ age: 90 }}
        fields={fields}
        multiple={false}
        hideAddBtn={hideAddBtn}
        max={10}
        defaultValue={[{ name: '小明', age: 18, height: 175, address: '杭州' }]}
        onChange={val => {
          console.log(val);
        }}
      />
    </Space>
  );
};

export default EditableUseExample




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

