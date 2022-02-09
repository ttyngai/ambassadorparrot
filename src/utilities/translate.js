import speak from '../utilities/speak';
import voiceSettings from '../utilities/voiceSettings';
export default async function translate(message, targetLanguage) {
  let translated;
  const lang = voiceSettings(targetLanguage);

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
        q: message[message.length - 1].text,
        target: lang.target,
      }),
    }
  )
    .then((res) => {
      let response = res.json();
      return response;
    })
    .then(async (data) => {
      translated = data.data.translations[0].translatedText;
      speak(data, lang);
      return data.data.translations[0].translatedText;
    });

  return translated;
}
