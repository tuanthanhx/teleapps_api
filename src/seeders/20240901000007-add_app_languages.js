module.exports = {
  async up (queryInterface) {
    try {
      const array = [
        {
          id: 'aa',
          name: 'Afar',
        },
        {
          id: 'ab',
          name: 'Abkhazian',
        },
        {
          id: 'ae',
          name: 'Avestan',
        },
        {
          id: 'af',
          name: 'Afrikaans',
        },
        {
          id: 'ak',
          name: 'Akan',
        },
        {
          id: 'am',
          name: 'Amharic',
        },
        {
          id: 'an',
          name: 'Aragonese',
        },
        {
          id: 'ar',
          name: 'Arabic',
        },
        {
          id: 'as',
          name: 'Assamese',
        },
        {
          id: 'av',
          name: 'Avaric',
        },
        {
          id: 'ay',
          name: 'Aymara',
        },
        {
          id: 'az',
          name: 'Azerbaijani',
        },
        {
          id: 'ba',
          name: 'Bashkir',
        },
        {
          id: 'be',
          name: 'Belarusian',
        },
        {
          id: 'bg',
          name: 'Bulgarian',
        },
        {
          id: 'bh',
          name: 'Bihari languages',
        },
        {
          id: 'bi',
          name: 'Bislama',
        },
        {
          id: 'bm',
          name: 'Bambara',
        },
        {
          id: 'bn',
          name: 'Bengali',
        },
        {
          id: 'bo',
          name: 'Tibetan',
        },
        {
          id: 'br',
          name: 'Breton',
        },
        {
          id: 'bs',
          name: 'Bosnian',
        },
        {
          id: 'ca',
          name: 'Catalan; Valencian',
        },
        {
          id: 'ce',
          name: 'Chechen',
        },
        {
          id: 'ch',
          name: 'Chamorro',
        },
        {
          id: 'co',
          name: 'Corsican',
        },
        {
          id: 'cr',
          name: 'Cree',
        },
        {
          id: 'cs',
          name: 'Czech',
        },
        {
          id: 'cu',
          name: 'Church Slavic; Old Slavonic; Church Slavonic; Old Bulgarian; Old Church Slavonic',
        },
        {
          id: 'cv',
          name: 'Chuvash',
        },
        {
          id: 'cy',
          name: 'Welsh',
        },
        {
          id: 'da',
          name: 'Danish',
        },
        {
          id: 'de',
          name: 'German',
        },
        {
          id: 'dv',
          name: 'Divehi; Dhivehi; Maldivian',
        },
        {
          id: 'dz',
          name: 'Dzongkha',
        },
        {
          id: 'ee',
          name: 'Ewe',
        },
        {
          id: 'el',
          name: 'Greek, Modern (1453-)',
        },
        {
          id: 'en',
          name: 'English',
        },
        {
          id: 'eo',
          name: 'Esperanto',
        },
        {
          id: 'es',
          name: 'Spanish; Castilian',
        },
        {
          id: 'et',
          name: 'Estonian',
        },
        {
          id: 'eu',
          name: 'Basque',
        },
        {
          id: 'fa',
          name: 'Persian',
        },
        {
          id: 'ff',
          name: 'Fulah',
        },
        {
          id: 'fi',
          name: 'Finnish',
        },
        {
          id: 'fj',
          name: 'Fijian',
        },
        {
          id: 'fo',
          name: 'Faroese',
        },
        {
          id: 'fr',
          name: 'French',
        },
        {
          id: 'fy',
          name: 'Western Frisian',
        },
        {
          id: 'ga',
          name: 'Irish',
        },
        {
          id: 'gd',
          name: 'Gaelic; Scomttish Gaelic',
        },
        {
          id: 'gl',
          name: 'Galician',
        },
        {
          id: 'gn',
          name: 'Guarani',
        },
        {
          id: 'gu',
          name: 'Gujarati',
        },
        {
          id: 'gv',
          name: 'Manx',
        },
        {
          id: 'ha',
          name: 'Hausa',
        },
        {
          id: 'he',
          name: 'Hebrew',
        },
        {
          id: 'hi',
          name: 'Hindi',
        },
        {
          id: 'ho',
          name: 'Hiri Motu',
        },
        {
          id: 'hr',
          name: 'Croatian',
        },
        {
          id: 'ht',
          name: 'Haitian; Haitian Creole',
        },
        {
          id: 'hu',
          name: 'Hungarian',
        },
        {
          id: 'hy',
          name: 'Armenian',
        },
        {
          id: 'hz',
          name: 'Herero',
        },
        {
          id: 'ia',
          name: 'Interlingua (International Auxiliary Language Association)',
        },
        {
          id: 'id',
          name: 'Indonesian',
        },
        {
          id: 'ie',
          name: 'Interlingue; Occidental',
        },
        {
          id: 'ig',
          name: 'Igbo',
        },
        {
          id: 'ii',
          name: 'Sichuan Yi; Nuosu',
        },
        {
          id: 'ik',
          name: 'Inupiaq',
        },
        {
          id: 'io',
          name: 'Ido',
        },
        {
          id: 'is',
          name: 'Icelandic',
        },
        {
          id: 'it',
          name: 'Italian',
        },
        {
          id: 'iu',
          name: 'Inuktitut',
        },
        {
          id: 'ja',
          name: 'Japanese',
        },
        {
          id: 'jv',
          name: 'Javanese',
        },
        {
          id: 'ka',
          name: 'Georgian',
        },
        {
          id: 'kg',
          name: 'Kongo',
        },
        {
          id: 'ki',
          name: 'Kikuyu; Gikuyu',
        },
        {
          id: 'kj',
          name: 'Kuanyama; Kwanyama',
        },
        {
          id: 'kk',
          name: 'Kazakh',
        },
        {
          id: 'kl',
          name: 'Kalaallisut; Greenlandic',
        },
        {
          id: 'km',
          name: 'Central Khmer',
        },
        {
          id: 'kn',
          name: 'Kannada',
        },
        {
          id: 'ko',
          name: 'Korean',
        },
        {
          id: 'kr',
          name: 'Kanuri',
        },
        {
          id: 'ks',
          name: 'Kashmiri',
        },
        {
          id: 'ku',
          name: 'Kurdish',
        },
        {
          id: 'kv',
          name: 'Komi',
        },
        {
          id: 'kw',
          name: 'Cornish',
        },
        {
          id: 'ky',
          name: 'Kirghiz; Kyrgyz',
        },
        {
          id: 'la',
          name: 'Latin',
        },
        {
          id: 'lb',
          name: 'Luxembourgish; Letzeburgesch',
        },
        {
          id: 'lg',
          name: 'Ganda',
        },
        {
          id: 'li',
          name: 'Limburgan; Limburger; Limburgish',
        },
        {
          id: 'ln',
          name: 'Lingala',
        },
        {
          id: 'lo',
          name: 'Lao',
        },
        {
          id: 'lt',
          name: 'Lithuanian',
        },
        {
          id: 'lu',
          name: 'Luba-Katanga',
        },
        {
          id: 'lv',
          name: 'Latvian',
        },
        {
          id: 'mg',
          name: 'Malagasy',
        },
        {
          id: 'mh',
          name: 'Marshallese',
        },
        {
          id: 'mi',
          name: 'Maori',
        },
        {
          id: 'mk',
          name: 'Macedonian',
        },
        {
          id: 'ml',
          name: 'Malayalam',
        },
        {
          id: 'mn',
          name: 'Mongolian',
        },
        {
          id: 'mr',
          name: 'Marathi',
        },
        {
          id: 'ms',
          name: 'Malay',
        },
        {
          id: 'mt',
          name: 'Maltese',
        },
        {
          id: 'my',
          name: 'Burmese',
        },
        {
          id: 'na',
          name: 'Nauru',
        },
        {
          id: 'nb',
          name: 'Bokmål, Norwegian; Norwegian Bokmål',
        },
        {
          id: 'nd',
          name: 'Ndebele, North; North Ndebele',
        },
        {
          id: 'ne',
          name: 'Nepali',
        },
        {
          id: 'ng',
          name: 'Ndonga',
        },
        {
          id: 'nl',
          name: 'Dutch; Flemish',
        },
        {
          id: 'nn',
          name: 'Norwegian Nynorsk; Nynorsk, Norwegian',
        },
        {
          id: 'no',
          name: 'Norwegian',
        },
        {
          id: 'nr',
          name: 'Ndebele, South; South Ndebele',
        },
        {
          id: 'nv',
          name: 'Navajo; Navaho',
        },
        {
          id: 'ny',
          name: 'Chichewa; Chewa; Nyanja',
        },
        {
          id: 'oc',
          name: 'Occitan (post 1500)',
        },
        {
          id: 'oj',
          name: 'Ojibwa',
        },
        {
          id: 'om',
          name: 'Oromo',
        },
        {
          id: 'or',
          name: 'Oriya',
        },
        {
          id: 'os',
          name: 'Ossetian; Ossetic',
        },
        {
          id: 'pa',
          name: 'Panjabi; Punjabi',
        },
        {
          id: 'pi',
          name: 'Pali',
        },
        {
          id: 'pl',
          name: 'Polish',
        },
        {
          id: 'ps',
          name: 'Pushto; Pashto',
        },
        {
          id: 'pt',
          name: 'Portuguese',
        },
        {
          id: 'qu',
          name: 'Quechua',
        },
        {
          id: 'rm',
          name: 'Romansh',
        },
        {
          id: 'rn',
          name: 'Rundi',
        },
        {
          id: 'ro',
          name: 'Romanian; Moldavian; Moldovan',
        },
        {
          id: 'ru',
          name: 'Russian',
        },
        {
          id: 'rw',
          name: 'Kinyarwanda',
        },
        {
          id: 'sa',
          name: 'Sanskrit',
        },
        {
          id: 'sc',
          name: 'Sardinian',
        },
        {
          id: 'sd',
          name: 'Sindhi',
        },
        {
          id: 'se',
          name: 'Northern Sami',
        },
        {
          id: 'sg',
          name: 'Sango',
        },
        {
          id: 'si',
          name: 'Sinhala; Sinhalese',
        },
        {
          id: 'sk',
          name: 'Slovak',
        },
        {
          id: 'sl',
          name: 'Slovenian',
        },
        {
          id: 'sm',
          name: 'Samoan',
        },
        {
          id: 'sn',
          name: 'Shona',
        },
        {
          id: 'so',
          name: 'Somali',
        },
        {
          id: 'sq',
          name: 'Albanian',
        },
        {
          id: 'sr',
          name: 'Serbian',
        },
        {
          id: 'ss',
          name: 'Swati',
        },
        {
          id: 'st',
          name: 'Sotho, Southern',
        },
        {
          id: 'su',
          name: 'Sundanese',
        },
        {
          id: 'sv',
          name: 'Swedish',
        },
        {
          id: 'sw',
          name: 'Swahili',
        },
        {
          id: 'ta',
          name: 'Tamil',
        },
        {
          id: 'te',
          name: 'Telugu',
        },
        {
          id: 'tg',
          name: 'Tajik',
        },
        {
          id: 'th',
          name: 'Thai',
        },
        {
          id: 'ti',
          name: 'Tigrinya',
        },
        {
          id: 'tk',
          name: 'Turkmen',
        },
        {
          id: 'tl',
          name: 'Tagalog',
        },
        {
          id: 'tn',
          name: 'Tswana',
        },
        {
          id: 'to',
          name: 'Tonga (Tonga Islands)',
        },
        {
          id: 'tr',
          name: 'Turkish',
        },
        {
          id: 'ts',
          name: 'Tsonga',
        },
        {
          id: 'tt',
          name: 'Tatar',
        },
        {
          id: 'tw',
          name: 'Twi',
        },
        {
          id: 'ty',
          name: 'Tahitian',
        },
        {
          id: 'ug',
          name: 'Uighur; Uyghur',
        },
        {
          id: 'uk',
          name: 'Ukrainian',
        },
        {
          id: 'ur',
          name: 'Urdu',
        },
        {
          id: 'uz',
          name: 'Uzbek',
        },
        {
          id: 've',
          name: 'Venda',
        },
        {
          id: 'vi',
          name: 'Vietnamese',
        },
        {
          id: 'vo',
          name: 'Volapük',
        },
        {
          id: 'wa',
          name: 'Walloon',
        },
        {
          id: 'wo',
          name: 'Wolof',
        },
        {
          id: 'xh',
          name: 'Xhosa',
        },
        {
          id: 'yi',
          name: 'Yiddish',
        },
        {
          id: 'yo',
          name: 'Yoruba',
        },
        {
          id: 'za',
          name: 'Zhuang; Chuang',
        },
        {
          id: 'zh',
          name: 'Chinese',
        },
        {
          id: 'zu',
          name: 'Zulu',
        },
      ];
      const baseTime = new Date();
      for (const item of array) {
        const object = {
          id: item.id,
          name: item.name,
          description: item.description,
          createdAt: new Date(baseTime),
          updatedAt: new Date(baseTime),
        };
        await queryInterface.bulkInsert('app_languages', [object], {});
      }
    } catch (error) {
      console.error(error);
    }
  },
};
