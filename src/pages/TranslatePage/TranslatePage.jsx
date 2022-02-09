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
  settingCodes,
  flagCode,
}) {
  return (
    <>
      <br />
      <div className='speechContainer'>
        <select
          className='languageSelect'
          onChange={(evt) => setInputLanguage(evt.target.value)}
          value={inputLanguage}
        >
          {settingCodes.map((option, idx) => (
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
          {settingCodes.map((option, idx) => (
            <option key={idx} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <div className='dialogue' id='dialogue'>
          {speech.length > 0 ? (
            speech.map((s, idx) => (
              <SpeechContainer
                speech={s}
                key={idx}
                length={speech.length}
                index={idx}
                flagCode={flagCode}
                inputLanguage={inputLanguage}
                settingCodes={settingCodes}
              />
            ))
          ) : (
            <SpeechContainer
              speech={'Hold speak to start'}
              empty={true}
              flagCode={flagCode}
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
