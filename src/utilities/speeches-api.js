import sendRequest from './send-request';

const BASE_URL = '/api/speeches';

export function create(speech) {
  return sendRequest(`${BASE_URL}/new`, 'POST', speech);
}
export function star(speech) {
  return sendRequest(`${BASE_URL}/star`, 'PUT', speech);
}

export function getSpeech() {
  return sendRequest(`${BASE_URL}/getSpeeches`);
}
export function deleteSpeech(speech) {
  return sendRequest(`${BASE_URL}/deleteSpeech`, 'DELETE', speech);
}
export function clearList() {
  return sendRequest(`${BASE_URL}/clearSpeeches`, 'PUT');
}
export function deleteFav(userId) {
  console.log('in util', userId);
  return sendRequest(`${BASE_URL}/deleteFav/${userId}`, 'DELETE');
}
