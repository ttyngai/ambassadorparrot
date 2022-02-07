import speak from '../utilities/speak';
import voiceSettings from '../utilities/voiceSettings';
export default async function translate(message, targetLanguage) {
  console.log('message being translated', message);
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
      return res.json();
    })
    .then(async (data) => {
      console.log('the data', data.data.translations[0].translatedText);
      speak(data, lang);
    });
}
