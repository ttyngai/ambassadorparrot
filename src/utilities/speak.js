export default function speak(data, lang) {
  var msg = new SpeechSynthesisUtterance(
    data.data.translations[0].translatedText
  );
  var voices = window.speechSynthesis.getVoices();
  console.log('voice ready', lang.voice);
  console.log('all voices', voices);
  msg.voice = voices[lang.voice];
  //   msg.volume = 1;
  console.log('before speak', msg);
  console.log('before speak', msg.voice);
  window.speechSynthesis.speak(msg);
}
