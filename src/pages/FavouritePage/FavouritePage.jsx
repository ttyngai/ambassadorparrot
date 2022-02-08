import { useParams } from 'react-router-dom';
// import * as userService from '../../utilities/users-service';

function FavouritePage({
  speech,
  handleStart,
  handleStop,
  inputLanguage,
  setInputLanguage,
  outputLanguage,
  setOutputLanguage,
  buttonState,
  settingCodes,
}) {
  return (
    <>
      <select
        className='languageSelect'
        onChange={(evt) => setInputLanguage(evt.target.value)}
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
        onChange={(evt) => setOutputLanguage(evt.target.value)}
        value={outputLanguage}
      >
        {settingCodes.map((option, idx) => (
          <option key={idx} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
}

export default FavouritePage;
