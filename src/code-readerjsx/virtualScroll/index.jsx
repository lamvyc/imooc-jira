import React from 'react';
import VirtualScroll from 'components/virtualScroll';

function VirtualSEx() {
  const data = Array.from({ length: 10000 }, (_, index) => `Item ${index}`);

  return (
    <div>
      <h1>Virtual Scroll Example</h1>
      <VirtualScroll data={data} itemHeight={30} visibleItemCount={10} />
    </div>
  );
}

export default VirtualSEx;
