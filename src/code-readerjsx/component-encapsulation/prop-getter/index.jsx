import React from 'react';

function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

function Link({ href, children }) {
  return <a href={href}>{children}</a>;
}

function Dialog({ title, message, renderFooter }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{message}</p>
      <div className="footer">{renderFooter()}</div>
    </div>
  );
}

function PropGetter() {
  const handleButtonClick = () => {
    alert('Button clicked');
  };

  const handleLinkClick = () => {
    alert('Link clicked');
  };

  const renderFooter = (getButtonProps, getLinkProps) => {
    return (
      <>
        <Button {...getButtonProps()}>Ok</Button>
        <Link {...getLinkProps()}>Cancel</Link>
      </>
    );
  };

  return (
    <Dialog
      title="Hello, world"
      message="This is a dialog"
      renderFooter={() =>
        renderFooter(
          () => ({ onClick: handleButtonClick }),
          () => ({ href: '#', onClick: handleLinkClick })
        )
      }
    />
  );
}

export default PropGetter;