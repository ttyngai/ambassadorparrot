import EachSpeech from '../../components/EachSpeech/EachSpeech';
import { useState, useEffect } from 'react';
import './ContainerPage.css';
import microphoneLogo from '../../images/whiteMicrophone.png';
import loadingLogo from '../../images/loading.png';
import * as speechesAPI from '../../utilities/speeches-api';
export default function TranslatePage({
  user,
  speech,
  setSpeech,
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
}) {
  function handleSetInputLanguage(input) {
    setInputLanguage(input);
  }

  useEffect(function () {
    async function initSpeeches() {
      if (user) {
        let speechCopy = [...speech];
        const speeches = await speechesAPI.getSpeech();
        setSpeech(speeches.concat(speechCopy));
      }
    }
    initSpeeches();
    setTimeout(function () {
      if (document.getElementById('dialogue')) {
        document.getElementById('dialogue').scrollTo({
          top: document.getElementById('dialogue').scrollHeight,
          behavior: 'smooth',
        });
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
            ⇆
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
              speech.length > 2 ? 'dialogue dialogueFadeTop' : 'dialogue'
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
                />
              ))
            ) : (
              <div className='emptyPrompt'>Press button to start</div>
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
                className='microphone'
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
