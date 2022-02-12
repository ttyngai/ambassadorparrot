import speak from '../utilities/speak';
import * as voice from './speechSettings';
export default async function translate(speech, targetLanguage) {
  let translated;
  let lang = voice.speechSettings(targetLanguage);
  let taiwaneseHKSwap;
  if (targetLanguage == 'zh-HK') {
    lang.target = 'zh-TW';
    taiwaneseHKSwap = true;
  }

  await fetch(
    'https://translation.googleapis.com/language/translate/v2?key=AIzaSyCvfxyq6CDaQqsiPhVVuNcj07rPHGxH2dM',
    {
      method: 'POST',
      body: JSON.stringify({
        q: speech[speech.length - 1].inputText,
        // if HK, need zh-TW as traditional target
        target: lang.target,
      }),
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      //replace &#39; in italian with proper ' symbol
      translated = data.data.translations[0].translatedText.replace(
        '&#39;',
        "'"
      );

      // Change back to zh-HK from traditional TW
      if (lang.target == 'zh-TW' && taiwaneseHKSwap) {
        lang.target = 'zh-HK';
      }
      speak(translated, lang);
      // return data.data.translations[0].translatedText;
    });
  return translated;
}
