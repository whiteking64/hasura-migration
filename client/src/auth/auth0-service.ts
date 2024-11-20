import { Auth0Client } from '@auth0/auth0-spa-js';

export const auth0 = new Auth0Client({
  domain: process.env.REACT_APP_AUTH0_DOMAIN!,
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID!,
  authorizationParams: {
    redirect_uri: `${window.location.origin}/callback`,
    audience: 'https://dev-fkpjvdyf2eu6mwhx.us.auth0.com/api/v2/'
  },
  cacheLocation: 'localstorage'
});

export async function loginWithRedirect() {
  await auth0.loginWithRedirect();
}

export async function handleRedirectCallback() {
  await auth0.handleRedirectCallback();
}

export async function logout() {
  await auth0.logout({
    logoutParams: { returnTo: window.location.origin }
  });
}

export async function getUser() {
  return await auth0.getUser();
}

export async function getToken() {
  return await auth0.getTokenSilently();
}
