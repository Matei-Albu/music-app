import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const Authentication = ({ children }) => {
  return (
    <div
      style={{
        paddingTop: '2em',
        background: "linear-gradient(135deg,rgb(190, 91, 91) 0%, #764ba2 100%)",
        minHeight: '93vh',
      }}
    >
      <Authenticator>
        {({ signOut, user }) => (
          <div>
            {children({ user, signOut })}
            <button onClick={signOut} style={{ marginTop: '1em' }}>
              Sign Out
            </button>
          </div>
        )}
      </Authenticator>
    </div>
  );
};

export default Authentication;
