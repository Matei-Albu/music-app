import React from 'react';

const Authentication = ({ children, onSignOut }) => {
  return (
    <div>
      <h1>Music app content</h1>
      {children}
      <button onClick={onSignOut}>Sign Out</button>
    </div>
  );
};

export default Authentication;