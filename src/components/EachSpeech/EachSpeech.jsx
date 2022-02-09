import './EachSpeech.css';
import speak from '../../utilities/speak';
import voiceSettings from '../../utilities/voiceSettings';
import ReactCountryFlag from 'react-country-flag';

export default function EachSpeech({ speech, empty, languageCodes }) {
  let nameOfClass;
  if (empty == true) {
    nameOfClass = ` emptySpeech`;
  } else {
    nameOfClass = 'eachSpeech';
  }

  // to darken old dialogues(Not used)
  // if (length >= 0) {
  //   nameOfClass += ` focus`;
  // }

  // Decode object for it's flagCode
  let inputFlagCode, outputFlagCode;
  languageCodes.forEach(function (c) {
    if (speech && c.value == speech.inputLanguage) {
      inputFlagCode = c.flagCode;
    }
    if (speech && c.value == speech.outputLanguage) {
      outputFlagCode = c.flagCode;
    }
  });

  function handleSayAgain() {
    const lang = voiceSettings(speech.outputLanguage);
    speak(speech.outputText, lang);
  }
  return (
    <div className={nameOfClass} onClick={handleSayAgain}>
      <div className='input'>
        <div className='speechDate'>
          {/* {speech.timeCreated ? speech.timeCreated.toLocaleString() : ''} */}
        </div>
        <flag className='flag'>
          <ReactCountryFlag
            countryCode={inputFlagCode}
            svg
            cdnUrl='https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/'
          />
        </flag>
        &nbsp;&nbsp;
        <div className='textBubble inputTextBubble'>{speech.inputText}</div>
      </div>
      <div className='output'>
        {speech.outputText ? (
          <div className='textBubble outputTextBubble'>
            {speech.outputText ? speech.outputText : ' . . .'}
          </div>
        ) : (
          ''
        )}
        &nbsp;&nbsp;
        <flag className='flag'>
          <ReactCountryFlag
            countryCode={outputFlagCode}
            svg
            cdnUrl='https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/'
          />
        </flag>
      </div>
    </div>
  );
}
