/**
 * title: 表单验证
 * desc:
 *  1、可以通过配置`formItemProps.rules`属性，来设置对某一项表单配置验证，<br />
 *  2、rules 配置规则和antd框架里的[Form配置规则](https://ant.design/components/form-cn/#Rule)相同 <br />
 *  3、单行编辑模式在保存的时候会进行校验，校验失败无法保存 <br />
 *  4、多行编辑模式默认会在值改变的时候进行校验，但可以通过`handleValidate`方法主动校验所有表单项 <br />
 *
 */

import React, { useState, useReducer, useRef } from 'react';
import { Editable } from 'am-editable';
import { Input, Button, InputNumber, Space, message } from 'antd';

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
                formItemProps: {
                    rules: [
                        { required: true, message: '请输入姓名' },
                        { max: 60, type: 'number', message: '只能输入六十岁以下的年龄' },
                        { min: 10, type: 'number', message: '年龄只能在十岁及以上' },
                    ],
                },
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

const EditableUseExample = () => {
    const actionRef = useRef();
    const [canSort, setCanSort] = useState(true);
    const [multiple, setMultiple] = useState(true);
    const [hideAddBtn, toogleHideAddBtn] = useReducer(state => {
        return !state;
    }, false);
    return (
        <Space direction="vertical" style={{ display: 'flex' }}>
            <Space>
                <Button onClick={() => setMultiple(!multiple)}>切换编辑模式</Button>
                <Button onClick={() => setCanSort(!canSort)}>
                    {canSort ? '关闭排序' : '开启排序'}
                </Button>
                <Button onClick={toogleHideAddBtn}>
                    {hideAddBtn ? '显示新增按钮' : '隐藏新增按钮'}
                </Button>
                <Button
                    type="primary"
                    onClick={() => {
                        actionRef.current
                            .handleValidate()
                            .then(() => {
                                message.success('保存成功');
                            })
                            .catch(err => {
                                message.error('数据有误请检查');
                                console.log(err);
                            });
                    }}
                >
                    提交
                </Button>
            </Space>
            <Editable
                sortMode={canSort && 'popover'}
                defaultData={{ age: 90 }}
                key={multiple ? 1 : 2}
                fields={fields}
                multiple={multiple}
                hideAddBtn={hideAddBtn}
                getActionRef={ref => (actionRef.current = ref.current)}
                max={10}
                defaultValue={[
                    { name: '小明', age: 18, height: 175, address: '杭州' },
                    { age: 90 },
                ]}
                onChange={val => {
                    console.log(val);
                }}
            />
        </Space>
    );
};
export default EditableUseExample
