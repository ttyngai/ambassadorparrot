import speak from '../utilities/speak';
import voiceSettings from '../utilities/voiceSettings';
export default async function translate(speech, targetLanguage, mostRecent) {
  let targetSpeech;
  if (mostRecent == 'recent') {
    targetSpeech = speech[speech.length - 1].inputText;
  }
  let translated;
  let lang = voiceSettings(targetLanguage);

  // target:lang.target needs zh-yue

  if (targetLanguage == 'zh-HK') {
    lang.target = 'zh-TW';
  }

  await fetch(
    'https://translation.googleapis.com/language/translate/v2?key=AIzaSyCvfxyq6CDaQqsiPhVVuNcj07rPHGxH2dM',
    {
      method: 'POST',
      body: JSON.stringify({
        q: targetSpeech,
        // if HK, need zh-TW as traditional target
        target: lang.target,
      }),
    }
  )
    .then((res) => {
      let response = res.json();
      return response;
    })
    .then(async (data) => {
      //replace &#39; in italian with proper '

      translated = data.data.translations[0].translatedText.replace(
        `&#39;`,
        "'"
      );

      // Change back to zh-HK from traditional TW
      if (lang.target == 'zh-TW') {
        lang.target = 'zh-HK';
      }
      speak(data.data.translations[0].translatedText, lang);
      return data.data.translations[0].translatedText;
    });
  return translated;
}
