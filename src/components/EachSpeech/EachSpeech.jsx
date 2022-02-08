import './EachSpeech.css';

export default function EachSpeech({ speech, empty, length, index }) {
  let nameOfClass = 'eachSpeech';
  if (empty == true) {
    nameOfClass += ` emptySpeech`;
  }

  if ((index >= 0 && length <= 8) || (index >= 2 && length > 8)) {
    nameOfClass += ` focus`;
  }

  if (index % 2 != 0 && !empty) {
    nameOfClass += ` response`;
  }
  return <p className={nameOfClass}>{speech}</p>;
}
