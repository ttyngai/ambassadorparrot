import './App.css';
import { useState, useEffect } from 'react';
import { getUser } from '../../utilities/users-service';
import translate from '../../utilities/translate';
import { Routes, Route } from 'react-router-dom';
import TranslatePage from '../TranslatePage/TranslatePage';
import AuthPage from '../AuthPage/AuthPage';
import FavouritePage from '../FavouritePage/FavouritePage';
import NavBar from '../../components/NavBar/NavBar';
import * as speechesAPI from '../../utilities/speeches-api';

function App() {
  const [user, setUser] = useState(getUser());
  const [speech, setSpeech] = useState([]);
  const [recognition, setRecognition] = useState('');
  const [buttonState, setButtonState] = useState(true);
  const [inputLanguage, setInputLanguage] = useState('en');
  const [outputLanguage, setOutputLanguage] = useState('zh-HK');
  const languageCodes = [
    { value: 'en', label: 'English(US)', flagCode: 'US' },
    { value: 'en-GB', label: 'English(UK)', flagCode: 'GB' },
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

  function handleStart() {
    setButtonState(false);
    const recognition = new window.SpeechRecognition({});
    recognition.lang = inputLanguage;
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.onresult = (e) => {
      // Real time update of spoken phrase
      let concat = { inputText: '' };
      for (let i = 0; i < e.results.length; i++) {
        concat.inputText += e.results[i][0].transcript;
      }
      // Uppercase
      concat.inputText =
        concat.inputText[0].toUpperCase() + concat.inputText.slice(1);
      concat.inputLanguage = inputLanguage;
      concat.timeCreated = new Date();
      concat.new = true;
      setSpeech([...speech, concat]);
      if (document.getElementById('dialogue')) {
        document.getElementById('dialogue').scrollTop =
          document.getElementById('dialogue').scrollHeight;
      }
    };
    // Include called function as state, for invoking later after state change
    setRecognition(recognition);
    recognition.start();
  }

  async function handleStop() {
    await recognition.stop();
    setButtonState('loading');
    setTimeout(async function () {
      setButtonState(true);
      if (speech[speech.length - 1].new) {
        let fullSpeech, lastSpeech;
        const speechReturn = await translate(speech, outputLanguage, 'recent');
        fullSpeech = [...speech];
        lastSpeech = fullSpeech.pop();
        lastSpeech.outputText = speechReturn;
        lastSpeech.outputLanguage = outputLanguage;
        lastSpeech.user = user;
        delete lastSpeech.new;
        const newSpeechObj = await speechesAPI.create(lastSpeech);

        setSpeech([...fullSpeech, newSpeechObj]);
      }
    }, 1500);
  }

  return (
    <main className='App'>
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route
              path='/translate'
              element={
                <TranslatePage
                  speech={speech}
                  setSpeech={setSpeech}
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
              path='/favourites'
              element={
                <FavouritePage
                  speech={speech}
                  setSpeech={setSpeech}
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
