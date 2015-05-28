'use strict';

const
    FileTransfer = require('./scripts/io/FileTransfer')
  , GoogleTranslateService = require('./scripts/services/GoogleTranslateService')
  , GoogleTranslateFilter = require('./scripts/translator/GoogleTranslateFilter')
  , SubtitleHandler = require('./scripts/translator/SubtitleHandler')
  , UserPreferences = require('./scripts/data/UserPreferences');

class App {
  start() {
    let dropHandler = new DropHandler({ el: 'body' });

    dropHandler.subscribe('dropped', {
      onNotify: function(files) {
        FileTransfer.process(files);
      }
    });

    SubtitleHandler.register();

    UserPreferences.register().load();
  }
}

let app = new App();
app.start();