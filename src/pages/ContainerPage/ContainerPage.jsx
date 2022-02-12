import EachSpeech from '../../components/EachSpeech/EachSpeech';
import { useState, useEffect } from 'react';
import './ContainerPage.css';
import microphoneLogo from '../../images/whiteMicrophone.png';
import loadingLogo from '../../images/loading.png';
import * as speechesAPI from '../../utilities/speeches-api';
export default function ContainerPage({
  user,
  nav,
  scrollToBottom,
  speech,
  renderSpeeches,
  setSpeech,
  handleStarterConvo,
  handleStart,
  handleStop,
  inputLanguage,
  setInputLanguage,
  outputLanguage,
  setOutputLanguage,
  handleLanguageSwap,
  buttonState,
  languageCodes,
  flagCode,
  speechPreFav,
  setButtonState,
  setSpeechPreFav,
}) {
  function handleSetInputLanguage(input) {
    setInputLanguage(input);
  }

  useEffect(function () {
    renderSpeeches();
    // Populate the page with starter convo for un-loggedin users
    setTimeout(function () {
      if (
        !user &&
        (!speech[0] || !speech[0].sample) &&
        // (!speech[1] || !speech[1].sample) &&
        // (!speech[2] || !speech[2].sample) &&
        speech.length == 0
      ) {
        handleStarterConvo();
      } else if (user) {
        scrollToBottom();
      }
    }, 1000);
  }, []);

  return (
    <>
      <div className='speechContainer'>
        <span className='selectorContainer'>
          <select
            className='languageSelect'
            onChange={(evt) => handleSetInputLanguage(evt.target.value)}
            value={inputLanguage}
          >
            {languageCodes.map((option, idx) => (
              <option key={idx} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span className='swapArrow' onClick={handleLanguageSwap}>
            ⇌
          </span>
          <select
            className='languageSelect'
            onChange={(evt) => setOutputLanguage(evt.target.value)}
            value={outputLanguage}
          >
            {languageCodes.map((option, idx) => (
              <option key={idx} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </span>
        <div className='dialogueFadeBottom'>
          <div
            className={
              speech.length > 3 ? 'dialogue dialogueFadeTop' : 'dialogue'
            }
            id='dialogue'
          >
            {speech[0] ? (
              speech.map((s, idx) => (
                <EachSpeech
                  user={user}
                  eachSpeech={s}
                  speech={speech}
                  setSpeech={setSpeech}
                  key={idx}
                  length={speech.length}
                  index={idx}
                  flagCode={flagCode}
                  inputLanguage={inputLanguage}
                  outputLanguage={outputLanguage}
                  languageCodes={languageCodes}
                  setButtonState={setButtonState}
                  speechPreFav={speechPreFav}
                  setSpeechPreFav={setSpeechPreFav}
                />
              ))
            ) : (
              <div className='emptyPrompt'>
                {nav == 'fav'
                  ? 'Favourites List Empty'
                  : 'Press button to start'}
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className='speakButton'>
          {buttonState ? (
            buttonState == 'loading' ? (
              <img src={loadingLogo} className='loading' />
            ) : (
              <img
                src={microphoneLogo}
                className={
                  speech[0] ? 'microphone' : 'microphone  microphoneEmpty'
                }
                onClick={handleStart}
              />
            )
          ) : (
            <div className='recordingStop' onClick={handleStop}>
              ▢
            </div>
          )}
        </div>
      </div>
    </>
  );
}
