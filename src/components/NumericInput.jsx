import React, { useState, useLayoutEffect } from 'react';
import { Input } from 'antd';

const NumericInput = (props) => {
  const { value, onChange, ...restProps } = props;
  const [inputValue, setInputValue] = useState(value);

  // 处理用户输入的值，保证输入值为正整数
  const handleInputChange = (e) => {
    const reg = /^[1-9]\d*$/;
    if (reg.test(e.target.value) || e.target.value === '') {
      setInputValue(e.target.value);
      onChange && onChange(e);
    }
  };

  //
  useLayoutEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <Input
      {...restProps}
      value={inputValue}
      onChange={handleInputChange}
    />
  );
};

export default NumericInput;
