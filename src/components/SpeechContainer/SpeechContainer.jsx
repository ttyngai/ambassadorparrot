import './SpeechContainer.css';
import EachSpeech from '../EachSpeech/EachSpeech';

export default function SpeechContainer({
  user,
  eachSpeech,
  speech,
  setSpeech,
  empty,
  index,
  length,
  flagCode,
  inputLanguage,
  outputLanguage,
  languageCodes,
}) {
  return (
    <EachSpeech
      user={user}
      eachSpeech={eachSpeech}
      speech={speech}
      setSpeech={setSpeech}
      empty={empty}
      index={index}
      length={length}
      flagCode={flagCode}
      inputLanguage={inputLanguage}
      outputLanguage={outputLanguage}
      languageCodes={languageCodes}
    />
  );
}
