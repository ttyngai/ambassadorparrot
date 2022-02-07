import './SpeechContainer.css';
import EachSpeech from '../EachSpeech/EachSpeech';

export default function SpeechContainer({ speech, className, index, length }) {
  return (
    <EachSpeech
      speech={speech}
      className={className}
      index={index}
      length={length}
    />
  );
}
