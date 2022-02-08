import SpeechContainer from '../../components/SpeechContainer/SpeechContainer';
import { useEffect } from 'react';
import './TranslatePage.css';

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
        <button
          className='speakButton'
          // onMouseDown={handleStart}
          onClick={buttonState ? handleStart : handleStop}
          // onMouseUp={handleStop}
        >
          {buttonState ? (
            buttonState == 'loading' ? (
              <div className='loading'>🦜</div>
            ) : (
              '🎙️'
            )
          ) : (
            <div className='recordingStop'>▢</div>
          )}
        </button>
        {/* <form>
          <input type='text' />
          <button type='submit'>Submit</button>
        </form> */}
      </div>
    </>
  );
}
