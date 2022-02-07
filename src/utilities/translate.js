import speak from '../utilities/speak';
import voiceSettings from '../utilities/voiceSettings';
export default async function translate(message, targetLanguage) {
  let translated;
  const lang = voiceSettings(targetLanguage);
  console.log('lang', lang);
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
        q: message[message.length - 1],
        target: lang.target,
      }),
    }
  )
    .then((res) => {
      let response = res.json();
      return response;
    })
    .then(async (data) => {
      console.log('the data', data.data.translations[0].translatedText);
      translated = data.data.translations[0].translatedText;
      speak(data, lang);
      return data.data.translations[0].translatedText;
    });
  //   console.log(translated);
  return translated;
}
