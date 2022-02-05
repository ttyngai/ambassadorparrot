import { getToken } from './users-service';
const BASE_URL = '/api/users';
const BASE_URL_LOGIN = '/api/users/login';

// export async function signUp(userData) {
//   const res = await fetch(BASE_URL, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(userData),
//   });
//   // check if the request was successful
//   if (res.ok) {
//     return res.json();
//   } else {
//     throw new Error('Invalid Sign Up');
//   }
// }

export async function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

export async function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

// export function checkToken() {
//   return sendRequest(`${BASE_URL}/check-token`);
// }

// Helper Functions
async function sendRequest(url, method = 'GET', payload = null) {
  const options = { method };
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }
  const token = getToken();
  if (token) {
    options.headers = options.headers || {};
    options.headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(url, options);
  if (res.ok) return res.json();
  throw new Error('Bad Request');
}

function getVoice() {
  const voice = 1;
  // then fetch using voice variable
}

// two props, on mousedown, start eventlistener(startresognition), on mouse up stop recognition
// ontouchstart, on onTouchend

//CODE TO START
// var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
// var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
// var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

// var recognition = new SpeechRecognition();
// var speechRecognitionList = new SpeechGrammarList();
// recognition.grammars = speechRecognitionList;
// recognition.lang = 'en-GB';
// recognition.interimResults = false;
// recognition.maxAlternatives = 1;

//important

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new window.SpeechRecognition({ profanityFilter: false });
// let p = document.createElement('p');
recognition.addEventListener('result', (e) => {
  console.log(e.results[0][0].transcript);

  speak(e.results[0][0].transcript);
});
recognition.lang = 'zh-yue';

function speak(message) {
  var msg = new SpeechSynthesisUtterance(message);
  var voices = window.speechSynthesis.getVoices();
  msg.voice = voices[22];
  window.speechSynthesis.speak(msg);
}
