import './SpeechContainer.css';
import EachSpeech from '../EachSpeech/EachSpeech';

export default function SpeechContainer({
  speech,
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
      speech={speech}
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
