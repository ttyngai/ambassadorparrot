import './App.css';
import { useState, useEffect } from 'react';
import { getUser } from '../../utilities/users-service';
import translate from '../../utilities/translate';
import { Routes, Route } from 'react-router-dom';
import ContainerPage from '../ContainerPage/ContainerPage';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import * as speechesAPI from '../../utilities/speeches-api';

function App() {
  const [user, setUser] = useState(getUser());
  const [speech, setSpeech] = useState([]);
  const [recognition, setRecognition] = useState('');
  const [buttonState, setButtonState] = useState(true);
  const [inputLanguage, setInputLanguage] = useState('en');
  const [outputLanguage, setOutputLanguage] = useState('zh-yue');
  const languageCodes = [
    { value: 'en', label: 'English(US)', flagCode: 'US' },
    { value: 'en-GB', label: 'English(UK)', flagCode: 'GB' },
    { value: 'es', label: 'Español', flagCode: 'ES' },
    { value: 'fr', label: 'Français', flagCode: 'FR' },
    { value: 'hi', label: 'हिन्दी', flagCode: 'IN' },
    { value: 'id', label: 'Indonesia', flagCode: 'ID' },
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
  const sampleConvo = [
    {
      inputText: "Hello, I'm Parrot, your personal translator. ",
      inputLanguage: 'en',
      outputText: '你好, 我是 Parrot, 你的私人翻譯員 。',
      outputLanguage: 'zh-yue',
      timeCreated: new Date('6/15/2012, 5:14:39 PM'),
      sample: true,
    },
    {
      inputText:
        'Press the button below to start. Press the again to hear the translation!',
      inputLanguage: 'en-GB',
      outputText:
        '下のボタンを押して開始します。もう一度押すと翻訳が聞こえます！',
      outputLanguage: 'ja',
      timeCreated: new Date('5/7/2013, 2:12:10 AM'),
      sample: true,
    },
    {
      inputText: 'Have fun!',
      inputLanguage: 'en',
      outputText: 'Divertiti!',
      outputLanguage: 'it',
      timeCreated: new Date('1/2/2014, 8:56:42 PM'),
      sample: true,
    },
  ];

  // Startup of recognition/voice modules
  useEffect(function () {
    window.speechSynthesis.cancel();
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    window.speechSynthesis.getVoices();
    // FOr iOS first time activation
    let hasEnabledVoice = false;
    document.addEventListener('click', () => {
      if (hasEnabledVoice) {
        return;
      }
      const lecture = new SpeechSynthesisUtterance('hello');
      lecture.volume = 0;
      speechSynthesis.speak(lecture);
      hasEnabledVoice = true;
    });
  }, []);

  function handleStart() {
    setButtonState(false);
    const recognition = new window.SpeechRecognition();
    recognition.lang = inputLanguage;
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.onresult = (e) => {
      // Real time update of spoken phrase
      let concat = { inputText: '' };
      for (let i = 0; i < e.results.length; i++) {
        concat.inputText += e.results[i][0].transcript;
      }
      // Uppercase First letter
      concat.inputText =
        concat.inputText[0].toUpperCase() + concat.inputText.slice(1);
      concat.inputLanguage = inputLanguage;
      concat.timeCreated = new Date();
      concat.new = true;
      setSpeech([...speech, concat]);
      if (document.getElementById('dialogue')) {
        document.getElementById('dialogue').scrollTo({
          top: document.getElementById('dialogue').scrollHeight,
          behavior: 'smooth',
        });
      }
    };
    // Include the called function as a state, for invoking later even after state change
    setRecognition(recognition);
    recognition.start();
  }

  async function handleStop() {
    await recognition.stop();
    setButtonState('loading');
    setTimeout(async function () {
      setButtonState(true);
      if (speech[speech.length - 1] && speech[speech.length - 1].new) {
        let fullSpeech, lastSpeech;
        const speechReturn = await translate(speech, outputLanguage, 'recent');
        fullSpeech = [...speech];
        lastSpeech = fullSpeech.pop();
        lastSpeech.outputText = speechReturn;
        lastSpeech.outputLanguage = outputLanguage;
        lastSpeech.user = user;
        delete lastSpeech.new;
        let newSpeechObj;
        if (user) {
          newSpeechObj = await speechesAPI.create(lastSpeech);
        } else {
          newSpeechObj = lastSpeech;
        }
        setSpeech([...fullSpeech, newSpeechObj]);
      }
      scrollToBottom();
    }, 1500);
  }

  function handleStarterConvo() {
    setSpeech(sampleConvo);
  }

  function handleLanguageSwap() {
    let tempInputLanguage = inputLanguage;
    setInputLanguage(outputLanguage);
    setOutputLanguage(tempInputLanguage);
  }
  function scrollToBottom() {
    if (document.getElementById('dialogue')) {
      document.getElementById('dialogue').scrollTo({
        top: document.getElementById('dialogue').scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  return (
    <main className='App'>
      <>
        <NavBar
          user={user}
          setUser={setUser}
          sampleConvo={sampleConvo}
          handleStarterConvo={handleStarterConvo}
          setSpeech={setSpeech}
          scrollToBottom={scrollToBottom}
        />

        <Routes>
          <Route
            path='/*'
            element={
              <ContainerPage
                user={user}
                scrollToBottom={scrollToBottom}
                speech={speech}
                setSpeech={setSpeech}
                handleStarterConvo={handleStarterConvo}
                handleStart={handleStart}
                handleStop={handleStop}
                setInputLanguage={setInputLanguage}
                setOutputLanguage={setOutputLanguage}
                inputLanguage={inputLanguage}
                outputLanguage={outputLanguage}
                buttonState={buttonState}
                languageCodes={languageCodes}
                handleLanguageSwap={handleLanguageSwap}
              />
            }
          />
          <Route path='/login' element={<AuthPage setUser={setUser} />} />)
        </Routes>
      </>
    </main>
  );
}

export default App;
