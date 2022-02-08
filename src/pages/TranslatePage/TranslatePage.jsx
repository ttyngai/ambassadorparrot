import SpeechContainer from '../../components/SpeechContainer/SpeechContainer';

import './TranslatePage.css';

const settingCodes = [
  { value: 'en', label: 'English(NA)' },
  { value: 'en-GB', label: 'English(Britain)' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
  { value: 'hi', label: 'हिन्दी' },
  { value: 'id', label: 'Bahasa Indonesia' },
  { value: 'it', label: 'Italiano' },
  { value: 'ja', label: '日本語' },
  { value: 'ko', label: '한국어' },
  { value: 'nl', label: 'Nederlands' },
  { value: 'pl', label: 'Polski' },
  { value: 'pt-BR', label: 'Português' },
  { value: 'ru', label: 'Pусский язык' },
  { value: 'zh-CN', label: '中文(中國)' },
  { value: 'zh-HK', label: '中文(香港)' },
  { value: 'zh-TW', label: '中文(台灣)' },
];

export default function TranslatePage({
  speech,
  handleStart,
  handleStop,
  inputLanguage,
  setInputLanguage,
  outputLanguage,
  setOutputLanguage,
}) {
  function settingInputCode(option) {
    console.log(option.target.value);
    setInputLanguage(option.target.value);
  }
  function settingOutputCode(option) {
    console.log(option.target.value);
    setOutputLanguage(option.target.value);
  }

  return (
    <>
      &nbsp;
      <div className='speechContainer'>
        <select
          className='languageSelect'
          onChange={settingInputCode}
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
          onChange={settingOutputCode}
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
      {/* <span onClick={initSpeech}>Init</span>&nbsp;&nbsp; */}
      <div>
        {' '}
        <button onMouseDown={handleStart} onMouseUp={handleStop}>
          SPEAK
        </button>
        {/* <form>
          <input type='text' />
          <button type='submit'>Submit</button>
        </form> */}
      </div>
    </>
  );
}
