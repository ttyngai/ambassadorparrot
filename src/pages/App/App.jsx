import './App.css';
import { useState, useEffect } from 'react';
import { getUser } from '../../utilities/users-service';
import translate from '../../utilities/translate';
import { Routes, Route } from 'react-router-dom';
import ContainerPage from '../ContainerPage/ContainerPage';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import * as speechesAPI from '../../utilities/speeches-api';
import * as voice from '../../utilities/voiceSettings';

function App() {
  const [user, setUser] = useState(getUser());
  const [speech, setSpeech] = useState([]);
  const [speechPreFav, setSpeechspeechPreFav] = useState([]);
  const [recognition, setRecognition] = useState('');
  const [buttonState, setButtonState] = useState(true);
  const [inputLanguage, setInputLanguage] = useState('en');
  const [outputLanguage, setOutputLanguage] = useState('zh-HK');
  const languageCodes = voice.getLanguageCodes();
  const sampleConvo = voice.getSampleConvo();

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
    let recognition = new window.SpeechRecognition();

    recognition.lang = inputLanguage;
    if (
      (navigator.userAgent.includes('Windows') ||
        navigator.userAgent.includes('Win64')) &&
      inputLanguage == 'zh-HK'
    ) {
      recognition.lang = 'zh-yue';
    }
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

  function toggleFav() {
    if (speechPreFav.length > 0) {
      setSpeech(speechPreFav);
      setSpeechspeechPreFav([]);
    } else {
      let speechCopy = [...speech];
      setSpeechspeechPreFav(speech);
      let favSpeech = [];
      speechCopy.forEach(function (s) {
        if (s.isStarred) {
          favSpeech.push(s);
        }
      });
      setSpeech(favSpeech);
    }
    setTimeout(function () {
      scrollToBottom();
    }, 500);
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
          toggleFav={toggleFav}
          speechPreFav={speechPreFav}
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
