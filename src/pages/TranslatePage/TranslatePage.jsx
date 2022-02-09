import SpeechContainer from '../../components/SpeechContainer/SpeechContainer';
import { useEffect } from 'react';
import './TranslatePage.css';
import Logo from '../../images/whiteMicrophone.png';

export default function TranslatePage({
  speech,
  handleStart,
  handleStop,
  inputLanguage,
  setInputLanguage,
  outputLanguage,
  setOutputLanguage,
  buttonState,
  languageCodes,
  flagCode,
}) {
  function handleSetInputLanguage(e) {
    console.log('intercept set language', e);
    setInputLanguage(e);
  }
  return (
    <>
      <br />
      <div className='speechContainer'>
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
        &nbsp;&nbsp;➡ &nbsp;
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
        <br />
        <br />
        <div className='dialogue' id='dialogue'>
          {speech[0] ? (
            speech.map((s, idx) => (
              <SpeechContainer
                speech={s}
                key={idx}
                length={speech.length}
                index={idx}
                flagCode={flagCode}
                inputLanguage={inputLanguage}
                languageCodes={languageCodes}
              />
            ))
          ) : (
            <SpeechContainer
              speech={{ text: 'Hold speak to start' }}
              empty={true}
              flagCode={flagCode}
              languageCodes={languageCodes}
            />
          )}
        </div>
      </div>

      <div>
        <div className='speakButton'>
          {buttonState ? (
            buttonState == 'loading' ? (
              <div className='loading'>🦜</div>
            ) : (
              <img src={Logo} className='microphone' onClick={handleStart} />
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
