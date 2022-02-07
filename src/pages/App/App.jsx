// import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { getUser } from '../../utilities/users-service';

import translate from '../../utilities/translate';
import { Routes, Route } from 'react-router-dom';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import AuthPage from '../AuthPage/AuthPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import NavBar from '../../components/NavBar/NavBar';
import SpeechContainer from '../../components/SpeechContainer/SpeechContainer';

// import { Translate } from '@google-cloud/translate';

// const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

function App() {
  // const [user, setUser] = useState(getUser());
  const [user, setUser] = useState(getUser());
  const [speech, setSpeech] = useState([]);
  let recognition;
  let result;

  async function initSpeech() {
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new window.SpeechRecognition({});
    // let p = document.createElement('p');

    recognition.lang = 'en';
    recognition.interimResults = true;
    recognition.continuous = true;
    console.log(recognition);
  }
  initSpeech();

  function handleStart() {
    setSpeech(speech);
    recognition.addEventListener('result', async (e) => {
      console.log('results; ', e.results);
      console.log('latest: ', e.results[e.results.length - 1][0].transcript);
      console.log('the speech', speech);
      setSpeech([...speech, concatSpeech(e.results)]);
    });
    recognition.start();
  }
  function handleStop() {
    recognition.removeEventListener('result', initSpeech());
    recognition.abort();
    recognition.stop();
    console.log('stoppedit');
    console.log('recognition');
    console.log('speech', speech);
    translate(speech, 'zh-HK');
  }
  function concatSpeech(results) {
    let concat = '';
    console.log('at concat', results);
    for (let i = 0; i < results.length; i++) {
      concat += results[i][0].transcript;
    }

    return concat;
  }
  // const voiceIndex = {
  //   'en-US': 0,
  //   'de-DE': 5,
  //   'en-GB': 8,
  //   'es-ES': 9,
  //   'fr-FR': 11,
  //   'hi-IN': 12,
  //   'id-ID': 13,
  //   'it-IT': 14,
  //   'ja-JP': 15,
  //   'ko-KR': 16,
  //   'nl-NL': 17,
  //   'pl-PL': 18,
  //   'pt-BR': 19,
  //   'ru-RU': 20,
  //   'zh-CN': 21,
  //   'zh-HK': 22,
  //   'zh-TW': 23,
  // };
  // const voiceIndex = {
  //   en: 0,
  //   de: 5,
  //   'en-GB': 8,
  //   es: 9,
  //   fr: 11,
  //   hi: 12,
  //   id: 13,
  //   it: 14,
  //   ja: 15,
  //   ko: 16,
  //   nl: 17,
  //   pl: 18,
  //   'pt-BR': 19,
  //   ru: 20,
  //   'zh-CN': 21,
  //   'zh-HK': 22,
  //   'zh-TW': 23,
  // };
  return (
    <main className='App'>
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path='/orders/new' element={<NewOrderPage />} />
            <Route path='/orders' element={<OrderHistoryPage />} />
          </Routes>
          HELLO THERE
          <div className='speechContainer'>
            {speech.length > 0 ? (
              speech.map((s, idx) => (
                <SpeechContainer
                  speech={s}
                  key={idx}
                  length={speech.length}
                  index={idx}
                />
              ))
            ) : (
              <SpeechContainer
                speech={'Hold speak to start'}
                className={'emptySpeech'}
              />
            )}
          </div>
          <span>
            <span onClick={handleStart}>SAY</span>&nbsp;&nbsp;
            <span onClick={handleStop}>STOP</span>
          </span>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}

export default App;
