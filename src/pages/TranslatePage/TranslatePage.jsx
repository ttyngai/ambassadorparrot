import SpeechContainer from '../../components/SpeechContainer/SpeechContainer';
import './TranslatePage.css';
import microphoneLogo from '../../images/whiteMicrophone.png';
import loadingLogo from '../../images/loading.png';

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
        <div className='dialogueFadeBottom'>
          <div
            className={
              speech.length > 4 ? 'dialogue dialogueFadeTop' : 'dialogue'
            }
            id='dialogue'
          >
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
                speech={{ inputText: 'Press button to start' }}
                empty={true}
                flagCode={flagCode}
                languageCodes={languageCodes}
              />
            )}
          </div>
        </div>
      </div>

      <div>
        <div className='speakButton'>
          {buttonState ? (
            buttonState == 'loading' ? (
              <img
                src={loadingLogo}
                className='loading'
                onClick={handleStart}
              />
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
