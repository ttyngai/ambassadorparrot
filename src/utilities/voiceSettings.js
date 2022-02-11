const languageCodes = [
  { value: 'en', label: 'English(US)', flagCode: 'US' },
  { value: 'en-GB', label: 'English(UK)', flagCode: 'GB' },
  { value: 'es', label: 'Español', flagCode: 'ES' },
  { value: 'fr', label: 'Français', flagCode: 'FR' },
  { value: 'hi', label: 'हिन्दी', flagCode: 'IN' },
  { value: 'id', label: 'Indonesia', flagCode: 'ID' },
  { value: 'it', label: 'Italiano', flagCode: 'IT' },
  { value: 'ja', label: '日本語', flagCode: 'JP' },
  { value: 'ko', label: '한국어', flagCode: 'KR' },
  { value: 'nl', label: 'Nederlands', flagCode: 'NL' },
  { value: 'pl', label: 'Polski', flagCode: 'PL' },
  { value: 'pt-BR', label: 'Português', flagCode: 'PT' },
  { value: 'ru', label: 'Pусский язык', flagCode: 'RU' },
  { value: 'zh-CN', label: '中文(中國)', flagCode: 'CN' },
  // for hong kong, zh-yue needs to be yue for desktop, zh-HK for apple
  { value: 'zh-HK', label: '中文(香港)', flagCode: 'HK' },
  { value: 'zh-TW', label: '中文(台灣)', flagCode: 'TW' },
];

const sampleConvo = [
  {
    inputText: "Hello, I'm Parrot, your personal translator. ",
    inputLanguage: 'en',
    outputText: '你好, 我是 Parrot, 你的私人翻譯員 。',
    outputLanguage: 'zh-HK',
    timeCreated: new Date('6/15/2012, 5:14:39 PM'),
    sample: true,
  },
  {
    inputText:
      'Press the button below to start. Press the again to hear the translation!',
    inputLanguage: 'en-GB',
    outputText:
      '下のボタンを押して開始します。もう一度押すと翻訳が聞こえます！',
    outputLanguage: 'ja',
    timeCreated: new Date('5/7/2013, 2:12:10 AM'),
    sample: true,
  },
  {
    inputText: 'Have fun!',
    inputLanguage: 'en',
    outputText: 'Divertiti!',
    outputLanguage: 'it',
    timeCreated: new Date('1/2/2014, 8:56:42 PM'),
    sample: true,
  },
];

export function voiceSettings(code) {
  let setting = {};
  if (code == 'en') {
    setting = {
      target: 'en',
      voice: 0,
    };
  } else if (code == 'de') {
    setting = {
      target: 'de',
      voice: 5,
    };
  } else if (code == 'en-GB') {
    setting = {
      target: 'en',
      voice: 8,
    };
  } else if (code == 'es') {
    setting = {
      target: 'es',
      voice: 9,
    };
  } else if (code == 'fr') {
    setting = {
      target: 'fr',
      voice: 11,
    };
  } else if (code == 'hi') {
    setting = {
      target: 'hi',
      voice: 12,
    };
  } else if (code == 'id') {
    setting = {
      target: 'id',
      voice: 13,
    };
  } else if (code == 'it') {
    setting = {
      target: 'it',
      voice: 14,
    };
  } else if (code == 'ja') {
    setting = {
      target: 'ja',
      voice: 15,
    };
  } else if (code == 'ko') {
    setting = {
      target: 'ko',
      voice: 16,
    };
  } else if (code == 'nl') {
    setting = {
      target: 'nl',
      voice: 17,
    };
  } else if (code == 'pl') {
    setting = {
      target: 'pl',
      voice: 18,
    };
  } else if (code == 'pt-BR') {
    setting = {
      target: 'pt-BR',
      voice: 19,
    };
  } else if (code == 'ru') {
    setting = {
      target: 'ru',
      voice: 20,
    };
  } else if (code == 'zh-CN') {
    setting = {
      target: 'zh-CN',
      voice: 21,
    };
  } else if (code == 'zh-HK') {
    setting = {
      target: 'zh-HK',
      voice: 22,
    };
  } else if (code == 'zh-TW') {
    setting = {
      target: 'zh-TW',
      voice: 23,
    };
  }
  return setting;
}

export function getLanguageCodes() {
  return languageCodes;
}
export function getSampleConvo() {
  return sampleConvo;
}
