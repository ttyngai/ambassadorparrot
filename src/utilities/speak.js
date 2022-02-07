export default function speak(data, lang) {
  var msg = new SpeechSynthesisUtterance(
    data.data.translations[0].translatedText
  );
  var voices = window.speechSynthesis.getVoices();
  console.log('voice number', lang.voice);
  console.log('Voices', voices);
  console.log('Voices getVoices()', window.speechSynthesis.getVoices());
  msg.voice = voices[lang.voice];
  //   msg.volume = 1;
  console.log('before speak msg', msg);
  console.log('before speak msg.voice', msg.voice);
  console.log('before return msg', msg);
  window.speechSynthesis.speak(msg);
}
