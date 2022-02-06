// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { getUser } from '../../utilities/users-service';
import { Routes, Route } from 'react-router-dom';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import AuthPage from '../AuthPage/AuthPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import NavBar from '../../components/NavBar/NavBar';
import axios from 'axios';

// import { Translate } from '@google-cloud/translate';

// const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

function App() {
  const [user, setUser] = useState(getUser());
  console.log('the user', user);

  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new window.SpeechRecognition({ profanityFilter: false });
  // let p = document.createElement('p');
  console.log('the program', recognition);
  recognition.lang = 'zh';
  recognition.addEventListener('result', async (e) => {
    console.log(e.results[0][0].transcript);
    console.log(e);
    translateAndSpeak(e.results[0][0].transcript, 'en');
    // speak(phrase);
  });
  async function translateAndSpeak(message, targetLanguage) {
    const lang = voiceSetting(targetLanguage);
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
          q: message,
          target: lang.target,
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log('the data', data.data.translations[0].translatedText);
        var msg = new SpeechSynthesisUtterance(
          data.data.translations[0].translatedText
        );
        var voices = window.speechSynthesis.getVoices();
        msg.voice = voices[lang.voice];
        window.speechSynthesis.speak(msg);
      });
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
  function voiceSetting(code) {
    let setting = {};
    if (code == 'en') {
      setting = {
        target: 'en',
        voice: 0,
      };
    } else if (code == 'de') {
      setting = {
        target: 'de',
        voice: 5,
      };
    } else if (code == 'en-GB') {
      setting = {
        target: 'en',
        voice: 8,
      };
    } else if (code == 'es') {
      setting = {
        target: 'es',
        voice: 9,
      };
    } else if (code == 'fr') {
      setting = {
        target: 'fr',
        voice: 11,
      };
    } else if (code == 'hi') {
      setting = {
        target: 'hi',
        voice: 12,
      };
    } else if (code == 'id') {
      setting = {
        target: 'id',
        voice: 13,
      };
    } else if (code == 'it') {
      setting = {
        target: 'it',
        voice: 14,
      };
    } else if (code == 'ja') {
      setting = {
        target: 'ja',
        voice: 15,
      };
    } else if (code == 'ko') {
      setting = {
        target: 'ko',
        voice: 16,
      };
    } else if (code == 'nl') {
      setting = {
        target: 'nl',
        voice: 17,
      };
    } else if (code == 'pl') {
      setting = {
        target: 'pl',
        voice: 18,
      };
    } else if (code == 'pt-BR') {
      setting = {
        target: 'pt-BR',
        voice: 19,
      };
    } else if (code == 'ru') {
      setting = {
        target: 'ru',
        voice: 20,
      };
    } else if (code == 'zh-CN') {
      setting = {
        target: 'zh-CN',
        voice: 21,
      };
    } else if (code == 'zh-HK') {
      setting = {
        target: 'zh-CN',
        voice: 22,
      };
    } else if (code == 'zh-TW') {
      setting = {
        target: 'zh-TW',
        voice: 23,
      };
    }
    return setting;
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

  // .then((data) => {
  //   console.log('the data', data);
  //   console.log(data.data.translations[0].translatedText);
  //   speak(data.data.translations[0].translatedText);
  // });

  // const translate = new Translate({ project_id: 'the-ridge-340000' });

  // const translate = new Translate({

  //   credentials: CREDENTIALS,
  //   projectId: CREDENTIALS.project_id,

  // });

  async function handleSay() {
    recognition.start();
    // let response = await translate.detect(text);
    // return response[0].language;
  }

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
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}

export default App;
