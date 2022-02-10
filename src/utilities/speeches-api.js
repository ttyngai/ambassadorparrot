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
