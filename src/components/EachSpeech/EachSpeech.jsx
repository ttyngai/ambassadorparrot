import './EachSpeech.css';
import ReactCountryFlag from 'react-country-flag';

export default function EachSpeech({
  speech,
  empty,
  length,
  index,
  languageCodes,
}) {
  let nameOfClass = 'eachSpeech';
  if (empty == true) {
    nameOfClass += ` emptySpeech`;
  }

  // to darken old dialogues(Not used)
  if (length >= 0) {
    nameOfClass += ` focus`;
  }

  let flagCode;
  languageCodes.forEach(function (c) {
    if (speech && c.value == speech.language) {
      flagCode = c.flagCode;
    }
  });

  return (
    <p className={nameOfClass}>
      {speech.time ? speech.time.toLocaleString() : ''}
      <br />
      {speech.inputText}
      {speech.outputText}&nbsp;&nbsp;
      <ReactCountryFlag
        countryCode={flagCode}
        svg
        cdnUrl='https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/'
      />
    </p>
  );
}
