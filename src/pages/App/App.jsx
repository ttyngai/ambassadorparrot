// import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { getUser } from '../../utilities/users-service';
import voiceSettings from '../../utilities/voiceSettings';
import speak from '../../utilities/speak';
import { Routes, Route } from 'react-router-dom';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import AuthPage from '../AuthPage/AuthPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import NavBar from '../../components/NavBar/NavBar';
import EachSpeech from '../../components/EachSpeech/EachSpeech';

// import { Translate } from '@google-cloud/translate';

// const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

function App() {
  // const [user, setUser] = useState(getUser());
  const [user, setUser] = useState({});
  const [speech, setSpeech] = useState([]);

  let result;
  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new window.SpeechRecognition({ profanityFilter: false });
  // let p = document.createElement('p');

  recognition.lang = 'en';
  recognition.interimResults = true;
  recognition.continuous = false;
  console.log(recognition);

  recognition.addEventListener('result', async (e) => {
    console.log('results', e.results);
    console.log('latest', e.results[e.results.length - 1][0].transcript);

    setSpeech([...speech, concatSpeech(e.results)]);
  });

  function concatSpeech(results) {
    let concat = '';
    console.log('at concat', results);
    for (let i = 0; i < results.length; i++) {
      concat += results[i][0].transcript;
    }

    return concat;
  }

  const voiceIndex = {
    en: 0,
    de: 5,
    'en-GB': 8,
    es: 9,
    fr: 11,
    hi: 12,
    id: 13,
    it: 14,
    ja: 15,
    ko: 16,
    nl: 17,
    pl: 18,
    'pt-BR': 19,
    ru: 20,
    'zh-CN': 21,
    'zh-HK': 22,
    'zh-TW': 23,
  };

  async function handleSay() {
    setSpeech(speech);
    recognition.start();
  }
  async function handleStop() {
    recognition.stop();
    console.log('speech', speech);
    translateAndSpeak(speech, 'zh-HK');
  }

  async function translateAndSpeak(message, targetLanguage) {
    console.log('message being translated', message);
    const lang = voiceSettings(targetLanguage);

    console.log('lang', lang);
    await fetch(
      'https://translation.googleapis.com/language/translate/v2?key=AIzaSyCvfxyq6CDaQqsiPhVVuNcj07rPHGxH2dM',
      {
        method: 'POST',

        // headers: {
        //   Accept: 'application/json',
        //   'Content-Type': 'application/json',
        //   // charset: 'UTF-8',
        //   //   // 'Access-Control-Allow-Origin': '*',
        // },
        body: JSON.stringify({
          q: message[message.length - 1],
          target: lang.target,
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then(async (data) => {
        console.log('the data', data.data.translations[0].translatedText);
        speak(data, lang);
      });
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
          <div onClick={handleSay}>SAY</div>
          <div onClick={handleStop}>Stop</div>
          {speech.map((s, idx) => (
            <EachSpeech speech={s} key={idx} />
          ))}
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}

export default App;
