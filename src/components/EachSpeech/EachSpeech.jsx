import './EachSpeech.css';

export default function EachSpeech({ speech, empty, length, index }) {
  let nameOfClass = 'eachSpeech';
  if (empty == true) {
    nameOfClass += ` emptySpeech`;
  }

  if (length - 1 == index || (length - 2 == index && index % 2 == 0)) {
    nameOfClass += ` focus`;
  }

  if (index % 2 != 0 && !empty) {
    nameOfClass += ` response`;
  }
  return <p className={nameOfClass}>{speech}</p>;
}
