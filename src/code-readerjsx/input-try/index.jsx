import React, { useState } from 'react';
import NumericInput from 'components/NumericInput';

const InputTry = () => {
  const [value, setValue] = useState('');

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <NumericInput value={value} onChange={handleInputChange} />
    </div>
  );
};

export default InputTry;
