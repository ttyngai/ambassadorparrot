import './SpeechContainer.css';
import EachSpeech from '../EachSpeech/EachSpeech';

export default function SpeechContainer({
  speech,
  empty,
  index,
  length,
  flagCode,
  inputLanguage,
  settingCodes = { settingCodes },
}) {
  return (
    <EachSpeech
      speech={speech}
      empty={empty}
      index={index}
      length={length}
      flagCode={flagCode}
      inputLanguage={inputLanguage}
      settingCodes={settingCodes}
    />
  );
}
