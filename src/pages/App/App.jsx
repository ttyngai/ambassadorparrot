// import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { getUser } from '../../utilities/users-service';

import translate from '../../utilities/translate';
import { Routes, Route } from 'react-router-dom';
import TranslatePage from '../TranslatePage/TranslatePage';
import AuthPage from '../AuthPage/AuthPage';
import FavouritePage from '../FavouritePage/FavouritePage';
import NavBar from '../../components/NavBar/NavBar';

// import { Translate } from '@google-cloud/translate';

// const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

// console.log('everything voices', voices);
function App() {
  const [user, setUser] = useState(getUser());
  const [speech, setSpeech] = useState([]);
  // const [translatedSpeech, setTranslatedSpeech] = useState([]);
  const [recognition, setRecognition] = useState('');
  const [buttonState, setButtonState] = useState(true);
  const [inputLanguage, setInputLanguage] = useState('en');
  const [outputLanguage, setOutputLanguage] = useState('zh-HK');
  const settingCodes = [
    { value: 'en', label: 'English(NA)' },
    { value: 'en-GB', label: 'English(Britain)' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'hi', label: 'हिन्दी' },
    { value: 'id', label: 'Bahasa Indonesia' },
    { value: 'it', label: 'Italiano' },
    { value: 'ja', label: '日本語' },
    { value: 'ko', label: '한국어' },
    { value: 'nl', label: 'Nederlands' },
    { value: 'pl', label: 'Polski' },
    { value: 'pt-BR', label: 'Português' },
    { value: 'ru', label: 'Pусский язык' },
    { value: 'zh-CN', label: '中文(中國)' },
    { value: 'zh-HK', label: '中文(香港)' },
    { value: 'zh-TW', label: '中文(台灣)' },
  ];
  useEffect(function () {
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    window.speechSynthesis.getVoices();
  }, []);

  useEffect(function () {
    document.getElementById('dialogue').scrollTop =
      document.getElementById('dialogue').scrollHeight;
  });

  async function handleStart() {
    setButtonState(false);
    const recognition = new window.SpeechRecognition({});

    recognition.lang = inputLanguage;

    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = async (e) => {
      setSpeech([...speech, concatSpeech(e.results)]);
    };
    setRecognition(recognition);

    recognition.start();
  }

  async function handleStop() {
    await recognition.stop();
    setButtonState('loading');
    setTimeout(async function () {
      setButtonState(true);

      if (speech.length % 2 != 0) {
        const speechReturn = await translate(speech, outputLanguage);
        setSpeech([...speech, speechReturn]);
      }
    }, 1500);
  }
  function concatSpeech(results) {
    let concat = '';
    // console.log('at concat', results);
    for (let i = 0; i < results.length; i++) {
      concat += results[i][0].transcript;
    }
    return concat;
  }

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
                  buttonState={buttonState}
                  settingCodes={settingCodes}
                />
              }
            />
            <Route path='/orders' element={<FavouritePage />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}

export default App;
