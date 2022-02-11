import speak from '../utilities/speak';
import voiceSettings from '../utilities/voiceSettings';
export default async function translate(speech, targetLanguage, mostRecent) {
  let targetSpeech;
  if (mostRecent == 'recent') {
    targetSpeech = speech[speech.length - 1].inputText;
  }
  let translated;
  let lang = voiceSettings(targetLanguage);
  console.log('before consuming, lang', lang);
  console.log('before consuming, targetLanguage', targetLanguage);

  await fetch(
    'https://translation.googleapis.com/language/translate/v2?key=AIzaSyCvfxyq6CDaQqsiPhVVuNcj07rPHGxH2dM',
    {
      method: 'POST',
      // headers: {
      //   Accept: 'application/json',
      //   'Content-Type': 'application/json',
      //   // charset: 'UTF-8',
      //   //   // 'Access-Control-Allow-Origin': '*',
      // },
      body: JSON.stringify({
        q: targetSpeech,
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
      console.log('data', data.data.translations[0].translatedText);
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
