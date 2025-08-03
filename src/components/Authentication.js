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
            <button 
                onClick={signOut} 
                style={{
                    marginTop: "1em",
                    padding: "12px 24px",
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    borderRadius: "12px",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                    marginBottom: "1em",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 0.25)"
                    e.target.style.transform = "translateY(-2px)"
                    e.target.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.15)"
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 0.15)"
                    e.target.style.transform = "translateY(0)"
                    e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)"
                  }}
            
            >
              Sign Out
            </button>
          </div>
        )}
      </Authenticator>
    </div>
  );
};

export default Authentication;
