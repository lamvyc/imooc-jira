import React from 'react';
import { Editable } from 'am-editable';
import { Input, Button, InputNumber, message } from 'antd';

const fields = [
    {
        title: '姓名',
        id: 'name',
        width: '30%',
        editable: true,
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
    },
];

const EditableUseExample = () => {
    return (
        <div>
            <Editable
                defaultData={{ age: 90 }}
                fields={fields}
                multiple={false}
                max={3}
                optionExtraBefore={
                    <Button
                        size="small"
                        onClick={() => {
                            message.info('点击了预览');
                        }}
                    >
                        预览
                    </Button>
                }
                optionExtraAfter={
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => {
                            message.info('点击了修改');
                        }}
                    >
                        修改
                    </Button>
                }
                onChange={val => {
                    console.log(val);
                }}
            />
        </div>
    );
};

export default EditableUseExample
