import speak from '../utilities/speak';
import voiceSettings from '../utilities/voiceSettings';
export default async function translate(speech, targetLanguage, mostRecent) {
  let targetSpeech;
  if (mostRecent == 'recent') {
    targetSpeech = speech[speech.length - 1].inputText;
  }
  let translated;
  let lang = voiceSettings(targetLanguage);

  await fetch(
    'https://translation.googleapis.com/language/translate/v2?key=AIzaSyCvfxyq6CDaQqsiPhVVuNcj07rPHGxH2dM',
    {
      method: 'POST',
      body: JSON.stringify({
        q: targetSpeech,
        // if HK, need zh-yue as target
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

      if (targetLanguage == 'zh-yue') {
        lang.target = 'zh-HK';
      }
      speak(data.data.translations[0].translatedText, lang);
      return data.data.translations[0].translatedText;
    });
  return translated;
}
