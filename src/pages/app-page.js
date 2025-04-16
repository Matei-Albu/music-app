import { Authenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';

const AppPage = () => {
    return (
      <Authenticator>
        {({signOut }) => (
          <dif>
            <h1>Music app content</h1>
            <button onClick={signOut}>Sign Out</button>
          </dif>
        )}
      </Authenticator>
    );
  };
  
  export default AppPage;
  