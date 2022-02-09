import './EachSpeech.css';
import speak from '../../utilities/speak';
import * as speechesAPI from '../../utilities/speeches-api';
import voiceSettings from '../../utilities/voiceSettings';
import ReactCountryFlag from 'react-country-flag';

export default function EachSpeech({
  eachSpeech,
  speech,
  setSpeech,
  empty,
  languageCodes,
  outputLanguage,
}) {
  // to darken old dialogues(Not used)
  // if (length >= 0) {
  //   nameOfClass += ` focus`;
  // }

  // Decode object for it's flagCode
  let inputFlagCode, outputFlagCode, preOutputFlagCode;
  languageCodes.forEach(function (c) {
    if (eachSpeech && c.value == eachSpeech.inputLanguage) {
      inputFlagCode = c.flagCode;
    }
    if (eachSpeech && c.value == eachSpeech.outputLanguage) {
      outputFlagCode = c.flagCode;
    }
    if (c.value == outputLanguage) {
      preOutputFlagCode = c.flagCode;
    }
  });

  function handleSayAgain() {
    const lang = voiceSettings(eachSpeech.outputLanguage);
    speak(eachSpeech.outputText, lang);
  }
  async function handleSaveSpeech() {
    const starredSpeech = await speechesAPI.star(eachSpeech);

    let speechCopy = [...speech];
    let starredSpeechArray = speechCopy.map(function (s) {
      if (s._id == starredSpeech._id) {
        s.isStarred = !s.isStarred;
      }
      return s;
    });
    setSpeech(starredSpeechArray);
  }
  return (
    <div className='eachSpeech'>
      {/* <div className='speakerButton'>🔈</div> */}
      <div
        className={
          eachSpeech.isStarred ? 'starButton buttonStarred' : 'starButton'
        }
        onClick={handleSaveSpeech}
      >
        {' '}
        ★
      </div>
      <div className='speechDate'>
        {eachSpeech.timeCreated ? eachSpeech.timeCreated.toLocaleString() : ''}
      </div>
      <div onClick={handleSayAgain}>
        <div className='input'>
          <div className='flag'>
            <ReactCountryFlag
              countryCode={inputFlagCode}
              svg
              cdnUrl='https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/'
              style={{
                verticalAlign: 'middle',
                borderRadius: '20px',
                fontSize: '35px',
              }}
            />
          </div>
          &nbsp;&nbsp;
          <div className={empty ? 'emptyPrompt' : 'textBubble inputTextBubble'}>
            {eachSpeech.inputText}
          </div>
        </div>
        <div className='output'>
          {eachSpeech.outputText ? (
            <div className='textBubble outputTextBubble'>
              {eachSpeech.outputText}
            </div>
          ) : (
            <div className='textBubble outputTextBubble outputTextBlink'>
              . . .
            </div>
          )}
          &nbsp;&nbsp;
          <div>
            <ReactCountryFlag
              countryCode={
                eachSpeech.outputText ? outputFlagCode : preOutputFlagCode
              }
              svg
              cdnUrl='https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/'
              style={{
                verticalAlign: 'middle',
                borderRadius: '20px',
                fontSize: '35px',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
