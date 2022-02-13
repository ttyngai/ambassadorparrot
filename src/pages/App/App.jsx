import './App.css';
import { useState, useEffect } from 'react';
import { getUser } from '../../utilities/users-service';
import translate from '../../utilities/translate';
import { Routes, Route } from 'react-router-dom';
import ContainerPage from '../ContainerPage/ContainerPage';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import * as speechesAPI from '../../utilities/speeches-api';
import * as voice from '../../utilities/speechSettings';

// Todos:
// record preferred languages for each user
// find empty star logo
// some &#39;

function App() {
  const [user, setUser] = useState(getUser());
  const [nav, setNav] = useState('translate');
  const [speech, setSpeech] = useState([]);
  const [speechPreFav, setSpeechPreFav] = useState([]);
  const [recognition, setRecognition] = useState('');
  const [inputLanguage, setInputLanguage] = useState('en');
  const [outputLanguage, setOutputLanguage] = useState('zh-HK');
  const [buttonState, setButtonState] = useState(true);
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

  function handleStarterConvo() {
    setSpeech(sampleConvo);
  }
  // If in favourites, need to also add new made speech to preFavSpeech
  function handleStart() {
    window.speechSynthesis.cancel();
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
      // Add a new speech auto speak token
      concat.reciteNewSpeech = true;
      // Add this new speech into the speech also in fav
      setSpeech([...speech, concat]);
      if (document.getElementById('dialogue')) {
        document.getElementById('dialogue').scrollTo({
          top: document.getElementById('dialogue').scrollHeight,
          behavior: 'smooth',
        });
      }
    };
    setRecognition(recognition);
    recognition.start();
  }

  async function handleStop() {
    await recognition.stop();
    setButtonState('loading');
    setButtonState(true);
    // When pressed, cuts speech and renders
    let speechCopy = [...speech];
    if (
      speechCopy[speechCopy.length - 1] &&
      speechCopy[speechCopy.length - 1].reciteNewSpeech
    ) {
      const speechReturn = await translate(
        speechCopy,
        outputLanguage,
        'recent'
      );
      let newSpeech = speechCopy.pop();
      newSpeech.outputText = speechReturn;
      newSpeech.outputLanguage = outputLanguage;
      newSpeech.user = user;
      if (nav == 'fav') {
        newSpeech.isStarred = true;
      }
      delete newSpeech.reciteNewSpeech;
      let newSpeechObj;
      if (user) {
        // If logged in, will update db
        newSpeechObj = await speechesAPI.create(newSpeech);
      } else {
        // If not logged in, only updates state
        newSpeechObj = newSpeech;
      }
      // If in favorite page, also updates the main page
      if (nav == 'fav') {
        setSpeechPreFav([...speechPreFav, newSpeechObj]);
      }
      // Renders as fast as possible if person alreaady stopped, will give fastest response
      setSpeech([...speechCopy, newSpeechObj]);

      // Incase user pressed button before stops, will hard rerender the latest speech one more time after timeout
      setTimeout(function () {
        setSpeech([...speechCopy, newSpeechObj]);
      }, 2000);
    }
    scrollToBottom('noTopRescroll');
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
      // Sort by time of entry
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
      // nav == 'fav' mean we want to turn it off after view by pressing itself
      setNav('translate');
      setSpeech(speechPreFav);
      setSpeechPreFav([]);
    } else {
      // To show favourites
      setNav('fav');
      // Save whatever including deleted
      let speechCopy = [...speech];
      setSpeechPreFav(speechCopy);
      // From here, what I have is speech on screen
      const speeches = await speechesAPI.getSpeech();
      let favSpeech = [];
      speeches.forEach(function (s) {
        if (s.isStarred) {
          favSpeech.push(s);
        }
      });
      // Sort by time of entry
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
      // Delete from  the speechPreFav at state, so when returning to translate, deleted fav wont show
      let speechPreFavCopy = [...speechPreFav];
      let speechPreFavCopyWithoutRemovedItem = [];
      for (let i = 0; i < speechPreFavCopy.length; i++) {
        let wasDeleted;
        deleted.forEach(function (d) {
          if (speechPreFavCopy[i]._id == d._id) {
            wasDeleted = true;
          }
        });
        if (!wasDeleted) {
          speechPreFavCopyWithoutRemovedItem.push(speechPreFavCopy[i]);
        }
      }
      setSpeechPreFav(speechPreFavCopyWithoutRemovedItem);
      setSpeech([]);
    } else {
      // if theres a user, copies onto speechPreFav waiting for the main translate page to be clicked
      if (user) {
        const cleared = await speechesAPI.clearList();
        setSpeech([]);
      }
      // If not logged in, just clears the main page
      else {
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
      <div
        className={buttonState ? 'recordingBar' : 'recordingBar recordingBarOn'}
      >
        &nbsp;
      </div>
      <>
        <NavBar
          user={user}
          setUser={setUser}
          nav={nav}
          setNav={setNav}
          setSpeech={setSpeech}
          renderFav={renderFav}
          deleteSpeechList={deleteSpeechList}
          scrollToBottom={scrollToBottom}
        />

        <Routes>
          <Route
            path='/*'
            element={
              <ContainerPage
                user={user}
                nav={nav}
                scrollToBottom={scrollToBottom}
                speech={speech}
                renderSpeeches={renderSpeeches}
                setSpeech={setSpeech}
                handleStarterConvo={handleStarterConvo}
                handleStart={handleStart}
                handleStop={handleStop}
                inputLanguage={inputLanguage}
                setInputLanguage={setInputLanguage}
                outputLanguage={outputLanguage}
                setOutputLanguage={setOutputLanguage}
                buttonState={buttonState}
                setButtonState={setButtonState}
                recognition={recognition}
                languageCodes={languageCodes}
                speechPreFav={speechPreFav}
                setSpeechPreFav={setSpeechPreFav}
              />
            }
          />
          <Route
            path='/login'
            element={<AuthPage setUser={setUser} setNav={setNav} />}
          />
          )
        </Routes>
      </>
    </main>
  );
}

export default App;
