import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { auth0 } from './auth/auth0-service';

const httpLink = createHttpLink({
  uri: 'http://localhost:8080/v1/graphql',  // Your Hasura GraphQL endpoint
});

const authLink = setContext(async (_, { headers }) => {
  const token = await auth0.getTokenSilently();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;
