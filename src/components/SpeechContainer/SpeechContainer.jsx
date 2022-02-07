import './SpeechContainer.css';
import EachSpeech from '../EachSpeech/EachSpeech';

export default function SpeechContainer({ speech, empty, index, length }) {
  return (
    <EachSpeech speech={speech} empty={empty} index={index} length={length} />
  );
}
