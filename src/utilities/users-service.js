import * as usersAPI from './users-api';

export async function signUp(userData) {
  try {
    const token = await usersAPI.signUp(userData);
    // save token to localStorage
    localStorage.setItem('token', token);
    return getUser();
  } catch {}
}

export function logOut() {
  localStorage.removeItem('token');
}

export async function login(credentials) {
  const token = await usersAPI.login(credentials);
  localStorage.setItem('token', token);
  return getUser();
}

export function getToken() {
  // getItem returns null if nothing is found
  const token = localStorage.getItem('token');
  // If there is not a token, return null
  if (!token) return null;
  const payload = JSON.parse(atob(token.split('.')[1]));
  if (payload.exp < Date.now() / 1000) {
    // if above is true, token is expired
    localStorage.removeItem('token');
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  // If theres a token return user obj from payload
  // Otherwise return null
  return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

// export async function checkToken() {
//   const dateStr = await usersAPI.checkToken();
//   return new Date(dateStr);
// }

// button onclick fuinction CompositionEvent
// promise resolved into object





