import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const Authentication = ({ children }) => {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div>
          <h1>Welcome, {user?.username || 'User'}!</h1>
          {children}
          <button onClick={signOut}>Sign Out</button>
        </div>
      )}
    </Authenticator>
  );
};

export default Authentication;
