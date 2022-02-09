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
  const languageCodes = [
    { value: 'en', label: 'English(NA)', flagCode: 'US' },
    { value: 'en-GB', label: 'English(Britain)', flagCode: 'GB' },
    { value: 'es', label: 'Español', flagCode: 'ES' },
    { value: 'fr', label: 'Français', flagCode: 'FR' },
    { value: 'hi', label: 'हिन्दी', flagCode: 'IN' },
    { value: 'id', label: 'Bahasa Indonesia', flagCode: 'ID' },
    { value: 'it', label: 'Italiano', flagCode: 'IT' },
    { value: 'ja', label: '日本語', flagCode: 'JP' },
    { value: 'ko', label: '한국어', flagCode: 'KR' },
    { value: 'nl', label: 'Nederlands', flagCode: 'NL' },
    { value: 'pl', label: 'Polski', flagCode: 'PL' },
    { value: 'pt-BR', label: 'Português', flagCode: 'PT' },
    { value: 'ru', label: 'Pусский язык', flagCode: 'RU' },
    { value: 'zh-CN', label: '中文(中國)', flagCode: 'CN' },
    { value: 'zh-HK', label: '中文(香港)', flagCode: 'HK' },
    { value: 'zh-TW', label: '中文(台灣)', flagCode: 'TW' },
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
      setSpeech([...speech, concatSpeech(e.results, inputLanguage)]);
    };
    setRecognition(recognition);
    recognition.start();
  }
  // Real time update of speech
  function concatSpeech(results, inputLanguage) {
    let concat = { inputText: '' };
    for (let i = 0; i < results.length; i++) {
      concat.inputText += results[i][0].transcript;
    }
    console.log(concat.inputText[0].toUpperCase());
    concat.inputText =
      concat.inputText[0].toUpperCase() + concat.inputText.slice(1);
    concat.inputLanguage = inputLanguage;
    concat.time = new Date();
    return concat;
  }

  async function handleStop() {
    await recognition.stop();
    setButtonState('loading');
    setTimeout(async function () {
      setButtonState(true);
      // console.log('speeech before translate', speech);
      let fullSpeech;
      let lastSpeech;
      if (speech.length % 2 != 0) {
        const speechReturn = await translate(speech, outputLanguage);
        fullSpeech = [...speech];
        lastSpeech = fullSpeech.pop();

        lastSpeech.outputText = speechReturn;
        lastSpeech.outputLanguage = outputLanguage;
      }
      setSpeech([...fullSpeech, lastSpeech]);
    }, 1500);
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
                  languageCodes={languageCodes}
                />
              }
            />
            <Route
              path='/orders'
              element={
                <FavouritePage
                  speech={speech}
                  handleStart={handleStart}
                  handleStop={handleStop}
                  setInputLanguage={setInputLanguage}
                  setOutputLanguage={setOutputLanguage}
                  inputLanguage={inputLanguage}
                  outputLanguage={outputLanguage}
                  buttonState={buttonState}
                  languageCodes={languageCodes}
                />
              }
            />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}

export default App;
