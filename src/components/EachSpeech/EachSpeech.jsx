import './EachSpeech.css';
import ReactCountryFlag from 'react-country-flag';

export default function EachSpeech({
  speech,
  empty,
  length,
  index,
  settingCodes,
}) {
  let nameOfClass = 'eachSpeech';
  if (empty == true) {
    nameOfClass += ` emptySpeech`;
  }

  // to darken old dialogues(Not used)
  if ((index >= 0 && length <= 8) || (index >= 0 && length > 8)) {
    nameOfClass += ` focus`;
  }

  if (index % 2 != 0 && !empty) {
    nameOfClass += ` response`;
  }

  let flagCode;
  settingCodes.forEach(function (c) {
    if (speech && c.value == speech.language) {
      flagCode = c.flagCode;
    }
  });

  console.log(flagCode);
  return (
    <p className={nameOfClass}>
      {speech.text}&nbsp;&nbsp;
      <ReactCountryFlag
        countryCode={flagCode}
        svg
        cdnUrl='https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/'
      />
    </p>
  );
}
