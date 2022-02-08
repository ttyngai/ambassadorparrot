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
              />
            ))
          ) : (
            <SpeechContainer speech={'Hold speak to start'} empty={true} />
          )}
        </div>
      </div>
      {/* <span onClick={initSpeech}>Init</span>&nbsp;&nbsp; */}
      <div>
        {' '}
        <div
          className='speakButton'
          // onMouseDown={handleStart}

          // onMouseUp={handleStop}
        >
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
        {/* <form>
          <input type='text' />
          <button type='submit'>Submit</button>
        </form> */}
      </div>
    </>
  );
}
