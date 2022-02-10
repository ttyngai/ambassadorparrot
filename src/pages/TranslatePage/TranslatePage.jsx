import SpeechContainer from '../../components/SpeechContainer/SpeechContainer';
import './TranslatePage.css';
import microphoneLogo from '../../images/whiteMicrophone.png';
import loadingLogo from '../../images/loading.png';

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
        <span className='swapArrow' onClick={handleLanguageSwap}>
          &nbsp;&nbsp;⇆&nbsp;&nbsp;
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
