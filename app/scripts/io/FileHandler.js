'use strict';

const
  window = require('../nw-context.js').window()
  , FileReader = window.FileReader;

class FileHandler {
  loadFile(file) {
    var promise = new Promise(function (resolve, reject) {

      try {
        let reader = new FileReader();

        reader.onload = function (event) {
          resolve({
            file: file,
            event: event
          });
        };

        reader.readAsDataURL(file);
      }
      catch (error) {
        reject(error);
      }
    });

    return promise;
  }
}

module.exports = FileHandler;