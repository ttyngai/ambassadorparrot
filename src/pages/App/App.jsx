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
  recognition.lang = 'en-US';
  recognition.addEventListener('result', async (e) => {
    console.log(e.results[0][0].transcript);
    let phrase = await translate(e.results[0][0].transcript);
    speak(phrase);
  });

  function speak(message) {
    var msg = new SpeechSynthesisUtterance(message);
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[22];
    window.speechSynthesis.speak(msg);
  }

  async function translate(message) {
    await fetch(
      'https://translation.googleapis.com/language/translate/v2?key=AIzaSyCvfxyq6CDaQqsiPhVVuNcj07rPHGxH2dM',
      {
        method: 'POST',
        // crossDomain: true,

        // mode: 'no-cors',
        // mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          // charset: 'UTF-8',
          //   // 'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          q: message,
          target: 'zh',
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log('the data', data.data.translations[0].translatedText);
        speak(data.data.translations[0].translatedText);
      });

    // .then((data) => {
    //   console.log('the data', data);
    //   console.log(data.data.translations[0].translatedText);
    //   speak(data.data.translations[0].translatedText);
    // });
  }

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
