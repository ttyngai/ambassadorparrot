import './EachSpeech.css';
import speak from '../../utilities/speak';
import * as speechesAPI from '../../utilities/speeches-api';
import voiceSettings from '../../utilities/voiceSettings';
import ReactCountryFlag from 'react-country-flag';
export default function EachSpeech({
  user,
  eachSpeech,
  speech,
  setSpeech,
  // handleDeleteSpeech,
  empty,
  languageCodes,
  outputLanguage,
}) {
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

  async function handleStarSpeech() {
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

  async function handleDeleteSpeech() {
    const deletedSpeech = await speechesAPI.deleteSpeech(eachSpeech);
    let speechCopy = [...speech];
    let deletedSpeechArray = [];
    speechCopy.forEach(function (s) {
      if (s._id != deletedSpeech._id) {
        deletedSpeechArray.push(s);
      }
    });
    setSpeech(deletedSpeechArray);
  }

  return eachSpeech ? (
    <div className='eachSpeech'>
      {user && eachSpeech && eachSpeech._id ? (
        <>
          <span className='deleteButton' onClick={handleDeleteSpeech}>
            ✖
          </span>

          {eachSpeech.isStarred ? (
            <span
              className='starButton buttonStarred'
              onClick={handleStarSpeech}
            >
              ★
            </span>
          ) : (
            <span className='starButton' onClick={handleStarSpeech}>
              ★
            </span>
          )}
        </>
      ) : (
        ''
      )}
      <div className='speechDate'>
        {typeof eachSpeech.timeCreated == 'string'
          ? new Date(eachSpeech.timeCreated).toLocaleString()
          : eachSpeech.timeCreated.toLocaleString()}
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
  ) : (
    ''
  );
}
