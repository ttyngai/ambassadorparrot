export default function speak(text, lang) {
  var msg = new SpeechSynthesisUtterance(text);
  var voices = window.speechSynthesis.getVoices();
  msg.voice = voices[lang.voice];
  window.speechSynthesis.speak(msg);
}
