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
  const [speechPreFav, setSpeechPreFav] = useState([]);
  const [nav, setNav] = useState('translate');
  const [recognition, setRecognition] = useState('');
  const [buttonState, setButtonState] = useState(true);
  // Set default for input output languages
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

    //check to see if speech is empty, gives starter convo, need to be in favourites
    // if (speech.length == 0) {
    //   setTimeout(function () {
    //     handleStarterConvo();
    //   }, 1500);
    // }
  }, []);

  // If in favourites, need to also add new made speech to preFavSpeech
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

      // Add this new speech into the speech also in fav

      setSpeech([...speech, concat]);
      if (document.getElementById('dialogue')) {
        document.getElementById('dialogue').scrollTo({
          top: document.getElementById('dialogue').scrollHeight,
          behavior: 'smooth',
        });
      }
    };
    // Include the prefavspeech in function as a state, for invoking later even after state change
    // Also, when coming back from favourites, if you spoke, it will not show
    // Also, if spoke within favourites, should automatically be favourited
    // Also make delete confirm

    // When you come from loginsignup, your original unsaved speech disappears

    // in fav, new speech, when unclicked doesn't stay in normal
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
        if (nav == 'fav') {
          lastSpeech.isStarred = true;
        }
        delete lastSpeech.new;
        let newSpeechObj;
        if (user) {
          newSpeechObj = await speechesAPI.create(lastSpeech);
        } else {
          newSpeechObj = lastSpeech;
        }
        if (nav == 'fav') {
          setSpeechPreFav([...speechPreFav, newSpeechObj]);
        }
        setSpeech([...fullSpeech, newSpeechObj]);
      }
      scrollToBottom('noTopRescroll');
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

  async function renderSpeeches() {
    if (user) {
      let speechCopy = [...speech];
      let speechNotSavedWithoutSamples = [];
      speechCopy.forEach(function (s) {
        if (!s.sample) speechNotSavedWithoutSamples.push(s);
      });
      const speeches = await speechesAPI.getSpeech();
      // Only show the speeches that were never "cleared", both fav and not fav
      const neverCleared = [];
      speeches.forEach((s) => {
        if (!s.isCleared) {
          neverCleared.push(s);
        }
      });
      // sorted by newest at bottom
      const sorted = neverCleared.sort(function (a, b) {
        if (a.timeCreated > b.timeCreated) return 1;
        if (a.timeCreated < b.timeCreated) return -1;
        return 0;
      });
      setSpeech(sorted.concat(speechNotSavedWithoutSamples));
    }
  }

  async function renderFav(option) {
    if (nav == 'fav') {
      // nav == 'nav' mean we want to turn it off after view by pressing itself
      setNav('translate');
      setSpeech(speechPreFav);
      setSpeechPreFav([]);
    } else {
      // calc to show favourites
      setNav('fav');
      // Save whatever including deleted
      let speechCopy = [...speech];
      setSpeechPreFav(speechCopy);
      // from here , what I have is speech on screen
      const speeches = await speechesAPI.getSpeech();
      let favSpeech = [];
      speeches.forEach(function (s) {
        if (s.isStarred) {
          favSpeech.push(s);
        }
      });
      const sorted = favSpeech.sort(function (a, b) {
        if (a.timeCreated > b.timeCreated) return 1;
        if (a.timeCreated < b.timeCreated) return -1;
        return 0;
      });
      setSpeech(sorted);
    }
    scrollToBottom(option);
  }

  async function deleteSpeechList(nav) {
    if (nav == 'fav') {
      const deleted = await speechesAPI.deleteFav(user._id);
      // Delete from  the speechPreFav
      let speechPreFavCopy = [...speechPreFav];
      let speechPreFavCopyRemovedItem = [];
      speechPreFavCopy.forEach(function (s) {
        deleted.forEach(function (d) {
          if (s._id !== d._id) {
            speechPreFavCopyRemovedItem.push(s);
          }
        });
      });
      setSpeechPreFav(speechPreFavCopyRemovedItem);
      setSpeech([]);
    } else {
      // if theres a user, need to set everything
      if (user) {
        const cleared = await speechesAPI.clearList();
        console.log('cleared', cleared);
        setSpeech([]);
      } else {
        setSpeech([]);
        handleStarterConvo();
        // not logged in just change state
      }
    }
  }

  function scrollToBottom(option) {
    // Set scroll from top
    if (document.getElementById('dialogue') && option != 'noTopRescroll') {
      document.getElementById('dialogue').scrollTo({
        top: 0,
      });
    }
    // Scrolls to bottom after timeout
    setTimeout(function () {
      if (document.getElementById('dialogue')) {
        document.getElementById('dialogue').scrollTo({
          top: document.getElementById('dialogue').scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 500);
  }

  return (
    <main className='App'>
      <>
        <NavBar
          user={user}
          nav={nav}
          renderSpeeches={renderSpeeches}
          setNav={setNav}
          setUser={setUser}
          sampleConvo={sampleConvo}
          // handleStarterConvo={handleStarterConvo}
          setSpeech={setSpeech}
          renderFav={renderFav}
          deleteSpeechList={deleteSpeechList}
          scrollToBottom={scrollToBottom}
          speechPreFav={speechPreFav}
        />

        <Routes>
          <Route
            path='/*'
            element={
              <ContainerPage
                user={user}
                nav={nav}
                scrollToBottom={scrollToBottom}
                renderSpeeches={renderSpeeches}
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
                speechPreFav={speechPreFav}
                setSpeechPreFav={setSpeechPreFav}
                setButtonState={setButtonState}
              />
            }
          />
          <Route
            path='/login'
            element={
              <AuthPage
                setUser={setUser}
                handleStarterConvo={handleStarterConvo}
                setNav={setNav}
              />
            }
          />
          )
        </Routes>
      </>
    </main>
  );
}

export default App;
