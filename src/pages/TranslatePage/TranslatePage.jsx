import SpeechContainer from '../../components/SpeechContainer/SpeechContainer';
import Select from 'react-select';

const settingCodes = [
  { value: 'en', label: 'en' },
  { value: 'en-GB', label: 'en-GB' },
  { value: 'es', label: 'es' },
  { value: 'fr', label: 'fr' },
  { value: 'hi', label: 'hi' },
  { value: 'id', label: 'id' },
  { value: 'it', label: 'it' },
  { value: 'ja', label: 'ja' },
  { value: 'ko', label: 'ko' },
  { value: 'nl', label: 'nl' },
  { value: 'pl', label: 'pl' },
  { value: 'pt-BR', label: 'pt-BR' },
  { value: 'ru', label: 'ru' },
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
    setInputLanguage(option.value);
    console.log(inputLanguage);
  }
  function settingOutputCode(option) {
    setOutputLanguage(option.value);
    console.log(outputLanguage);
  }

  return (
    <>
      &nbsp;
      <div className='speechContainer'>
        <form action=''>
          <Select
            options={settingCodes}
            onChange={settingInputCode}
            value={inputLanguage.value}
          />
          <Select
            options={settingCodes}
            onChange={settingOutputCode}
            value={outputLanguage.value}
          />
        </form>
        {/* {inputLanguage.toUpperCase()} ➡ {outputLanguage.toUpperCase()} */}
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
          SAY
        </button>
        {/* <form>
          <input type='text' />
          <button type='submit'>Submit</button>
        </form> */}
      </div>
    </>
  );
}
