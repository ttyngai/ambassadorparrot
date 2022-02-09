import './EachSpeech.css';
import speak from '../../utilities/speak';
import * as speechesAPI from '../../utilities/speeches-api';
import voiceSettings from '../../utilities/voiceSettings';
import ReactCountryFlag from 'react-country-flag';

export default function EachSpeech({
  speech,
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
    if (speech && c.value == speech.inputLanguage) {
      inputFlagCode = c.flagCode;
    }
    if (speech && c.value == speech.outputLanguage) {
      outputFlagCode = c.flagCode;
    }
    if (c.value == outputLanguage) {
      preOutputFlagCode = c.flagCode;
    }
  });

  function handleSayAgain() {
    const lang = voiceSettings(speech.outputLanguage);
    speak(speech.outputText, lang);
  }

  async function handleSaveSpeech() {
    console.log('Saving: ', speech);

    const saved = await speechesAPI.create(speech);
    console.log('check saved', saved);
  }
  return (
    <div className='eachSpeech'>
      {/* <div className='speakerButton'>🔈</div> */}
      <div className='starButton' onClick={handleSaveSpeech}>
        {' '}
        ★
      </div>
      <div className='speechDate'>
        {speech.timeCreated ? speech.timeCreated.toLocaleString() : ''}
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
            {speech.inputText}
          </div>
        </div>
        <div className='output'>
          {speech.outputText ? (
            <div className='textBubble outputTextBubble'>
              {speech.outputText}
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
                speech.outputText ? outputFlagCode : preOutputFlagCode
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
