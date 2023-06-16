import React from 'react';
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useQuery, useMutation } from 'react-query'



/*这个组件很有意思*/
function CreateUserForm() {
  const [products, setProducts] = useState([
    { name: 'aaa', type: 'a01' },
    { name: 'bbb', type: 'b01' },
    { name: 'ccc', type: 'c01' }
  ]);

  const handleInputChange = (index, e) => {
    //index是从map中传过来的，e是事件对象
    console.log(index,'index是从map中传过来的,e是事件对象')
    const { name, value } = e.target;
    console.log(name,'name是input的name属性，value是input的value属性')
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index] = { ...updatedProducts[index], [name]: value };
      console.log(updatedProducts)
      return updatedProducts;
    });
  };

  const inputStyle = {
    borderRadius: '5px',
  };
  return (
    <div>
      {products.map((product, index) => (
        <div key={index}>
          姓名
          <input
            type="text"
            name="name"
            style={inputStyle}
          value={product.name}
          onChange={(e) => handleInputChange(index, e)}
          />&nbsp;&nbsp;&nbsp;&nbsp;
          型号：
          <input
            type="text"
            name="type"
            style={inputStyle}
            value={product.type}
            onChange={(e) => handleInputChange(index, e)}
          />
        </div>
      ))}
    </div>
  );
}

export default CreateUserForm