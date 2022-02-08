const settingCodes = [
  'en',
  'en-GB',
  'es',
  'fr',
  'hi',
  'id',
  'it',
  'ja',
  'ko',
  'nl',
  'pl',
  'pt-BR',
  'ru',
  'zh-CN',
  'zh-HK',
  'zh-TW',
];

export default function voiceSettings(code) {
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
      target: 'zh-CN',
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
