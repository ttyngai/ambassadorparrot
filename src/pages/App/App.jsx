// import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { getUser } from '../../utilities/users-service';

import translate from '../../utilities/translate';
import { Routes, Route } from 'react-router-dom';
import TranslatePage from '../TranslatePage/TranslatePage';
import AuthPage from '../AuthPage/AuthPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import NavBar from '../../components/NavBar/NavBar';

// import { Translate } from '@google-cloud/translate';

// const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

// console.log('everything voices', voices);
function App() {
  // const [user, setUser] = useState(getUser());
  const [user, setUser] = useState(getUser());
  const [speech, setSpeech] = useState([]);
  // const [translatedSpeech, setTranslatedSpeech] = useState([]);
  const [recognition, setRecognition] = useState('');

  const [inputLanguage, setInputLanguage] = useState('en');
  const [outputLanguage, setOutputLanguage] = useState('zh-HK');

  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  window.speechSynthesis.getVoices();

  async function handleStart() {
    const recognition = new window.SpeechRecognition({});
    // let p = document.createElement('p');

    recognition.lang = inputLanguage;
    console.log('input language', inputLanguage);
    recognition.interimResults = true;
    recognition.continuous = true;
    let speechCut = [...speech];

    if (speech.length >= 10) {
      speechCut = speechCut.slice(-8);
    }
    // console.log('cutted', speechCut);
    // setSpeech([speechCut]);
    console.log('the speech', speech);
    // console.log(recognition);
    recognition.onresult = async (e) => {
      // console.log('results; ', e.results);
      // console.log('latest: ', e.results[e.results.length - 1][0].transcript);
      setSpeech([...speechCut, concatSpeech(e.results)]);
    };
    setRecognition(recognition);

    console.log('recognition.lang', recognition.lang);
    recognition.start();
  }
  // initSpeech();
  // function handleStart() {
  //   initSpeech();

  // setSpeech(speech);

  // console.log('the recognition program', recognition);
  // }
  async function handleStop() {
    setTimeout(async function () {
      await setRecognition('');
      console.log('speech length', speech.length);
      if (speech.length % 2 != 0) {
        console.log('outputlanguage', outputLanguage);
        const speechReturn = await translate(speech, outputLanguage);
        console.log('return speech', speechReturn);

        let speechCut = [...speech];
        if (speech.length >= 10) {
          speechCut = speechCut.slice(-9);
        }
        setSpeech([...speechCut, speechReturn]);
      }
    }, 1000);
  }
  function concatSpeech(results) {
    let concat = '';
    // console.log('at concat', results);
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
            <Route
              path='/orders/new'
              element={
                <TranslatePage
                  speech={speech}
                  handleStart={handleStart}
                  handleStop={handleStop}
                  setInputLanguage={setInputLanguage}
                  setOutputLanguage={setOutputLanguage}
                  inputLanguage={inputLanguage}
                  outputLanguage={outputLanguage}
                />
              }
            />
            <Route path='/orders' element={<OrderHistoryPage />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}

export default App;
