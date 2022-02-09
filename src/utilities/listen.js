export default function listen() {
  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new window.SpeechRecognition({});
  // let p = document.createElement('p');

  recognition.lang = 'en';
  recognition.interimResults = true;
  recognition.continuous = false;
  console.log(recognition);
  recognition.onresult = async (e) => {
    console.log('results; ', e.results);
    console.log('latest: ', e.results[e.results.length - 1][0].transcript);
    console.log('the speech', speech);
    setSpeech([...speech, concatSpeech(e.results)]);
  };
}
