import './EachSpeech.css';
import ReactCountryFlag from 'react-country-flag';

export default function EachSpeech({
  speech,
  empty,
  length,
  index,
  inputLanguage,
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

  let languageCode = settingCodes.find(function (c) {
    // console.log(c);
    return c.value == inputLanguage;
  });
  // console.log(inputLanguage);
  // console.log(settingCodes);
  // console.log(languageCode);
  // console.log(speech);
  return (
    <p className={nameOfClass}>
      {speech.text}&nbsp;&nbsp;
      {/* https://danalloway.github.io/react-country-flag/ */}
      <ReactCountryFlag
        // countryCode={flagCode}
        countryCode={languageCode}
        svg
        cdnUrl='https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/'
      />
    </p>
  );
}
