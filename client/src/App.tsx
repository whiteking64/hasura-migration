import React, { useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apollo-client';
import UserList from './components/UserList';
import { handleRedirectCallback, loginWithRedirect, logout, getUser, auth0 } from './auth/auth0-service';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await handleRedirectCallback();
        const user = await getUser();
        setIsAuthenticated(!!user);
      } catch (error) {
        console.error("Error during authentication:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ApolloProvider client={client}>
      <div>
        <h1>My Hasura-Apollo App</h1>
        {isAuthenticated ? (
          <>
            <button onClick={() => logout()}>Logout</button>
            <UserList />
          </>
        ) : (
          <button onClick={() => loginWithRedirect()}>Login</button>
        )}
      </div>
    </ApolloProvider>
  );
};

export default App;
