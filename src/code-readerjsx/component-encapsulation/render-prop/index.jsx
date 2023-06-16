import React, { useState } from 'react';

function Mouse({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setPosition({
      x: event.clientX,
      y: event.clientY
    });
  };

  return (
    <div style={{ height: '100vh' }} onMouseMove={handleMouseMove}>
      {render(position)}
    </div>
  );
}

function RenderProp() {
  return (
    <div>
      <h1>Move the mouse around!</h1>
      <Mouse render={(mouse) => (
        <p>The mouse position is ({mouse.x}, {mouse.y})</p>
      )}/>
    </div>
  );
}

export default RenderProp;