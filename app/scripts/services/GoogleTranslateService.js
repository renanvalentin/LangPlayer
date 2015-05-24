'use strict';

const request = require('request');

class GoogleTranslateService {
  get(query) {
    var promise = new Promise(function (resolve, reject) {

      request('https://translate.google.com/translate_a/single?client=t&sl=en&tl=pt&hl=pt-BR&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&dt=at&ie=UTF-8&oe=UTF-8&otf=2&srcrom=1&ssel=0&tsel=0&kc=1&tk=521108|851292&q=' + encodeURIComponent(query), function (error, response, body) {
        if (!error && response.statusCode == 200) {
          // TODO: DANGER! WOW!
          let parse = eval(body);

          resolve({
            translation: parse[0],
            dictionary: parse[5]
          });
        } else {
          reject(error);
        }
      });
    });

    return promise;
  }
}

module.exports = GoogleTranslateService;
