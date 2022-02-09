import sendRequest from './send-request';

const BASE_URL = '/api/speeches';

export function create(speech) {
  console.log('speech came here', speech);
  return sendRequest(`${BASE_URL}/new`, 'POST', speech);
}
