import EachSpeech from '../../components/EachSpeech/EachSpeech';
import { useState, useEffect } from 'react';
import './ContainerPage.css';
import microphoneLogo from '../../images/whiteMicrophone.png';
import loadingLogo from '../../images/loading.png';
import * as speechesAPI from '../../utilities/speeches-api';
export default function TranslatePage({
  user,
  scrollToBottom,
  speech,
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
}) {
  function handleSetInputLanguage(input) {
    setInputLanguage(input);
  }

  useEffect(function () {
    async function initSpeeches() {
      if (user) {
        let speechCopy = [...speech];
        let speechWithoutSamples = [];
        speechCopy.forEach(function (s) {
          if (!s.sample) speechWithoutSamples.push(s);
        });
        const speeches = await speechesAPI.getSpeech();
        // sorted by newest at bottom
        const sorted = speeches.sort(function (a, b) {
          if (a.createdAt > b.createdAt) return 1;
          if (a.createdAt < b.createdAt) return -1;
          return 0;
        });
        setSpeech(sorted.concat(speechWithoutSamples));
      }
    }
    initSpeeches();

    if (!user) {
      handleStarterConvo();
    }

    setTimeout(function () {
      scrollToBottom();
    }, 1500);
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
