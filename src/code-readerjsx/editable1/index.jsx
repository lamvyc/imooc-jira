import React from 'react';
import EditableTable from 'components/editable';
import 'antd/dist/antd.css';
import { Space } from 'antd';

const dataSource = [
  {
    key: '0',
    name: 'Jack',
    age: 28,
    address: '123 Fake St',
  },
  {
    key: '1',
    name: 'Jill',
    age: 32,
    address: '456 Fake St',
  },
  {
    key: '2',
    name: 'Jill',
    age: 32,
    address: '456 Fake St',
  },
  {
    key: '3',
    name: 'Jill',
    age: 32,
    address: '456 Fake St',
  },
  {
    key: '4',
    name: 'Jill',
    age: 32,
    address: '456 Fake St',
  },
  {
    key: '5',
    name: 'Jill',
    age: 32,
    address: '456 Fake St',
  },
  {
    key: '6',
    name: 'Jill',
    age: 32,
    address: '456 Fake St',
  },
  {
    key: '7',
    name: 'Jill',
    age: 32,
    address: '456 Fake St',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: '25%',
    editable: true,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: '15%',
    editable: true,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: '40%',
    editable: true,
  },
  {
    title: 'Operation',
    dataIndex: 'operation',
    render: (_, record) => {
      return (
        <Space size='middle'>
          {/* <a onClick={() => edit(record)}>Edit</a>
          <a onClick={() => save(record.key)}>Save</a>
          <a onClick={() => cancel(record.key)}>Cancel</a> */}
        </Space>
      );
    },
  },
];

function App() {
  return (
    <div className='App'>
      <EditableTable dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default App;