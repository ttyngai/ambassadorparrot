export default function speak(data, lang) {
  var msg = new SpeechSynthesisUtterance(
    data.data.translations[0].translatedText
  );
  var voices = window.speechSynthesis.getVoices();
  msg.voice = voices[lang.voice];
  window.speechSynthesis.speak(msg);
}
